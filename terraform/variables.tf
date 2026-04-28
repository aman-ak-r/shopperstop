variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used as prefix for all resources"
  type        = string
  default     = "quickbasket"
}

variable "create_iam_roles" {
  description = "Create ECS IAM roles with Terraform. Keep false for AWS Academy and reuse LabRole."
  type        = bool
  default     = false
}

variable "existing_ecs_execution_role_arn" {
  description = "Existing ECS execution role ARN. If empty, Terraform builds one from the role name and current account ID."
  type        = string
  default     = ""
}

variable "existing_ecs_task_role_arn" {
  description = "Existing ECS task role ARN. If empty, Terraform builds one from the role name and current account ID."
  type        = string
  default     = ""
}

variable "existing_ecs_execution_role_name" {
  description = "Existing ECS execution role name to use when create_iam_roles is false."
  type        = string
  default     = "LabRole"
}

variable "existing_ecs_task_role_name" {
  description = "Existing ECS task role name to use when create_iam_roles is false."
  type        = string
  default     = "LabRole"
}

variable "mongodb_uri" {
  description = "MongoDB Atlas connection URI"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key for the backend"
  type        = string
  sensitive   = true
}
