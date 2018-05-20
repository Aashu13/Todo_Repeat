var newListForm = document.getElementById("newListForm");
var listNameUl = document.getElementById("listName");
var todoForm = document.getElementById("todoForm");
var todosUlList = document.getElementById("todosUlList");

var data = [];

function renderListName() {
  for (var i = 0; i < data.length; i++) {
    var listNameLi = document.createElement("li");
    listNameLi.setAttribute("listName-index", i);

    var spanListName = document.createElement("span");
    spanListName.textContent = data[i].name;

    var spanIcon = document.createElement("i");
    spanIcon.className = "fa fa-times";
    listNameLi.appendChild(spanListName);
    listNameLi.appendChild(spanIcon);
    listNameUl.appendChild(listNameLi);
  }
}

renderListName();

function addNewList(e) {
  listNameUl.innerHTML = "";
  e.preventDefault();
  var newListNameInput = document.getElementById("newListNameInput");
  if (newListNameInput.value == "") {
    alert("please enter the list name");
    return;
  }
  var dataObject = {};
  dataObject.name = newListNameInput.value;
  dataObject.todos = [];
  data.push(dataObject);
  newListNameInput.value = "";
  renderListName();
}


function addClassFunction(e) {
  nameListIndex = e.target.getAttribute("listName-index");
  if (e.target.nodeName == "LI") {
    for (var i = 0; i < e.target.parentNode.children.length; i++) {
      e.target.parentNode.children[i].classList.remove("active");
    }
    e.target.classList.add("active");
    todoForm.style.display = "block";
    clickedNameListIndex = data[nameListIndex];
    todos = clickedNameListIndex.todos;
    renderTodos(todos);
  }
}

function renderTodos(todos) {
  todosUlList.innerHTML = "";
  for (var j = 0; j < todos.length; j++) {
    var todosLI = document.createElement("li");
    todosLI.setAttribute("todos-index", j);

    var todosText = document.createElement("span");
    todosText.textContent = todos[j].name;
    todosText.className = "todosText";

    var checkBoxInput = document.createElement("input");
    checkBoxInput.type = "checkbox";
    checkBoxInput.checked = todos[j].completed;

    var deleteIconTodos = document.createElement("i");
    deleteIconTodos.className = "fa fa-times";

    todosLI.appendChild(checkBoxInput);
    todosLI.appendChild(todosText);
    todosLI.appendChild(deleteIconTodos);
    todosUlList.appendChild(todosLI);
  }
}

function getTodos(e) {
  e.preventDefault();
  var todoInput = document.getElementById("todoInput");
  clickedNameListIndex = data[nameListIndex];
  todos = clickedNameListIndex.todos;
  console.log(todos);
  if (todoInput.value == "") {
    alert("please enter todo name");
    return false;
  }
  var todosObject = {};
  todosObject.name = todoInput.value;
  todosObject.completed = false;
  todos.push(todosObject);
  renderTodos(todos);
  todoInput.value = "";
}

function checkSateFunction(e) {
  if (e.target.type == "checkbox") {
    var checkBoxIndex = e.target.parentNode.getAttribute("todos-index");
    clickedNameListIndex = data[nameListIndex];
    todos = clickedNameListIndex.todos;
    checkBoxClicked = todos[checkBoxIndex];
    if (checkBoxClicked.completed == false) {
      checkBoxClicked.completed = true;
    } else if (checkBoxClicked.completed == true) {
      checkBoxClicked.completed = false;
    }
  }
}

function removeTodoFunction(e) {
  var clickTodoList = e.target.parentNode.getAttribute("todos-index");
  console.log(clickTodoList);
  if (e.target.nodeName == "I") {
    clickedNameListIndex = data[nameListIndex];
    todos = clickedNameListIndex.todos;
    todosUlList.removeChild(todosUlList.childNodes[clickTodoList]);
    todos.splice(clickTodoList, 1);
  }
}

function removeListName(e) {
  var removeListNameIndex = e.target.parentNode.getAttribute('listName-index');
  if (e.target.nodeName == "I") {
    clickedNameListIndex = data[nameListIndex];
    data.splice(removeListNameIndex, 1);
    listNameUl.removeChild(listNameUl.childNodes[removeListNameIndex]);
    if (e.target.parentNode.classList.contains('active')) {
      todosUlList.innerHTML = "";
      todoForm.style.display = "none";
    }
  }
}

todoForm.addEventListener("submit", getTodos);
listNameUl.addEventListener("click", addClassFunction);
listNameUl.addEventListener("click", removeListName);
newListForm.addEventListener("submit", addNewList);
todosUlList.addEventListener("change", checkSateFunction);
todosUlList.addEventListener("click", removeTodoFunction);