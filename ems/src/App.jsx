import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage"; // ✅ Import homepage
import ChangePassword from "./pages/ChangePassword"; // ✅ Import ChangePassword page

import "./App.css";
import { AuthContext } from "./context/AuthProvider";

const API_BASE = "http://localhost:5000/api";

function App() {
  const { userData, setUserData } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser.role);
      setLoggedInUserData(parsedUser.data);
    } else {
      setUser(null);
      setLoggedInUserData(null);
      setUserData(null);
    }
  }, [refresh]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/tasks/userStats`);
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch user stats:", err.message);
      }
    };
    fetchUserStats();
  }, [refresh]);

  const handleRefresh = () => setRefresh((prev) => !prev);

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });
      const { user: loggedUser } = res.data;

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: loggedUser.role, data: loggedUser })
      );

      setUser(loggedUser.role);
      setLoggedInUserData(loggedUser);
      handleRefresh();
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInUserData(null);
    setUserData(null);
    handleRefresh();
  };

  return (
    <Router>
      <Routes>
        {/* 🏠 Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* 🔐 Login Page */}
        <Route
          path="/login"
          element={
            !user ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Navigate to={`/${user}`} />
            )
          }
        />

        {/* 🧑‍💼 Admin Dashboard */}
        <Route
          path="/admin"
          element={
            user === "admin" ? (
              <AdminDashboard
                changeUser={setUser}
                handleRefresh={handleRefresh}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🧾 Register Page */}
        <Route
          path="/register"
          element={user === "admin" ? <Register /> : <Navigate to="/login" />}
        />

        {/* 🔑 Change Password Page */}

        <Route
          path="/change-password"
          element={user === "admin" ? <ChangePassword /> : <Navigate to="/" />}
        />

        {/* 👷 Employee Dashboard */}
        <Route
          path="/employee"
          element={
            user === "employee" ? (
              <EmployeeDashboard
                changeUser={setUser}
                data={loggedInUserData}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
