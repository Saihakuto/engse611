const form = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let todos = [];

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText.length === 0) {
    alert("Task cannot be empty!");
    return;
  }

  if (todoText.length > 50) {
    alert("Task cannot exceed 50 characters!");
    return;
  }

  const todo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos();
}

function deleteTodo(id) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
  }
}

function toggleCompleted(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    const todoText = document.createElement("span");
    const todoDeleteButton = document.createElement("button");
    const checkBox = document.createElement("input");

    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", () => toggleCompleted(todo.id));

    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.classList.add("completed-text");
    }

    todoDeleteButton.textContent = "Delete";
    todoDeleteButton.addEventListener("click", () => deleteTodo(todo.id));

    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoDeleteButton);
    todoList.appendChild(todoItem);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

renderTodos();
