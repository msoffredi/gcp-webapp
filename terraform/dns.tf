# Reserve an external IP
resource "google_compute_global_address" "website" {
    provider = google
    name     = "gcp-webapp-lb-ip-${var.deploy_prefix}"
}

# Get the managed DNS zone
data "google_dns_managed_zone" "domain_zone" {
    provider  = google
    project   = var.domain_project_id != null ? var.domain_project_id : var.project_id
    name      = var.domain_zone_name
}

# Add the IP to the DNS
resource "google_dns_record_set" "website" {
    provider     = google
    name         = "webapp${var.deploy_env == "prod" ? "" : "-"}${var.deploy_prefix}.${data.google_dns_managed_zone.domain_zone.dns_name}"
    type         = "A"
    ttl          = 300
    managed_zone = data.google_dns_managed_zone.domain_zone.name
    rrdatas      = [google_compute_global_address.website.address]
}
