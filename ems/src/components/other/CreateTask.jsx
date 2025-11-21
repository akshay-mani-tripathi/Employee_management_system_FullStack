import React, { useContext, useEffect, useState } from "react";
import API from "../../api/api";
import { AuthContext } from "../../context/AuthProvider";
import { motion } from "framer-motion";

const CreateTask = ({ handleRefresh }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/auth/users");
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !assignTo || !category) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    const employee = employees.find((emp) => emp.name === assignTo);
    if (!employee) return setMessage("❌ Employee not found");

    try {
      await API.post("/tasks", {
        title: taskTitle,
        description: taskDescription,
        assignedTo: employee._id,
        status: "New",
        category,
        date: taskDate,
      });

      setMessage("✅ Task created successfully!");
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");
      setAssignTo("");
      setCategory("");
      handleRefresh?.();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create task");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-[#1c1c1c]/90 rounded-2xl shadow-lg mt-7 backdrop-blur-md"
    >
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          {[
            ["Task title", taskTitle, setTaskTitle, "text", "Make a UI design"],
            ["Assign to", assignTo, setAssignTo, "select", "Select employee"],
            ["Category", category, setCategory, "text", "Design, Dev, etc"],
            ["Date", taskDate, setTaskDate, "date", ""],
          ].map(([label, value, setValue, type, placeholder], i) => (
            <div key={i} className="mb-4">
              <h3 className="text-sm text-gray-300 mb-1">{label}</h3>
              {type === "select" ? (
                <select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="text-sm py-1 px-2 w-4/5 rounded bg-[#2b2b2b] text-white border border-gray-500 focus:ring-2 focus:ring-emerald-500 transition"
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp.name}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type={type}
                  placeholder={placeholder}
                  className="text-sm py-1 px-2 w-4/5 rounded bg-[#2b2b2b] border border-gray-500 text-white focus:ring-2 focus:ring-emerald-500 transition"
                />
              )}
            </div>
          ))}
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-1">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded bg-[#2b2b2b] text-white border border-gray-500 focus:ring-2 focus:ring-emerald-500 transition"
            placeholder="Task description"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-emerald-500 to-green-600 py-3 px-5 rounded-lg text-sm mt-4 w-full text-white font-medium shadow-md hover:shadow-lg transition"
          >
            Create Task
          </motion.button>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm mt-3 text-gray-300"
            >
              {message}
            </motion.p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default CreateTask;
