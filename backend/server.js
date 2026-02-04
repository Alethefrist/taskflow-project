const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

const FILE = path.join(__dirname, "tasks.json");

const readTasks = () => JSON.parse(fs.readFileSync(FILE));
const writeTasks = (data) =>
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

app.get("/tasks", (req, res) => {
  res.json(readTasks());
});

app.post("/tasks", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id == req.params.id);
  task.completed = !task.completed;
  writeTasks(tasks);
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks().filter(t => t.id != req.params.id);
  writeTasks(tasks);
  res.json({ success: true });
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
