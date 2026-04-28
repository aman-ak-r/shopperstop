output "cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "cluster_arn" {
  value = aws_ecs_cluster.main.arn
}

output "backend_service_name" {
  value = aws_ecs_service.backend.name
}

output "backend_service_arn" {
  value = aws_ecs_service.backend.id
}

output "frontend_service_name" {
  value = aws_ecs_service.frontend.name
}

output "frontend_service_arn" {
  value = aws_ecs_service.frontend.id
}

output "backend_task_family" {
  value = aws_ecs_task_definition.backend.family
}

output "frontend_task_family" {
  value = aws_ecs_task_definition.frontend.family
}
