import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = "https://employee-management-system-fullstack-a18n.onrender.com/api";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE}/auth/reset-password`, {
        email,
        newPassword,
      });
      setMessage(res.data.message || "✅ Password updated successfully!");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage("❌ Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/80 p-8 rounded-2xl shadow-2xl w-[400px] text-white backdrop-blur-md border border-gray-700/50"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">
          Change User Password
        </h2>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center mb-4 ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { placeholder: "Enter user's email", type: "email", value: email, setter: setEmail },
            { placeholder: "New password", type: "password", value: newPassword, setter: setNewPassword },
            { placeholder: "Confirm new password", type: "password", value: confirmPassword, setter: setConfirmPassword },
          ].map((field, i) => (
            <motion.input
              key={i}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className="p-3 rounded-md text-black focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
            />
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-blue-600 py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </motion.button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="bg-gray-600 py-3 rounded-md font-medium text-lg hover:bg-gray-700 transition-all duration-300"
          >
            Back to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
