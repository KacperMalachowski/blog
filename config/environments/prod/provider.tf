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
  }
}

provider "google" {
  project = var.gcp_project_id
}