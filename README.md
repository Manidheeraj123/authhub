# AuthHub Authentication System

A comprehensive, full-stack MERN (MongoDB, Express, React, Node.js) authentication boilerplate. This project provides a fully functioning, secure foundation for building apps that require user sign-ups, secure login sessions, and profile management.

## 🌟 Key Features
* **User Registration & Login:** Built securely using `bcrypt` and JSON Web Tokens (JWT).
* **Email Verification:** Mandates new accounts to verify their emails before accessing the platform. Contains a "Mock Mode" for instant local development without SMTP wait times.
* **Access Control:** Protected routes (like the Dashboard) that ensure only authenticated users with valid tokens can load sensitive data.
* **Account Recovery:** Full "Forgot Password" and "Reset Password" workflows.
* **Security Middleware:** Hardened backend utilizing `helmet`, `xss-clean`, `express-rate-limit`, and `express-mongo-sanitize` to defend against common attack vectors.

## 🛠 Tech Stack
**Frontend Layer**
* React 19
* Vite Fast Refresh
* React-Router-Dom (v7)
* Axios (with centralized JWT request interception)
* Vanilla CSS for UI Glassmorphism

**Backend Layer**
* Node.js & Express
* MongoDB & Mongoose
* Nodemailer (Email Handling)
* JWT (Authentication)

## 🚀 How to Run Locally

Because this relies on a separate frontend and backend architecture, you must run both simultaneously.

### 1. Start the Backend
Open your terminal and navigate to the backend folder:
```bash
cd authhub-backend
npm install
npm start
```
*The server will boot up and connect to MongoDB locally on Port 4500.*

### 2. Start the Frontend
Open a **new, split** terminal window and navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
*Vite will boot up the UI on port 5173.*

### 3. Open in Browser
Visit `http://localhost:5173` to interact with the platform.

## 🛡 Network Setup Note
By default, the backend `.env` is configured for **Mock Mode**. Real SMTP connections are bypassed to avoid port-blocking timeouts. Instead, verification link emails are printed instantly to your `authhub-backend` terminal output for lightning-fast testing!
