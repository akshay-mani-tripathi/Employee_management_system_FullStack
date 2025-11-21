const Task = require("../models/task.model");
const User = require("../models/user.model");

// controllers/user.controller.js or task.controller.js
exports.getLoggedInUserTasks = async (req, res) => {
  try {
    const userId = req.query.userId; 
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const tasks = await Task.find({ assignedTo: userId }); // fetch tasks

  
    const taskStats = {
      newTask: tasks.filter(t => t.status === "New").length,
      active: tasks.filter(t => t.status === "Accepted").length,
      completed: tasks.filter(t => t.status === "Completed").length,
      failed: tasks.filter(t => t.status === "Failed").length,
    };

    res.status(200).json({ ...user._doc, tasks, taskStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const users = await User.find();

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({ assignedTo: user._id }); // ✅ fetch tasks

        const stats = {
          newTask: tasks.filter((t) => t.status === "New").length,
          active: tasks.filter((t) => t.status === "Accepted").length,
          completed: tasks.filter((t) => t.status === "Completed").length,
          failed: tasks.filter((t) => t.status === "Failed").length,
        };

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          taskStats: stats,
          tasks, // ✅ include the actual tasks here
        };
      })
    );

    res.status(200).json({ employees: usersWithStats });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const task = await Task.create({ title, description, assignedTo });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Update only the fields you send
    if (req.body.status) task.status = req.body.status;
    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;

    await task.save();

    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    console.error("Error in updateTask:", err);
    res.status(500).json({ message: err.message });
  }
};

