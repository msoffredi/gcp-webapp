# Add bucket as a CDN backend
resource "google_compute_backend_bucket" "website" {
    provider    = google
    name        = "gcp-webapp-backend-${var.deploy_prefix}"
    description = "Contains files needed by the website"
    bucket_name = google_storage_bucket.website.name
    enable_cdn  = true
}

# Create HTTPS certificate
resource "google_compute_managed_ssl_certificate" "website" {
    provider = google-beta
    name     = "gcp-webapp-cert-${var.deploy_prefix}"
    managed {
        domains = [google_dns_record_set.website.name]
    }
}

# GCP URL MAP
resource "google_compute_url_map" "website" {
    provider        = google
    name            = "gcp-webapp-url-map-${var.deploy_prefix}"
    default_service = google_compute_backend_bucket.website.self_link
}

# GCP target proxy
resource "google_compute_target_https_proxy" "website" {
    provider         = google
    name             = "gcp-webapp-target-proxy-${var.deploy_prefix}"
    url_map          = google_compute_url_map.website.self_link
    ssl_certificates = [google_compute_managed_ssl_certificate.website.self_link]
}

# GCP forwarding rule
resource "google_compute_global_forwarding_rule" "default" {
    provider              = google
    name                  = "gcp-webapp-forwarding-rule-${var.deploy_prefix}"
    load_balancing_scheme = "EXTERNAL"
    ip_address            = google_compute_global_address.website.address
    ip_protocol           = "TCP"
    port_range            = "443"
    target                = google_compute_target_https_proxy.website.self_link
}
