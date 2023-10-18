@@ -25,7 +25,7 @@ function addTodo(event){
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD todo to local storage
    saveLocalTodos(todoInput.value);
    saveLocalTodos(todoInput.value, false);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>' ;
@@ -43,24 +43,42 @@ function addTodo(event){
    todoInput.value = "";
}

function deleteCheck(e){
function deleteCheck(e) {
    const item = e.target;
    //delete
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    const todo = item.parentElement;
    const todos = Array.from(todoList.children);
    const todoIndex = todos.indexOf(todo);

    // Delete
    if (item.classList[0] === 'trash-btn') {
      todo.classList.add("fall");
      removeLocalTodos(todoIndex); // Pass the index to remove the correct task
      todo.addEventListener('transitionend', function () {
        todo.remove();
      })
    }

    // Checkmark
    if (item.classList[0] === 'complete-btn') {
      const completed = !todo.classList.contains('completed');
      todo.classList.toggle('completed');
      updateLocalTodo(todoIndex, completed);
    }
  }


    //Checkmark 
    if(item.classList[0] ==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
  function updateLocalTodo(index, completed) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
}
    todos[index].completed = completed;
    localStorage.setItem("todos", JSON.stringify(todos));
  }



function filterTodo(e){
    const todos= todoList.childNodes;
@@ -87,55 +105,65 @@ function filterTodo(e){
    });
}

function saveLocalTodos(todo){
function saveLocalTodos(todo, completed = false) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    todos.push({ description: todo, completed });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
  }
  
  function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>' ;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>' ;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    todos.forEach(function (todoItem, index) {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      // Create li
      const newTodo = document.createElement('li');
      newTodo.innerText = todoItem.description;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);

      // Check mark button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);

      // Trash button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);

      // Update completed state
      if (todoItem.completed) {
        todoDiv.classList.add('completed');
      }

      // Append to list
      todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
  }


  function removeLocalTodos(index) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    todos.splice(index, 1); // Remove the task by its index
    localStorage.setItem("todos", JSON.stringify(todos));
}
  }

