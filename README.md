# Blog Project - Backend

## Project Overview

The **Blog Project** is a backend service for managing blog posts, user authentication, and role-based access control. The API allows users to create, read, update, and delete blog posts. Admins have additional permissions to manage all blogs. This project follows best practices for security and scalability.

## Live API URL

[Blog Project Backend](https://blog-backend24.vercel.app/)

## Features

- User authentication and role-based authorization
- Create, read, update, and delete (CRUD) operations for blog posts
- Role-based access control (Users can delete only their own blogs, while Admins can delete any blog)
- Data validation with Zod
- Global error handling
- Secure password hashing and token-based authentication

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Error Handling**: Custom middleware
- **Environment Management**: dotenv

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/aamamun24/Blog-Project.git
cd Blog-Project
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the required environment variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_uri
BCRYPT_SALT_ROUND=number
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret
```

### 4. Run the Application

```sh
npm run start:dev   # For development mode
npm run start:prod  # For production mode
```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in and receive a token

### Blogs

- **POST** `/api/blogs` - Create a blog (Authenticated users)
- **GET** `/api/blogs` - Get all blogs
- **GET** `/api/blogs/:id` - Get a single blog by ID
- **PUT** `/api/blogs/:id` - Update a blog (Only author)
- **DELETE** `/api/blogs/:id` - Delete a blog (Only author)

### Admin Actions

- **PATCH** `/api/admin/users/:userId/block` - Block a user (Admin only)
- **DELETE** `/api/admin/blogs/:id` - Delete any blog (Admin only)

## Error Handling

The API follows structured error handling with meaningful error messages and HTTP status codes. It includes:

- Zod validation errors
- Authentication & authorization errors
- Database-related errors
