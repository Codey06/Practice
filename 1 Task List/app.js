// Define UI Vars
const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-task")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")

// Load all event listeners
loadEventListeners()

//Load All event listeners
function loadEventListeners() {
  // Dom Load Event
  document.addEventListener("DOMContentLoaded", getTasks)
  // Add task event
  form.addEventListener("submit", addTask)

  // Remove Task
  taskList.addEventListener("click", removeTask)

  // Cleare task event
  clearBtn.addEventListener("click", clearTasks)

  // Filter task
  filter.addEventListener("keyup", filterTasks)
}
// Get Task
function getTasks() {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function (task) {
    // Create li Element
    const li = document.createElement("li")

    // Add class
    li.className = "collection-item"

    // Create text node and append to li
    li.appendChild(document.createTextNode(task))

    // Create new link element
    const link = document.createElement("a")
    // Add class
    link.className = "delete-item secondary-content"
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li)
  })
}
// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add task")
  }
  // Create li Element
  const li = document.createElement("li")

  // Add class
  li.className = "collection-item"

  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))

  // Create new link element
  const link = document.createElement("a")
  // Add class
  link.className = "delete-item secondary-content"
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append link to li
  li.appendChild(link)
  // Append li to ul
  taskList.appendChild(li)

  // Store in LS
  storeTaskInLocalStorage(taskInput.value)
  // Clear input
  taskInput.value = ""

  e.preventDefault()
}
// Store Task
function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove()

      // Remove form LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}
// Remove Local Strage
function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
// Clear Task
function clearTasks() {
  // Remove all child
  // taskList.innerHTML = ""
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  // Clear form LS
  clearTasksFromLocalStorage()
}
function clearTasksFromLocalStorage() {
  localStorage.clear()
}
// filter up
function filterTasks(e) {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"
    } else {
      task.style.display = "none"
    }
  })
}
//

// Load  all event listeners
// loadEventListeners();

// // load all event listeners
// function loadEventListeners() {
//   form.addEventListener("submit", addTask);
//   //   taskList.addEventListener("click", deleteTask);
//   //   clearBtn.addEventListener("click", clearTasks);
//   //   filter.addEventListener("change", filterTasks);
// }

// // Add task

// function addTask(e) {
//   //   const task = taskInput.value.trim();
//   //   if (task) {
//   //     const li = document.createElement("li");
//   //     li.classList.add("collection-item");
//   //     li.innerHTML = `<span class="title">${task}</span> <a href="#" class="secondary-content"><i class="material-icons">close</i></a>`;
//   //     taskList.appendChild(li);
//   //     taskInput.value = "";
//   //   }
//   if (taskInput.value === "") {
//     alert("Add task");
//   }

//   // Create li Element
//   const li = document.createElement("li");
//   // Add class
//   li.classList = "collection-item";
//   // Create text node and append to li
//   li.appendChild(document.createTextNode(taskInput.value));

//   // Create new link element
//   const link = document.createElement("a");
//   // Add class
//   link.classList = "delete-item secondary-content";

//   // Add Icon html
//   link.innerHTML = '<i class="fa fa-remove"></i>';

//   // Append link to li
//   li.appendChild(link);

//   // Append li to ul
//   taskList.appendChild(li);

//   //Clear Input
//   taskInput.value = "";

//   e.preventDefault();
// }
