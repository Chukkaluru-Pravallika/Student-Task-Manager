const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001; // Using port 5001 to avoid conflicts

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (no MongoDB needed)
let tasks = [
  {
    _id: "1",
    title: "Complete Backend Setup",
    description: "Set up Node.js server with Express",
    priority: "high",
    dueDate: "2024-12-18",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    title: "Start Frontend Development",
    description: "Create React components for task manager",
    priority: "medium",
    dueDate: "2024-12-20",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    title: "Learn MongoDB Basics",
    description: "Understand how MongoDB works with Mongoose",
    priority: "low",
    dueDate: "2024-12-25",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API",
    status: "running",
    database: "in-memory",
    port: PORT,
    tasksCount: tasks.length,
    endpoints: [
      "GET    /api/tasks",
      "POST   /api/tasks",
      "PUT    /api/tasks/:id",
      "DELETE /api/tasks/:id"
    ]
  });
});

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET single task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t._id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST create task
app.post("/api/tasks", (req, res) => {
  const task = {
    _id: Date.now().toString(),
    ...req.body,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT update task
app.put("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  
  tasks[index] = {
    ...tasks[index],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(tasks[index]);
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  
  const deletedTask = tasks.splice(index, 1)[0];
  res.json({ 
    message: "Task deleted successfully",
    deletedTask 
  });
});

// Start server
app.listen(PORT, () => {
  console.log("🎯 Task Manager API");
  console.log(`📍 Port: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`💾 Storage: In-memory (${tasks.length} sample tasks loaded)`);
  console.log("📡 Ready to accept requests!");
});
