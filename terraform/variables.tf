variable "project_id" {
  type        = string
  description = "The GCP project ID"
}

variable "region" {
  type        = string
  default     = "us-east1"
  description = "The region you want your assets to be created and hosted from"
}

variable "deploy_prefix" {
  type        = string
  description = "For local/dev deployments consider using your name or nickname"
}

variable "domain_zone_name" {
  type        = string
  description = "The domain zone name you want your assets to be accessed from"
}

# DNS most likely comes from same project for all environments
variable "domain_project_id" {
    type = string
    default = null
    description = "Project ID of the DNS domain you want to use (in case is not same project as the rest of the resources)"
}

variable "deploy_env" {
    type        = string
    default     = "dev"
    description = "Deployment environment"

    validation {
        condition     = contains(["dev", "staging", "prod"], var.deploy_env)
        error_message = "Invalid value for deploy_env. Valid values are 'dev', 'staging', or 'prod'."
    }
}