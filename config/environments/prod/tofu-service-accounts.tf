resource "google_service_account" "tofu_executor" {
  project      = var.tofu_executor_gcp_service_account.project_id
  account_id   = var.tofu_executor_gcp_service_account.id
  display_name = var.tofu_executor_gcp_service_account.id
  description  = "Identity of tofu executor."
}

resource "google_project_iam_member" "tofu_executor_blog_project_owner" {
  project = var.tofu_executor_gcp_service_account.project_id
  role    = "roles/owner"
  member  = "serviceAccount:${google_service_account.tofu_executor.email}"
}

resource "google_service_account" "tofu_planner" {
  project      = var.tofu_planner_gcp_service_account.project_id
  account_id   = var.tofu_planner_gcp_service_account.id
  display_name = var.tofu_planner_gcp_service_account.id
  description  = "Identity of tofu planner."
}

resource "google_project_iam_member" "tofu_planner_blog_project_reader" {
  for_each = toset([
    "roles/viewer",
    "roles/iam.securityReviewer"
  ])
  project = var.tofu_planner_gcp_service_account.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.tofu_planner.email}"
}

resource "google_storage_bucket_iam_binding" "tofu_planner_state_bucket_user" {
  bucket = var.backend_state_bucket
  members = [
    "serviceAccount:${google_service_account.tofu_planner.email}"
  ]
  role = "roles/storage.objectUser"
}
