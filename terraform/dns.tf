# Reserve an external IP
resource "google_compute_global_address" "website" {
  provider = google
  name     = "gcp-webapp-lb-ip"
}

# Get the managed DNS zone
data "google_dns_managed_zone" "soffredi_dev" {
  provider = google
  name     = "soffredi-dev"
}

# Add the IP to the DNS
resource "google_dns_record_set" "website" {
  provider     = google
  name         = "gcp-webapp.${data.google_dns_managed_zone.soffredi_dev.dns_name}"
  type         = "A"
  ttl          = 300
  managed_zone = data.google_dns_managed_zone.soffredi_dev.name
  rrdatas      = [google_compute_global_address.website.address]
}
