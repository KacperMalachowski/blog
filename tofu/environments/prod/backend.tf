terraform {
  backend "gcs" {
    bucket = "kacpermalachowski-pl-tfstate"
  }
}