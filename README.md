# QuickBasket - Full Stack Grocery Ecommerce Website

QuickBasket is a beginner-friendly MERN stack grocery ecommerce project built for interview discussion, internship portfolios, and college submissions. It follows a clean `client` + `server` separation inspired by the overall flow of GreenCart, while keeping the code modular, reusable, and realistic for a 5-6 day student build.

## Tech Stack

- MongoDB
- Express.js
- React + Vite
- Node.js
- Tailwind CSS
- JWT Authentication
- Redux Toolkit
- Axios
- React Hot Toast

## Features

- User signup and login with JWT authentication
- Protected routes for cart, wishlist, checkout, profile, and orders
- Product listing with category filter, price filter, sorting, and search
- Product details page with quantity selector
- Cart flow with add, update quantity, remove, and save for later
- Wishlist flow using Redux Toolkit + backend API
- Coupon validation with discount calculation
- Checkout page and order placement
- My Orders page for order history
- User profile page with saved delivery address
- Loading skeletons, toast notifications, and responsive UI
- Bonus: recently viewed products, save for later, order success animation

## Folder Structure

```text
quickbasket/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
├── server/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── README.md
```

## Database Models

- User
- Product
- Category
- Order
- Coupon
- Wishlist

## Getting Started

### 1. Install dependencies

Run these commands from the project root:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 2. Add environment variables

Copy the example files:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Use these main values:

- `server/.env`
  - `PORT=5000`
  - `MONGODB_URI=your_mongodb_connection_string`
  - `JWT_SECRET=your_secret_key`
  - `CLIENT_URL=http://localhost:5173`
- `client/.env`
  - `VITE_API_URL=http://localhost:5000/api`

### 3. Seed dummy data

```bash
cd server
npm run seed
```

Demo account after seeding:

- Email: `demo@quickbasket.com`
- Password: `student123`

### 4. Run the project

From the root folder:

```bash
npm run dev
```

This starts:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Main API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/categories`
- `GET /api/wishlist`
- `POST /api/wishlist`
- `GET /api/cart`
- `POST /api/cart`
- `PATCH /api/cart/:productId`
- `DELETE /api/cart/:productId`
- `POST /api/coupons/validate`
- `POST /api/orders`
- `GET /api/orders/mine`
- `PUT /api/users/profile`

## Deployment Notes

### Render

- Deploy the `server` folder as a Web Service
- Add environment variables from `server/.env.example`
- Set the start command to `npm start`

### Vercel

- Deploy the `client` folder as a Vite project
- Add `VITE_API_URL` in Vercel environment settings
- Point it to your deployed Render backend URL followed by `/api`

## AWS ECR + ECS Deployment

This repository also includes a Terraform-based AWS deployment in [terraform/main.tf](/Users/amankumar/Desktop/quickbasket%20/terraform/main.tf) and a GitHub Actions workflow in [.github/workflows/deploy.yml](/Users/amankumar/Desktop/quickbasket%20/.github/workflows/deploy.yml).

### What Terraform provisions

- Two Amazon ECR repositories for backend and frontend images
- A custom VPC with public and private subnets
- Security groups for the ALB and ECS services
- IAM roles for ECS task execution and task runtime
- An Application Load Balancer with path-based routing
- An ECS Fargate cluster with separate backend and frontend services
- CloudWatch log groups for both containers

### AWS setup steps

1. Copy `terraform/terraform.tfvars.example` to `terraform/terraform.tfvars`
2. Fill in your `mongodb_uri` and `jwt_secret`
3. Run:

```bash
cd terraform
terraform init
terraform apply
```

### GitHub Actions variables

Add these repository variables:

- `AWS_REGION`
- `BACKEND_ECR_REPO_URI`
- `FRONTEND_ECR_REPO_URI`
- `ECS_CLUSTER_NAME`
- `ECS_BACKEND_SERVICE_NAME`
- `ECS_FRONTEND_SERVICE_NAME`
- `ECS_BACKEND_TASK_FAMILY`
- `ECS_FRONTEND_TASK_FAMILY`

Add this repository secret:

- `AWS_ROLE_ARN`

After the AWS resources exist and the variables are added, every push to `main` will:

- Build backend and frontend Docker images
- Tag them with both `latest` and the commit SHA
- Push them to Amazon ECR
- Register fresh ECS task definitions
- Deploy both ECS services automatically

## Interview Explanation

QuickBasket is easy to explain:

1. React handles the UI and routing.
2. Redux Toolkit stores cart and wishlist state.
3. Axios connects the frontend to Express APIs.
4. JWT protects private routes and backend endpoints.
5. MongoDB stores users, products, categories, coupons, wishlists, and orders.

## Future Improvements

- Online payment gateway
- Admin panel for product management
- Product reviews
- Pagination for large product lists
