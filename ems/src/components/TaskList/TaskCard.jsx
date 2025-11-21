import React from "react";
import { motion } from "framer-motion";

const TaskCard = ({ data, variant, handleStatusChange }) => {
  const styles = {
    New: "from-[#2d2d2d] to-[#1a1a1a]",
    Accepted: "from-[#2e2e2e] to-[#1b1b1b]",
    Completed: "from-green-700 to-green-900",
    Failed: "from-red-700 to-red-900",
  };

  const buttonSet = {
    New: (
      <button
        onClick={() => handleStatusChange?.(data._id, "Accepted")}
        className="bg-green-500 hover:bg-green-600 py-2 px-4 text-sm font-medium rounded-lg transition"
      >
        Accept Task
      </button>
    ),
    Accepted: (
      <div className="flex justify-between mt-5">
        <button
          onClick={() => handleStatusChange?.(data._id, "Completed")}
          className="bg-green-600 hover:bg-green-700 py-2 px-3 text-sm rounded-lg"
        >
          Mark Completed
        </button>
        <button
          onClick={() => handleStatusChange?.(data._id, "Failed")}
          className="bg-red-600 hover:bg-red-700 py-2 px-3 text-sm rounded-lg"
        >
          Mark Failed
        </button>
      </div>
    ),
    Completed: (
      <button className="bg-green-500 w-full py-2 text-sm rounded-lg">
        Completed
      </button>
    ),
    Failed: (
      <button className="bg-red-500 w-full py-2 text-sm rounded-lg">
        Failed
      </button>
    ),
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ type: "spring", stiffness: 250 }}
      className={`flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br ${styles[variant]} rounded-2xl shadow-lg hover:shadow-emerald-600/20 transition-all`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm px-3 py-1 rounded-2xl bg-opacity-80 bg-gray-700 text-white">
          {data.category}
        </h3>
        <h4 className="text-xs text-gray-300">{data.date}</h4>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-white">{data.title}</h2>
      <p className="text-sm text-gray-300 mt-2">{data.description}</p>

      <div className="mt-5">{buttonSet[variant]}</div>
    </motion.div>
  );
};

export default TaskCard;
