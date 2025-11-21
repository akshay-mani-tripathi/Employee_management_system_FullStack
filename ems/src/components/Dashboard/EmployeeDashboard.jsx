import React, { useEffect, useState, useContext } from "react";
import TaskListnumber from "../other/TaskListnumber";
import TaskList from "../TaskList/TaskList";
import Header from "../other/Header";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { motion } from "framer-motion";

const API_BASE = "https://employee-management-system-fullstack-a18n.onrender.com/api";

const EmployeeDashboard = ({ changeUser, handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const { setRefresh } = useContext(AuthContext);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))?.data;

  const fetchUserData = async () => {
    if (!loggedInUser?.id) return;
    try {
      const res = await axios.get(`${API_BASE}/tasks/me`, {
        params: { userId: loggedInUser.id },
      });
      setUserData(res.data);
    } catch (err) {
      console.error("Failed to fetch user tasks:", err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`${API_BASE}/tasks/${taskId}`, { status: newStatus });

      setUserData((prev) => {
        if (!prev?.tasks) return prev;

        const updatedTasks = prev.tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        );

        const updatedTaskStats = {
          newTask: updatedTasks.filter((t) => t.status === "New").length,
          active: updatedTasks.filter((t) => t.status === "Accepted").length,
          completed: updatedTasks.filter((t) => t.status === "Completed").length,
          failed: updatedTasks.filter((t) => t.status === "Failed").length,
        };

        return { ...prev, tasks: updatedTasks, taskStats: updatedTaskStats };
      });
    } catch (err) {
      console.error("Failed to update task status:", err);
      alert("Error updating task status");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-xl">
        Loading...
      </div>
    );

  return (
    <motion.div
      className="p-10 bg-gradient-to-br from-[#0f0f0f] via-[#171717] to-[#121212] min-h-screen text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header changeUser={changeUser} data={userData} handleLogout={handleLogout} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <TaskListnumber data={userData.taskStats} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <TaskList data={{ tasks: userData.tasks }} handleStatusChange={handleStatusChange} />
      </motion.div>
    </motion.div>
  );
};

export default EmployeeDashboard;
