resource "google_cloud_run_service" "website" {
  name     = "website"
  location = "eu-central2"

  template {
    spec {
      containers {
        image = "ghcr.io/kacpermalachowski/blog/client:main"
      }
    }
  }
}

resource "google_cloud_run_service" "api_server" {
  name     = "api-server"
  location = "eu-central2"

  template {
    spec {
      containers {
        image = "ghcr.io/kacpermalachowski/blog/server:main"
      }
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
  value   = google_cloud_run_service.website.status[0].url
  proxied = true
}

resource "cloudflare_record" "website_record" {
  zone_id = cloudflare_zone.kacpermalachowski.id
  name    = "@"
  type    = "CNAME"
  value   = google_cloud_run_service.website.status[0].url
  proxied = true
}

resource "cloudflare_record" "api_www_record" {
  zone_id = cloudflare_zone.kacpermalachowski.id
  name    = "www.api"
  type    = "CNAME"
  value   = google_cloud_run_service.api_server.status[0].url
  proxied = true
}

resource "cloudflare_record" "api_record" {
  zone_id = cloudflare_zone.kacpermalachowski.id
  name    = "api"
  type    = "CNAME"
  value   = google_cloud_run_service.api_server.status[0].url
  proxied = true
}