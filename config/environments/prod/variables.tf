variable "gcp_project_id" {
  type        = string
  description = "The blog GCP project id"
  default     = "blog-419421"
}

variable "github_kacpermalachowski_owner" {
  type        = string
  description = "Owner of the repository"
  default     = "KacperMalachowski"
}

variable "backend_state_bucket" {
  type        = string
  description = "Name of the bucket containing tofu state"
  default     = "kacpermalachowski-pl-tfstate"
}