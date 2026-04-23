# NBA Statistics & Analytics Platform

## Project Overview

The NBA Statistics & Analytics Platform is a full-stack web application designed to centralize basketball data, user analytics tools, and role-based system management in one modern platform.

The project was built to solve the problem of fragmented sports data by giving users a single place to:

- View NBA players and teams
- Compare players
- Create analytics reports
- Save favorite players
- Manage system content through admin tools
- Use secure authentication and authorization

This project demonstrates real-world full-stack development practices using React, Node.js, Express, MongoDB, and JWT authentication.

---

# Features

## Public Features
- View Dashboard statistics
- Browse NBA Players
- Browse NBA Teams
- Compare two players
- Register account
- Login account

## Authenticated User Features
- Create Reports
- Delete Own Reports
- Save Favorite Players
- Remove Favorites
- Logout

## Admin Features
- Access Admin Dashboard
- View management sections
- Manage system data structure
- Role-based navigation access

---

# Tech Stack

## Frontend
- React (Create React App)
- React Router DOM
- Axios
- CSS

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Helmet
- Morgan
- Express Rate Limit
- HPP

## Database
- MongoDB
- Mongoose

---

# Folder Structure

```text
ProjectModern/
│
├── client/              # React frontend
│   ├── src/
│   ├── public/
│
├── src/                 # Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│
├── .env
├── package.json
└── README.md
Installation & Setup
1. Clone Repository
git clone https://github.com/sozaru545/ProjectModern.git
cd ProjectModern
Backend Setup
Install Dependencies
npm install
Create .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_MAX_REQUESTS=5000
Run Backend
npm run dev

Backend runs on:

http://localhost:5000
Frontend Setup
Open Client Folder
cd client
Install Dependencies
npm install
Create client/.env
REACT_APP_API_URL=http://localhost:5000/api
Run Frontend
npm start

Frontend runs on:

http://localhost:3000
API Routes
Auth Routes
Method	Route	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current user
Player Routes
Method	Route
GET	/api/players
Team Routes
Method	Route
GET	/api/teams
Report Routes
Method	Route
GET	/api/reports
POST	/api/reports
DELETE	/api/reports/:id
Favorite Routes
Method	Route
GET	/api/favorites
POST	/api/favorites
DELETE	/api/favorites/:playerId
Comparison Routes
Method	Route
GET	/api/comparisons
POST	/api/comparisons
User Roles
Fan

Regular users can:

View players
View teams
Compare players
Save favorites
Create reports
Admin

Admins can:

Access admin dashboard
Manage system sections
Oversee reports and users
Security Features
Password hashing with bcryptjs
JWT token authentication
Protected routes
Helmet security headers
HPP protection
Request rate limiting
Input sanitization
Error handling middleware
Screenshots
Dashboard


Future Improvements
Real NBA API integration
Charts and analytics graphs
Search filters
Pagination
Edit reports
Admin CRUD tools
Dark mode UI
Live game stats
Learning Outcomes

This project demonstrates knowledge of:

REST API development
Full-stack architecture
React state management
CRUD operations
Authentication
Authorization
MongoDB data modeling
Deployment preparation
Production debugging
Author

Gbemiro Abolaji
Student Final Project

GitHub Repository

https://github.com/sozaru545/ProjectModern.git