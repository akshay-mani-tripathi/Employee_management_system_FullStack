import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-gray-700">
        <motion.h1
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold tracking-wide"
        >
          <span className="text-blue-400">EMS</span> Dashboard
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition-all duration-200"
        >
          Login
        </motion.button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-4 leading-tight"
        >
          Empower Your Team with <br />
          <span className="text-blue-400">Smart Task Management</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-300 text-lg max-w-2xl mb-8"
        >
          Streamline work, track progress, and boost productivity.
          Manage employees and tasks effortlessly with real-time updates and analytics.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/login")}
          className="bg-blue-500 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg"
        >
          Get Started →
        </motion.button>
      </main>

      <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} EMS Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
