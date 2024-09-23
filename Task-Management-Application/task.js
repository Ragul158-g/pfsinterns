document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const showAllButton = document.getElementById('showAllButton');
const showCompletedButton = document.getElementById('showCompletedButton');
const showPendingButton = document.getElementById('showPendingButton');

let editingTaskId = null;
let tasks = []; 
let currentFilter = 'all'; 

localStorage.clear()

addTaskButton.addEventListener('click', addOrUpdateTask);
showAllButton.addEventListener('click', () => setFilter('all'));
showCompletedButton.addEventListener('click', () => setFilter('completed'));
showPendingButton.addEventListener('click', () => setFilter('pending'));

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks();
}

function addOrUpdateTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    if (editingTaskId) {
        updateTask(editingTaskId, taskText);
    } else {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false 
        };
        tasks.push(task);
        saveTasks();
    }

    taskInput.value = '';
    editingTaskId = null; 
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); 
}

function displayTasks() {
    taskList.innerHTML = '';
    const filteredTasks = filterTasks(tasks);
    filteredTasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function filterTasks(tasks) {
    if (currentFilter === 'completed') {
        return tasks.filter(task => task.completed);
    } else if (currentFilter === 'pending') {
        return tasks.filter(task => !task.completed);
    }
    return tasks; 
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.toggle('completed', task.completed); 
    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.onclick = () => {
        toggleTaskCompletion(task.id);
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        startEditingTask(task.id, task.text);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => {
        deleteTask(task.id);
    };

    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function updateTask(taskId, newText) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, text: newText };
        }
        return task;
    });
    saveTasks();
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed }; 
        }
        return task;
    });
    saveTasks();
}

function startEditingTask(taskId, taskText) {
    editingTaskId = taskId;
    taskInput.value = taskText; 
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    displayTasks(); 
}
