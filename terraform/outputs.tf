output "alb_dns_name" {
  description = "Public DNS name of the Application Load Balancer"
  value       = module.alb.alb_dns_name
}

output "backend_ecr_url" {
  description = "ECR repository URL for the backend image"
  value       = module.ecr.backend_repository_url
}

output "frontend_ecr_url" {
  description = "ECR repository URL for the frontend image"
  value       = module.ecr.frontend_repository_url
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.ecs.cluster_name
}

output "ecs_cluster_arn" {
  description = "ARN of the ECS cluster"
  value       = module.ecs.cluster_arn
}

output "backend_service_name" {
  description = "Name of the backend ECS service"
  value       = module.ecs.backend_service_name
}

output "backend_service_arn" {
  description = "ARN of the backend ECS service"
  value       = module.ecs.backend_service_arn
}

output "frontend_service_name" {
  description = "Name of the frontend ECS service"
  value       = module.ecs.frontend_service_name
}

output "frontend_service_arn" {
  description = "ARN of the frontend ECS service"
  value       = module.ecs.frontend_service_arn
}

output "backend_task_family" {
  description = "Task definition family name for the backend service"
  value       = module.ecs.backend_task_family
}

output "frontend_task_family" {
  description = "Task definition family name for the frontend service"
  value       = module.ecs.frontend_task_family
}

output "ecs_execution_role_arn" {
  description = "Execution role ARN used by ECS tasks"
  value       = local.ecs_execution_role_arn
}

output "ecs_task_role_arn" {
  description = "Task role ARN used by ECS tasks"
  value       = local.ecs_task_role_arn
}
