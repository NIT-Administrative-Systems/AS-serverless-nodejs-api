# Secrets, so Jenkins knows where to send its values
output "parameters" {
  value = module.base-api.parameters
}

output "api_url" {
  value = module.base-api.api_url
}
