variable "cloudflare_malachowski_zone_id" {
  type = string
  description = "Name of the zone of kacpemalachowski.pl"
  default = "kacpermalachowski.pl"
}

variable "gh_pages_domain_name" {
  type = string
  description = "The name of the default domain for github pages"
  default = "kacpermalachowski.github.io"
}