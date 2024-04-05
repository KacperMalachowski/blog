data "google_client_config" "gcp" {
  provider = google
}

module "gh_com_kacpermalachowski_blog_worklaod_identity_federation" {
  source = "github.com/kyma-project/test-infra/configs/terraform/modules/gcp-workload-identity-federation"

  project_id  = data.google_client_config.gcp.project
  pool_id     = "github-com-malachowski-project"
  provider_id = "github-com-malachowski-project"
  issuer_uri  = "https://token.actions.githubusercontent.com"

  attribute_mapping = {
    "google.subject"                = "\"repository_id:\" + assertion.repository_id + \":repository_owner_id:\" + assertion.repository_owner_id + \":workflow:\" + assertion.workflow"
    "attribute.actor"               = "assertion.actor"
    "attribute.aud"                 = "assertion.aud"
    "attribute.repository_id"       = "assertion.repository_id"
    "attribute.repository_owner_id" = "assertion.repository_owner_id"
    "attribute.workflow"            = "assertion.workflow"
    "attribute.workflow_ref"        = "assertion.workflow_ref"
    "attribute.event_name"          = "assertion.event_name"
  }

  sa_mapping = {
    "tofu_planner_pull_prod_plan" = {
      sa_name   = "projects/${data.google_client_config.gcp.project}/serviceAccounts/${google_service_account.tofu_planner.email}"
      attribute = "subject/repository_id:${data.github_repository.blog.repo_id}:repository_owner_id:${var.github_kacpermalachowski_id}:workflow:pull-tofu-prod-plan"
    },
    "tofu_planner_pull_infracost" = {
      sa_name   = "projects/${data.google_client_config.gcp.project}/serviceAccounts/${google_service_account.tofu_planner.email}"
      attribute = "subject/repository_id:${data.github_repository.blog.repo_id}:repository_owner_id:${var.github_kacpermalachowski_id}:workflow:pull-infracost"
    },
    "tofu_executor_post_prod_apply" = {
      sa_name   = "projects/${data.google_client_config.gcp.project}/serviceAccounts/${google_service_account.tofu_executor.email}"
      attribute = "subject/repository_id:${data.github_repository.blog.repo_id}:repository_owner_id:${var.github_kacpermalachowski_id}:workflow:post-tofu-prod-apply"
    }
  }
}

resource "github_actions_variable" "gcp_tofu_executor_service_account_email" {
  repository    = data.github_repository.blog.name
  variable_name = "GCP_TOFU_EXECUTOR_SERVICE_ACCOUNT_EMAIL"
  value         = google_service_account.tofu_executor.email
}

resource "github_actions_variable" "gcp_tofu_planner_service_account_email" {
  repository    = data.github_repository.blog.name
  variable_name = "GCP_TOFU_PLANNER_SERVICE_ACCOUNT_EMAIL"
  value         = google_service_account.tofu_planner.email
}

resource "github_actions_variable" "gh_com_malachowski_blog_gcp_workload_identity_federation_provider" {
  repository    = data.github_repository.blog.name
  variable_name = "GH_COM_MALACHOWSKI_BLOG_GCP_WORKLOAD_IDENTITY_FEDERATION_PROVIDER"
  value         = module.gh_com_kacpermalachowski_blog_worklaod_identity_federation.provider_name
}