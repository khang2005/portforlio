terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

variable "cloudflare_api_token" {
  sensitive = true
}

variable "cloudflare_account_id" {
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_project" "khangduytran" {
  account_id        = var.cloudflare_account_id
  name              = "khangduytran"
  production_branch = "master"
}

resource "cloudflare_pages_domain" "khangduytran_xyz" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.khangduytran.name
  domain       = "khangduytran.xyz"
}
