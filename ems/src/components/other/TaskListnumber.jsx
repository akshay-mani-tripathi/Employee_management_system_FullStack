import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaskListnumber = ({ data }) => {
  if (!data)
    return (
      <div className="flex justify-around mt-8 text-gray-400 text-lg">
        Loading stats...
      </div>
    );

  const stats = [
    { label: "New", value: data.newTask || 0, color: "from-blue-500 to-blue-700" },
    { label: "Active", value: data.active || 0, color: "from-yellow-400 to-yellow-600" },
    { label: "Completed", value: data.completed || 0, color: "from-green-500 to-green-700" },
    { label: "Failed", value: data.failed || 0, color: "from-red-500 to-red-700" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-10">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`rounded-2xl shadow-lg p-6 text-center bg-gradient-to-br ${stat.color} text-white`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{
            scale: 1.08,
            rotate: [0, 2, -2, 0],
            transition: { duration: 0.4 },
          }}
        >
          <h2 className="text-lg font-medium">{stat.label}</h2>
          <AnimatePresence mode="wait">
            <motion.span
              key={stat.value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold block mt-1"
            >
              {stat.value}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskListnumber;
