terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.23.0"
    }

    github = {
      source  = "integrations/github"
      version = ">= 6.2.1"
    }

    cloudflare = {
      source = "cloudflare/cloudflare"
      version = ">= 4.29.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
}