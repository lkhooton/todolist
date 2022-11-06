//Select elements

let taskInput = document.getElementById("new-task");
let addButton = document.getElementById("addButton");
let incompleteTasks = document.getElementById("incomplete-tasks");
let completedTasks = document.getElementById("completed-tasks");
let clearButton = document.getElementById("clear");

//Add Task

let addTask = function() {
  if (taskInput.value == ""){
    alert("Task should not be empty!");
    return;
  }
  let listItem = createNewTask(taskInput.value);
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}
addButton.addEventListener("click", addTask);