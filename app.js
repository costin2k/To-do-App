const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const todoList = document.querySelector('#todo-list');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = input.value.trim();  // This line gets the value of the input element, removes any whitespace , and assigns it to the task constant.
    if (!isNaN(task) || task === '') {   //his line checks if task is not a number  or if task is an empty string . If either of these conditions is true, the function returns without executing any further code.
        return;
    }
    addTask(task);
    input.value = '';
    saveTasks();
});

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
for (const task of tasks) {
    addTask(task);
}

function addTask(task) {
    const li = document.createElement('li');
    const textNode = document.createTextNode(task);
    li.appendChild(textNode);
    todoList.appendChild(li);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    li.appendChild(editButton);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.style.display = 'none';

    editButton.addEventListener('click', () => {
        li.replaceChild(input, textNode);
        input.value = task;
        input.style.display = 'inline-block';
        input.focus();
        li.removeChild(editButton);
        saveTasks();
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            task = input.value;
            textNode.textContent = task;
            li.replaceChild(textNode, input);
            li.appendChild(editButton);
            saveTasks();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
}

function saveTasks() {
    const taskElements = todoList.querySelectorAll('li');
    const taskValues = Array.from(taskElements).map((li) => {
        return li.firstChild.textContent;
    });
    localStorage.setItem('tasks', JSON.stringify(taskValues));
}
