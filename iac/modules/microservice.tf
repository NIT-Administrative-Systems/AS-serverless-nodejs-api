# Shared resources for the AWS account
# Used to get the VPC ID & subnet IDs that have been allocated for us
data "terraform_remote_state" "shared_resources" {
  backend = "s3"

  config = {
    bucket = var.account_resources_state_bucket
    key    = var.account_resources_state_file
    region = var.account_resources_state_region
  }
}

# Create the infrastructure
module "base-api" {
  source = "github.com/NIT-Administrative-Systems/AS-serverless-api-IaC?ref=develop"

  # app_name    = "@TODO: Set me!"
  environment = var.environment
  region      = "us-east-2"

  lambda_vpc_id     = data.terraform_remote_state.shared_resources.outputs.vpc_id
  lambda_subnet_ids = data.terraform_remote_state.shared_resources.outputs.ecats_subnet_ids

  runtime_env     = var.app_env_variables
  runtime_secrets = var.app_secrets

  source_dir      = abspath("../../")
  source_zip_path = abspath("../../.build/package.zip")
}
