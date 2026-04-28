provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

locals {
  ecs_execution_role_arn = var.create_iam_roles ? module.iam[0].ecs_execution_role_arn : (
    var.existing_ecs_execution_role_arn != "" ? var.existing_ecs_execution_role_arn : "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${var.existing_ecs_execution_role_name}"
  )

  ecs_task_role_arn = var.create_iam_roles ? module.iam[0].ecs_task_role_arn : (
    var.existing_ecs_task_role_arn != "" ? var.existing_ecs_task_role_arn : "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${var.existing_ecs_task_role_name}"
  )
}

# ──────────────────────────────────────────
# ECR Repositories
# ──────────────────────────────────────────
module "ecr" {
  source       = "./modules/ecr"
  project_name = var.project_name
}

# ──────────────────────────────────────────
# Networking (VPC, Subnets, Security Groups)
# ──────────────────────────────────────────
module "networking" {
  source       = "./modules/networking"
  project_name = var.project_name
  aws_region   = var.aws_region
}

# ──────────────────────────────────────────
# IAM Roles
# ──────────────────────────────────────────
module "iam" {
  count        = var.create_iam_roles ? 1 : 0
  source       = "./modules/iam"
  project_name = var.project_name
}

# ──────────────────────────────────────────
# Application Load Balancer
# ──────────────────────────────────────────
module "alb" {
  source             = "./modules/alb"
  project_name       = var.project_name
  vpc_id             = module.networking.vpc_id
  public_subnet_ids  = module.networking.public_subnet_ids
  alb_security_group = module.networking.alb_security_group_id
}

# ──────────────────────────────────────────
# ECS Cluster + Services
# ──────────────────────────────────────────
module "ecs" {
  source = "./modules/ecs"

  project_name              = var.project_name
  aws_region                = var.aws_region
  backend_image_uri         = "${module.ecr.backend_repository_url}:latest"
  frontend_image_uri        = "${module.ecr.frontend_repository_url}:latest"
  ecs_task_role_arn         = local.ecs_task_role_arn
  ecs_execution_role_arn    = local.ecs_execution_role_arn
  vpc_id                    = module.networking.vpc_id
  private_subnet_ids        = module.networking.private_subnet_ids
  ecs_security_group_id     = module.networking.ecs_security_group_id
  backend_target_group_arn  = module.alb.backend_target_group_arn
  frontend_target_group_arn = module.alb.frontend_target_group_arn
  mongodb_uri               = var.mongodb_uri
  jwt_secret                = var.jwt_secret

  depends_on = [module.alb]
}
