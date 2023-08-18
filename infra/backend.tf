terraform {
  cloud {
    organization = "KacperMalachowski"

    workspaces {
      name = "blog"
    }
  }
}