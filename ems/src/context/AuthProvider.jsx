import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://employee-management-system-fullstack-a18n.onrender.com/api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false); // 🔁 trigger for re-fetching

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API_BASE}/tasks/userStats`);
        setUserData(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch employees:", err.message);
      }
    };

    fetchEmployees();
  }, [refresh]); // ✅ re-fetch on refresh toggle

  return (
    <AuthContext.Provider value={{ userData, setUserData, setRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
