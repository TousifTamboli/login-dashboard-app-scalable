# Login Dashboard App (Scalable)

A full-stack authentication dashboard built with a Node.js/Express backend and a React/Vite frontend.

## Project overview

This project implements a secure login/register flow with session management using JWT and refresh tokens, protected routes, and Redis-backed logout token blacklisting.

- Backend: Express, MongoDB, Redis, JWT, bcrypt
- Frontend: React, Vite, React Router, Axios
- Authentication: secure cookie-based access and refresh tokens
- Protection: route guard on dashboard access and login rate limiting

## Features

- User registration and login
- Access token issued as cookie
- Refresh token support with automatic token retry
- Protected dashboard route
- Secure logout and refresh token blacklisting in Redis
- CORS configuration for trusted client domains
- Express error handling and rate limiting for login

## Repository structure

```
/backend
  package.json
  src/
    server.js
    config/redis.js
    controllers/authController.js
    middleware/authMiddleware.js
    middleware/rateLimiter.js
    models/User.js
    routes/authRoutes.js
    routes/userRoutes.js
/frontend
  package.json
  src/
    App.jsx
    main.jsx
    api/axios.js
    context/
      AuthContext.jsx
      sessionContext.js
      useAuth.js
    pages/
      Dashboard.jsx
      Login.jsx
      Register.jsx
    routes/ProtectedRoute.jsx
```

## Backend details

### Key backend responsibilities

- Connects to MongoDB using `mongoose`
- Creates and validates JWT `accessToken` and `refreshToken`
- Uses `httpOnly` cookies for auth tokens
- Refreshes access tokens automatically
- Blocks invalidated refresh tokens using Redis
- Protects `/api/user/profile` with middleware
- Enforces login attempt limits via `express-rate-limit`

### Important backend files

- `backend/src/server.js` - app setup, middleware, routes, DB connection
- `backend/src/controllers/authController.js` - register/login/refresh/logout logic
- `backend/src/middleware/authMiddleware.js` - protected-route auth guard
- `backend/src/middleware/rateLimiter.js` - login throttling
- `backend/src/config/redis.js` - Redis client and blacklist storage
- `backend/src/routes/authRoutes.js` - auth endpoints
- `backend/src/routes/userRoutes.js` - profile endpoint

## Frontend details

### Key frontend responsibilities

- Provides login, register, and dashboard pages
- Uses Axios with `withCredentials` to include cookies
- Automatically retries requests after refresh token expiry
- Stores authenticated user state in context
- Guards protected dashboard route

### Important frontend files

- `frontend/src/App.jsx` - app routing
- `frontend/src/main.jsx` - React entry point with `AuthProvider` and router
- `frontend/src/api/axios.js` - Axios instance and interceptor
- `frontend/src/context/AuthContext.jsx` - auth session provider
- `frontend/src/pages/Login.jsx` - login page
- `frontend/src/pages/Register.jsx` - registration page
- `frontend/src/pages/Dashboard.jsx` - protected dashboard
- `frontend/src/routes/ProtectedRoute.jsx` - route-level auth protection

## Prerequisites

- Node.js 18+ / npm
- MongoDB instance
- Redis instance
- Environment variables configured for backend

## Backend environment variables

Create `backend/.env` with values like:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/login-dashboard
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URLS=http://localhost:5173
NODE_ENV=development
```

## Frontend environment variables

Create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:3000
```

## Setup

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Run backend

```bash
cd backend
npm run dev
```

or

```bash
npm start
```

### 3. Run frontend

```bash
cd frontend
npm run dev
```

## Usage

- Open the frontend URL shown by Vite (usually `http://localhost:5173`)
- Register a new user
- Login with the new account
- Access the protected dashboard
- Logout to clear cookies and invalidate tokens

## Notes

- The backend enables strict CORS based on `CLIENT_URLS`
- Refresh tokens are blacklisted in Redis on logout for increased security
- Access tokens expire in 15 minutes; refresh tokens expire in 7 days

## Troubleshooting

- Ensure MongoDB and Redis are running locally or accessible via configured URLs
- Verify `CLIENT_URLS` includes the frontend origin
- If protected requests fail, check that cookies are included and CORS credentials are enabled

## Optional improvements

- Add validation and field sanitization for registration/login data
- Add a root-level `package.json` if you want `npm run` scripts that bootstrap both apps
- Use HTTPS and secure cookie settings for production
- Add tests and deployment scripts
