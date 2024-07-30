document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.map(task => addTaskToDOM(task));
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task;
        li.style.background='#238bcc'
        li.style.fontSize='20px'
        li.style.marginTop='5px'
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.padding='10px'
        deleteBtn.style.marginTop='0px'
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromStorage(task);
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            storeTask(task);
            taskInput.value = '';
        }
    }

    function storeTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
