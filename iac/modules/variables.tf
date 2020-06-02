variable "environment" {
  description = "Environment that this app is runnig for, e.g. dev/qa/prod"
}

variable "account_resources_state_bucket" {
  description = "State bucket for shared account resources"
}

variable "account_resources_state_file" {
  description = "State bucket for shared account resources"
}

variable "account_resources_state_region" {
  description = "State bucket for shared account resources"

  default = "us-east-2"
}

variable "app_env_variables" {
  description = "Environment variables for the Lambda w/ your app settings"
  type = map(string)
}

variable "app_secrets" {
  description = "Names for secrets to create in the SSM parameter store"
  type = list(string)
}
