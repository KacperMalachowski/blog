variable "tofu_executor_gcp_service_account" {
  type = object({
    id         = string
    project_id = string
  })

  default = {
    id         = "tofu-executor"
    project_id = "blog-419421"
  }

  description = "Details of tofu executor gcp service account."
}

variable "tofu_planner_gcp_service_account" {
  type = object({
    id         = string
    project_id = string
  })

  default = {
    id         = "tofu-planner"
    project_id = "blog-419421"
  }

  description = "Details of tofu planner gcp service account."
}