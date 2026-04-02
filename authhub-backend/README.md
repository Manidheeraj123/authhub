# AuthHub Backend

This is the backend for the AuthHub application, providing full authentication and authorization services.

## Features
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control (user, admin)

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)

## Folder Structure
```text
src/
├── config/       # Database configuration
├── controllers/  # API business logic
├── middleware/   # Custom middlewares (auth, roles)
├── models/       # Mongoose schemas
├── routes/       # Express routes
server.js         # Entry point
```

## API Endpoints
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Authenticate user and get token
- `GET /api/auth/dashboard` - Get protected dashboard data (Requires Token)

## Setup Instructions
1. Install dependencies: `npm install`
2. Configure environment variables in `.env` based on `.env.example`
3. Run the development server: `npm run dev`

## Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing tokens
- `PORT`: Port to run the server on (default 5000)

## Future Improvements
- Add password reset email functionality
- Implement refresh tokens
