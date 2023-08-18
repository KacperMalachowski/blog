terraform {
  required_version = ">= 0.12.0"

  required_providers {
    google = ">= 3.3"
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}