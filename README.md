# 🧑‍💼 Employee Management System (EMS)

A **full-stack Employee Management System** built with **React, Node.js, Express, MongoDB, and JWT authentication**. The system supports **role-based access** for Admins and Employees, secure authentication, task tracking, and employee management.
To test you can use following credentials :- 
---
username - admin@ems.com
---
password - Admin123
---

## 🚀 Features

### 🔐 Authentication & Authorization

* Email-based login system
* Secure password hashing using **bcrypt**
* Role-based access control (**Admin / Employee**)
* Protected routes on frontend & backend

### 👩‍💼 Admin Features

* Admin dashboard
* Register new employees
* View all users
* Reset employee passwords
* View task statistics

### 👷 Employee Features

* Employee dashboard
* View assigned tasks
* Task status tracking

### 🛠 Technical Highlights

* RESTful API design
* MongoDB Atlas cloud database
* JWT-ready authentication structure
* Clean folder structure (MVC)
* Production-ready deployment on **Render**

---

## 🧱 Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* bcryptjs
* JSON Web Token (JWT)

### Deployment

* Frontend: Render
* Backend: Render
* Database: MongoDB Atlas

---

## 📁 Project Structure

```
Employee-Management-System/
│
├── backend/
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ems_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

⚠️ Never commit `.env` files to GitHub.

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

### Register Admin (First Time)

```http
POST /api/auth/register
```

```json
{
  "name": "Admin",
  "email": "admin@ems.com",
  "password": "Admin123",
  "role": "admin"
}
```

### Login

```http
POST /api/auth/login
```

```json
{
  "email": "admin@ems.com",
  "password": "Admin123"
}
```

Passwords are stored as **bcrypt hashed values** (`passwordHash`).

---

## ❗ Common Issues & Fixes

### ❌ `Illegal arguments: string, undefined`

✔ Ensure user document contains `passwordHash`
✔ Do not manually insert plain passwords into MongoDB

### ❌ `req.body is undefined`

✔ Ensure this middleware exists in `server.js`:

```js
app.use(express.json());
```

---

## 📸 Screenshots

> Add screenshots here:

* Login Page
* Admin Dashboard
* Employee Dashboard

---

## 🔒 Security Best Practices

* Passwords hashed using bcrypt
* Sensitive credentials stored in `.env`
* Role-based access control
* JWT ready for API protection

---

## 📌 Future Improvements

* JWT authentication middleware
* Refresh tokens
* Role-based API guards
* Email notifications
* Pagination & search

---

## 👨‍💻 Author

**Akshay Mani Tripathi**
Full-Stack Developer | MERN | Django | ML

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
