data "github_repository" "blog" {
  name = var.github_blog_repository_name
}

resource "github_actions_variable" "gcp_blog_project_id" {
  repository    = data.github_repository.blog.name
  variable_name = "GCP_BLOG_PROJECT_ID"
  value         = var.gcp_project_id
}