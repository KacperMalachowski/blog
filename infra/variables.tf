variable "google_project_id" {
  type        = string
  description = "The project ID to deploy to"
  default     = "blog-395007"
}

variable "google_region" {
  type        = string
  description = "The region to deploy to"
  default     = "eu-central2"
}

variable "google_zone" {
  type        = string
  description = "The zone to deploy to"
  default     = "eu-central2-a"
}

variable "cloudflare_account_id" {
  sensitive = true
  type = string
}
