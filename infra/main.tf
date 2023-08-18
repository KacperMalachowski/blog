resource "google_artifact_registry_repository" "main" {
  location      = "europe-central2"
  repository_id = "blog"
  description   = "docker registry"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }
}

resource "google_cloud_run_v2_service" "website" {
  name     = "website"
  location = "europe-central2"

  template {
    containers {
      image = "${var.google_region}-docker.pkg.dev/${var.google_project_id}/${google_artifact_registry_repository.main.name}/website"
    }
  }
}

resource "google_cloud_run_v2_service" "api_server" {
  name     = "api-server"
  location = "europe-central2"

  template {
    containers {
      image = "${var.google_region}-docker.pkg.dev/${var.google_project_id}/${google_artifact_registry_repository.main.name}/api"
    }
  }
}

resource "google_project_service" "firestore" {
  service = "firestore.googleapis.com"
}

resource "google_firestore_database" "database" {
  name        = "(default)"
  location_id = "nam5"
  type        = "FIRESTORE_NATIVE"

  depends_on = [google_project_service.firestore]
}

resource "cloudflare_zone" "kacpermalachowski" {
  account_id = var.cloudflare_account_id
  zone       = "kacpermalachowski.pl"
}

resource "cloudflare_record" "website_www_record" {
  zone_id = cloudflare_zone.kacpermalachowski.id
  name    = "www"
  type    = "CNAME"
  value   = google_cloud_run_v2_service.website.uri
  proxied = true
}

resource "cloudflare_record" "website_record" {
  zone_id = cloudflare_zone.kacpermalachowski.id
  name    = "@"
  type    = "CNAME"
  value   = google_cloud_run_v2_service.website.uri
  proxied = true
}

resource "cloudflare_record" "api_www_record" {
  zone_id = cloudflare_zone.kacpermalachowski.id
  name    = "www.api"
  type    = "CNAME"
  value   = google_cloud_run_v2_service.api_server.uri
  proxied = true
}

resource "cloudflare_record" "api_record" {
  zone_id = cloudflare_zone.kacpermalachowski.id
  name    = "api"
  type    = "CNAME"
  value   = google_cloud_run_v2_service.api_server.uri
  proxied = true
}