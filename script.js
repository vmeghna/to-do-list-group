`use strict`;
// select inputs
const titleEl = document.getElementById(`title`),
  addEl = document.getElementById(`add`),
  tasksEl = document.getElementById(`tasks`),
  dbOneEl = document.getElementById(`db-one`),
  dbTwoEl = document.getElementById(`db-two`),
  dbContainerEl = document.getElementById(`db-container`),
  completedTasksEl = document.getElementById(`clear-completed-tasks`);
// global variables
let data = [];
let isEditing;
let itemToEdit;

// functions
function init() {
  isEditing = false;
  addEl.innerText = `Add`;
  addItemsToDom(data);
}

function addItemsToDom(items) {
  dbContainerEl.innerHTML = null;
  if (items.length > 0) {
    items.forEach((item) => {
      addItemToDom(item);
    });
  }
}

function addItemToDom(item) {
  const { title, id } = item;
  const listEl = document.createElement(`li`);
  listEl.classList.add(`db-two`);
  listEl.innerHTML = `<div class="db-two" id="db-two">
        <div class="box-div">
          <span class="db-title" >          <input class="db-title" type="checkbox">
${title}</span>
        </div>
        <div class="changes">
          <button class="btn-edit" onclick="editedItem(${id})">
          <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn-delete" onclick="deletedItem(${id})">
          <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>`;
  dbContainerEl.appendChild(listEl);
}

function deletedItem(id) {
  data = data.filter((item) => item.id !== id);
  addItemsToDom(data);
}

function editedItem(id) {
  isEditing = true;
  addEl.innerText = `Edit`;
  itemToEdit = data.find((item) => item.id === id);
  titleEl.value = itemToEdit.title;
}

// eventListeners
addEl.addEventListener(`click`, () => {
  const input = titleEl.value;
  if (input) {
    if (isEditing) {
      data = data.map((item) => {
        if (item.id === itemToEdit.id) {
          let updatedItem = {
            id: item.id,
            title: input,
          };
          return updatedItem;
        } else {
          return item;
        }
      });
      addItemsToDom(data);
      isEditing = false;
      addEl.innerText = `Add`;
      itemToEdit = {};
    } else {
      let newItem = {
        id: Date.now(),
        title: input,
      };
      data.push(newItem);
      addItemsToDom(data);
    }
    titleEl.value = null;
  } else {
    alert(`input is required`);
  }
});

tasksEl.addEventListener(`click`, () => {
  dbContainerEl.innerHTML = null;
  data.splice(0, data.length);
});

// document.addEventListener("DOMContentLoaded", function () {
//   const completedTask = document.getElementById("clear-Completed-task");
//   const taskList = document.querySelector(".task-list");

//   completedTask.addEventListener("click", function () {
//     // Loop through task list items and remove completed ones
//     const taskItems = taskList.querySelectorAll(".task-item");
//     taskItems.forEach(function (taskItem) {
//       if (taskItem.classList.contains("completed")) {
//         taskItem.remove();
//       }
//     });
//   });
// });

// init settings
init();
