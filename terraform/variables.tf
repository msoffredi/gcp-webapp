variable "project_id" {
  type        = string
  description = "The GCP project ID"
}

variable "region" {
  type        = string
  default     = "us-east1"
  description = "The region you want your assets to be created and hosted from"
}
