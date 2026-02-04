const API = "http://localhost:3000/tasks";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  fetch(API)
    .then(res => res.json())
    .then(tasks => {
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title;

        if (task.completed) {
          li.classList.add("completed");
        }

        li.onclick = () => toggleTask(task.id);
        li.ondblclick = () => deleteTask(task.id);

        taskList.appendChild(li);
      });
    });
}

function addTask() {
  if (taskInput.value.trim() === "") return;

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskInput.value })
  }).then(() => {
    taskInput.value = "";
    loadTasks();
  });
}

function toggleTask(id) {
  fetch(`${API}/${id}`, { method: "PUT" })
    .then(() => loadTasks());
}

function deleteTask(id) {
  fetch(`${API}/${id}`, { method: "DELETE" })
    .then(() => loadTasks());
}

loadTasks();
