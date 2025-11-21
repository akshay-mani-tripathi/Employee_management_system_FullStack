import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";

const API_BASE = "http://localhost:5000/api";

const Register = () => {
  const navigate = useNavigate();
  const { setRefresh } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all existing users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/auth/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Password must have 8+ chars, one uppercase, one lowercase, one number, one special char
  const isValidPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // ✅ Simple reliable email regex
  const isValidEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Check if email is deliverable using Abstract API
  const verifyEmailDeliverability = async (email) => {
    const api = import.meta.env.VITE_EMAIL_API; // Correct for Vite
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${api}&email=${email}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.deliverability === "DELIVERABLE";
    } catch (error) {
      console.error("Email verification failed:", error);
      return false;
    }
  };

  // ✅ Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Email validation
    if (!isValidEmailFormat(email)) {
      setMessage("❌ Please enter a valid email address format.");
      setLoading(false);
      return;
    }

    // Email deliverability check
    // const isDeliverable = await verifyEmailDeliverability(email);
    // if (!isDeliverable) {
    //   setMessage(
    //     "⚠️ This email doesn't seem to exist or isn't deliverable. Please enter a valid, active email."
    //   );
    //   setLoading(false);
    //   return;
    // }

    // Password validation
    if (!isValidPassword(password)) {
      setMessage(
        "⚠️ Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character."
      );
      setLoading(false);
      return;
    }

    // Existing user check
    if (users.some((u) => u.email === email)) {
      setMessage("⚠️ Email already exists!");
      setLoading(false);
      return;
    }

    // Register user
    try {
      await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
        role,
      });
      setMessage("✅ User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-emerald-900 overflow-hidden">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-all duration-200"
      >
        <ArrowLeft size={22} />
        <span className="font-medium text-lg">Back</span>
      </button>

      {/* 🧾 Register Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border border-emerald-600/40 rounded-2xl p-10 w-[400px] backdrop-blur-lg bg-black/50 shadow-emerald-800/40 shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-emerald-400 mb-6"
        >
          Register New User
        </motion.h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Input Fields */}
          {["Name", "Email", "Password"].map((label) => (
            <motion.input
              key={label}
              type={label === "Password" ? "password" : label.toLowerCase()}
              placeholder={label}
              value={
                label === "Name"
                  ? name
                  : label === "Email"
                  ? email
                  : password
              }
              onChange={(e) =>
                label === "Name"
                  ? setName(e.target.value)
                  : label === "Email"
                  ? setEmail(e.target.value)
                  : setPassword(e.target.value)
              }
              required
              className="text-white outline-none bg-transparent border-2 border-emerald-600 focus:border-emerald-400 text-lg py-2 px-5 rounded-full placeholder:text-gray-400 transition-all duration-200"
              whileFocus={{ scale: 1.03 }}
            />
          ))}

          {/* Role Dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full text-white bg-black border-2 border-emerald-600 focus:border-emerald-400 text-lg py-2 px-5 rounded-full cursor-pointer transition-all duration-200"
          >
            <option value="employee" className="text-black">
              Employee
            </option>
            <option value="admin" className="text-black">
              Admin
            </option>
          </select>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-lg py-2 rounded-full mt-2 shadow-lg shadow-emerald-700/30 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>

          {/* Message Display */}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center text-sm mt-2 ${
                message.startsWith("✅")
                  ? "text-emerald-400"
                  : message.startsWith("❌")
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
