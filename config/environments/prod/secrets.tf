data "google_secret_manager_secret" "infracost_api_key" {
  secret_id = "infracost-api-key"
}

resource "google_secret_manager_secret_iam_binding" "infracost_api_key_secret_accesor" {
  secret_id = data.google_secret_manager_secret.infracost_api_key.secret_id
  role      = "roles/secretmanager.secretAccessor"
  members = [
    "serviceAccount:${google_service_account.tofu_planner.email}"
  ]
}

resource "github_actions_variable" "gcp_infracost_api_key_secret_name" {
  repository    = data.github_repository.blog.name
  variable_name = "GCP_INFRACOST_API_KEY_SECRET_NAME"
  value         = data.google_secret_manager_secret.infracost_api_key.secret_id
}

data "google_secret_manager_secret" "cloudflare_edit_zone_token" {
  secret_id = "cloudflare-edit-zone-token"
}

resource "google_secret_manager_secret_iam_binding" "cloudflare_edit_zone_token_secret_accesor" {
  secret_id = data.google_secret_manager_secret.cloudflare_edit_zone_token.secret_id
  role      = "roles/secretmanager.secretAccessor"
  members = [
    "serviceAccount:${google_service_account.tofu_executor.email}"
  ]
}

resource "github_actions_variable" "gcp_cloudflare_edit_zone_token_secret_name" {
  repository    = data.github_repository.blog.name
  variable_name = "GCP_CLOUDFLARE_EDIT_ZONE_TOKEN_SECRET_NAME"
  value         = data.google_secret_manager_secret.cloudflare_edit_zone_token.secret_id
}

data "google_secret_manager_secret" "cloudflare_read_zone_token" {
  secret_id = "cloudflare-read-zone-token"
}

resource "google_secret_manager_secret_iam_binding" "cloudflare_read_zone_token_secret_accesor" {
  secret_id = data.google_secret_manager_secret.cloudflare_read_zone_token.secret_id
  role      = "roles/secretmanager.secretAccessor"
  members = [
    "serviceAccount:${google_service_account.tofu_planner.email}"
  ]
}

resource "github_actions_variable" "gcp_cloudflare_read_zone_token_secret_name" {
  repository    = data.github_repository.blog.name
  variable_name = "GCP_CLOUDFLARE_READ_ZONE_TOKEN_SECRET_NAME"
  value         = data.google_secret_manager_secret.cloudflare_read_zone_token.secret_id
}

data "google_secret_manager_secret" "github_com_variables_access_token" {
  secret_id = "github-com-variables-access-token"
}

resource "google_secret_manager_secret_iam_binding" "github_com_variables_access_token_secret_accesor" {
  secret_id = data.google_secret_manager_secret.github_com_variables_access_token.secret_id
  role      = "roles/secretmanager.secretAccessor"
  members = [
    "serviceAccount:${google_service_account.tofu_planner.email}",
    "serviceAccount:${google_service_account.tofu_executor.email}"
  ]
}

resource "github_actions_variable" "gcp_github_com_variables_access_token_secret_name" {
  repository    = data.github_repository.blog.name
  variable_name = "GCP_GH_COM_VARIABLES_ACCESS_TOKEN_SECRET_NAME"
  value         = data.google_secret_manager_secret.github_com_variables_access_token.secret_id
}