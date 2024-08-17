locals {
    mime_types  = jsondecode(file("${path.module}/mime.json"))
    bucket_name = "webapp-${var.deploy_prefix}-${replace(var.domain_zone_name, ".", "-")}"
}

# Bucket to store website
resource "google_storage_bucket" "website" {
    provider = google
    name     = local.bucket_name
    location = var.region

    website {
        main_page_suffix = "index.html"
        not_found_page   = "404.html"
    }
}

resource "google_storage_bucket_object" "dist" {
  for_each = fileset("${path.module}/../build", "**")

  # The name of the object.
  name = each.value

  # The name of the containing bucket.
  bucket = google_storage_bucket.website.name

  # A path to the data you want to upload.
  source = "../build/${each.value}"

  # Content-Type of the object data. Defaults to "application/octet-stream".
  content_type = lookup(local.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])
}

# Make new objects public
resource "google_storage_default_object_access_control" "website_read" {
  bucket = google_storage_bucket.website.name
  role   = "READER"
  entity = "allUsers"
}
