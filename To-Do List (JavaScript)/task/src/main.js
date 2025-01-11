//load localStorage for saved tasklist
document.addEventListener('DOMContentLoaded', function(event) {
    const savedTasks = loadTasks();
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `<input type="checkbox" id="task-item" ${task.isCompleted ? 'checked' : ''}><span>${task.text}</span> <span class="done"></span><button class="delete-btn" onclick="deleteTask(this)">x</button>`
    if (task.isCompleted) {
        li.querySelector('.done').textContent = "Done!";
    }
        taskList.appendChild(li);
    });
})

//fields
const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById(  "add-task-button");

//define task as object
function Task(taskName){
    this.taskName = taskName;
    this.finished = false;
}

//parsing from user input to become task object
function parsingTask(){
    let newTask = inputTask.value;
    if (newTask === "") { }
    else {
        let task = new Task(newTask);
        addTask(task);
        inputTask.value = "";
    }
}

//methods & event handlers
function addTask(task) {
    let li = document.createElement("li");
    li.className = "task";
    li.innerHTML = '<input type="checkbox" id="task-item"><span>' + task.taskName + '</span> <span class="done"></span><button class="delete-btn" onclick="deleteTask(this)">x</button>'
    taskList.appendChild(li);
    saveTasks()
}

addTaskButton.addEventListener("click", parsingTask);

inputTask.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        parsingTask();
        saveTasks()
    }
});

taskList.addEventListener("click", function(e) {
    if (e.target.type === 'checkbox') {
        const liParent = e.target.closest('li');
        const doneSpan = liParent.querySelector('.done');
        if (e.target.checked) {
            doneSpan.textContent = 'Done!';
            e.target.finished = true;
            saveTasks()
        }
        else {
            doneSpan.textContent = '';
            e.target.finished = false;
            saveTasks()
        }
    }
});

function deleteTask(task) {
    task.parentNode.remove();
    saveTasks()
}

//localStorage implementation
function saveTasks() {
    const taskItems = document.querySelectorAll('#task-list li');
    const tasks = [];
    taskItems.forEach((item) => {
        const liTask = {
            text: item.querySelector('span').textContent,
            isCompleted: item.querySelector('input[type="checkbox"]').checked
        };
        tasks.push(liTask);
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
}