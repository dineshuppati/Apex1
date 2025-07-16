function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('Please enter a task');
        return;
    }

    const todoList = document.getElementById('todoList');
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    const textSpan = document.createElement('span');
    textSpan.textContent = todoText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'complete-btn';
    completeButton.onclick = function() {
        todoItem.classList.toggle('completed');
        completeButton.textContent = todoItem.classList.contains('completed') ? 'Undo' : 'Complete';
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        todoList.removeChild(todoItem);
    };

    todoItem.appendChild(textSpan);
    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);

    todoInput.value = '';
}

function clearAll() {
    const todoList = document.getElementById('todoList');
    if (todoList.children.length === 0) {
        alert('No tasks to clear');
        return;
    }
    if (confirm('Are you sure you want to clear all tasks?')) {
        todoList.innerHTML = '';
    }
}