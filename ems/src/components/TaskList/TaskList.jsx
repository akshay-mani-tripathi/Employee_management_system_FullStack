import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { motion, AnimatePresence } from "framer-motion";

const TaskList = ({ data, handleStatusChange }) => {
  const tasks = data?.tasks || [];

  return (
    <motion.div
      id="TaskList"
      className="h-[55%] overflow-x-auto flex items-center gap-6 py-5 mt-10 px-3 scrollbar-thin scrollbar-thumb-gray-700"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 ? (
          <motion.p
            key="no-tasks"
            className="text-gray-400 text-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No tasks assigned yet.
          </motion.p>
        ) : (
          tasks.map((elem, idx) => (
            <motion.div
              key={elem._id || idx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0"
            >
              {elem.status === "New" && (
                <NewTask data={elem} handleStatusChange={handleStatusChange} />
              )}
              {elem.status === "Accepted" && (
                <AcceptTask data={elem} handleStatusChange={handleStatusChange} />
              )}
              {elem.status === "Completed" && <CompleteTask data={elem} />}
              {elem.status === "Failed" && <FailedTask data={elem} />}
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
