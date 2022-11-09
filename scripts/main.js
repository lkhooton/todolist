
//Selectors
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//Form validation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (()=> {
      add.setAttribute("data-bs-dismiss", "");
    })
  }
};

//Data and local storage usage
let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

//Make new to do
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

//Reset form 
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}

//Delete to do item
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();//delete html element from screen

  data.splice(e.parentElement.parentElement.id, 1);//remove task from data array

  localStorage.setItem.apply("data", JSON.stringify(data));//update local storage with new data

  console.log(data);
};

//Edit to do item
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;//target item to be edited

  textInput.value = selectedTask.children[0].innerHTML;//these target values I want to edit
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);//runs the delete function to remove the selected data
};

//Get data from local storage
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();