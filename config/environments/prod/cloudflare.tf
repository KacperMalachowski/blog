data "cloudflare_zone" "malachowski" {
  name = var.cloudflare_malachowski_zone_id
}

resource "cloudflare_record" "www_malachowski_pl" {
  zone_id = data.cloudflare_zone.malachowski.id
  name = "www"
  value = var.gh_pages_domain_name
  type = "CNAME"
  proxied = true
}

resource "cloudflare_record" "root_malachowski_pl" {
  zone_id = data.cloudflare_zone.malachowski.id
  name = "@"
  value = var.gh_pages_domain_name
  type = "CNAME"
  proxied = true
}