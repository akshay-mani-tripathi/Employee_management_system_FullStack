import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <motion.div
      className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle floating background shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-emerald-600 rounded-full blur-3xl opacity-30 top-20 left-20"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 bottom-20 right-20"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* 🔙 Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-200 transition-all"
      >
        <ArrowLeft size={22} />
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* Login Card */}
      <motion.div
        className="border border-emerald-500/70 rounded-2xl p-10 w-[380px] shadow-xl shadow-emerald-800/30 backdrop-blur-sm bg-black/30"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-emerald-400">
          Welcome Back
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col items-center">
          <motion.input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
            className="bg-transparent border border-emerald-500 text-white text-lg py-3 px-5 rounded-full w-full placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            whileFocus={{ scale: 1.03 }}
          />

          <motion.input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter password"
            className="bg-transparent border border-emerald-500 text-white text-lg py-3 px-5 mt-4 rounded-full w-full placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            whileFocus={{ scale: 1.03 }}
          />

          <motion.button
            type="submit"
            className="w-full bg-emerald-600 text-lg font-semibold py-3 px-5 mt-6 rounded-full hover:bg-emerald-500 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
