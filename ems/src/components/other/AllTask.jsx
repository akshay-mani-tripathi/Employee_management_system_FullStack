import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { motion } from "framer-motion";

const AllTask = () => {
  const { userData } = useContext(AuthContext);
  if (!userData) return <div className="text-gray-300 p-5">Loading tasks...</div>;

  const employees = userData.employees || [];

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 p-5 rounded-2xl mt-6 shadow-lg hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-emerald-600/30 mb-3 py-2 px-4 flex justify-between rounded-lg font-medium text-gray-100">
        <h2 className="w-1/5 text-center">Employee</h2>
        <h2 className="w-1/5 text-center">New</h2>
        <h2 className="w-1/5 text-center">Active</h2>
        <h2 className="w-1/5 text-center">Completed</h2>
        <h2 className="w-1/5 text-center">Failed</h2>
      </div>

      <div className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
        {employees.map((emp, i) => (
          <motion.div
            key={i}
            className="border border-emerald-600/60 py-2 px-4 flex justify-between rounded-lg bg-black/40 text-gray-200 hover:bg-black/60 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <span className="w-1/5 text-center">{emp.name}</span>
            <span className="w-1/5 text-center text-blue-400">{emp.taskStats?.newTask || 0}</span>
            <span className="w-1/5 text-center text-yellow-400">{emp.taskStats?.active || 0}</span>
            <span className="w-1/5 text-center text-green-400">{emp.taskStats?.completed || 0}</span>
            <span className="w-1/5 text-center text-red-400">{emp.taskStats?.failed || 0}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllTask;
