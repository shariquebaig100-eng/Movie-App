# 🎬 MERN Stack Movie Application (Role-Based Access Control)

A full-stack **MERN Movie Application** with **JWT Authentication**, **Role-Based Access Control**, **Admin CRUD**, **Search & Sort**, and **IMDb Top 250 integration**.  
Frontend built with **React + Material UI**, Backend with **Node.js + Express**, Database **MongoDB Atlas**.

---

## 🌐 Live URLs

### 🔗 Frontend (Vercel)
👉 https://movie-app-tau-rouge.vercel.app

### 🔗 Backend API (Railway)
👉 https://movie-app-production-cdfd.up.railway.app

---

## 📌 Features

### 👤 User Features
- View all movies with pagination
- Search movies by title or description
- Sort movies by:
  - Rating
  - Name
  - Release Date
  - Duration
- Responsive UI with Material-UI
- Loading skeletons for better UX

### 🛠 Admin Features
- Secure login (JWT based)
- Add new movies
- Edit existing movies
- Delete movies
- IMDb Top 250 movie sync (admin only)

---

## 🔐 Authentication & Authorization

- JWT based authentication
- Role based access control
- Protected admin routes
- Token stored securely in browser
- Auto logout on token expiry

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Material-UI (MUI)
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt

### Deployment
- **Frontend** → Vercel
- **Backend** → Railway
- **Database** → MongoDB Atlas

---

## 📁 Project Structure

## 🎞 IMDb Top 250 Integration (Note)

The application includes backend logic to fetch and store IMDb Top 250 movies using the official IMDb API.

The integration has been tested locally and works as expected.  
However, in the production environment, outbound requests to `imdb-api.com` are blocked due to hosting network/DNS restrictions, so automatic syncing is not executed in production.

This is an environment-level limitation, not a code-level issue.
