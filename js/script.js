let waktu = new Date();
let waktuSekarang = waktu.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});

let fullTime = document.getElementById("current-time")
fullTime.textContent = waktuSekarang;

const priorityButton = document.querySelectorAll(".priority-btn-low, .priority-btn-med, .priority-btn-high")
let priorityTask = "";
priorityButton.forEach((button) => {
    button.addEventListener("click", (event)=> {
        let buttonClicked = button.textContent
        priorityTask = buttonClicked
        console.log(priorityTask)
    })
})

const submitTask = document.getElementById("submitBtn")
const isiTask = document.querySelector("textarea")
const todoTask = document.getElementById("todo-tasks")
const doneTask = document.getElementById('done-tasks')
const deleteAll = document.getElementById("delete-all")
const todoCount = document.getElementById("todo-count")
const doneCount = document.getElementById("done-count")

function updateTaskCount() {
    todoCount.textContent = todoTask.children.length;
    doneCount.textContent = doneTask.children.length;
}

function addTask () {

    let priorityColor = "";

    if (priorityTask === "Low") {
        priorityColor = "low-priority";
    }
    else if (priorityTask === "Medium") {
        priorityColor = "medium-priority";
    }
    else if (priorityTask === "High") {
        priorityColor = "high-priority";
    }

    const taskItem = document.createElement("article");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
    <div class="task-content">
        <label>
            <input type="checkbox">
            <span class="task-text">
                ${isiTask.value}
            </span>
        </label>
                
        <div class="task-right">
            <span class="task-date">
                ${waktuSekarang}
            </span>

            <span class="priority-badge ${priorityColor}">${priorityTask}</span>

            <button class="delete-btn">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
    </div>`

    const checkbox = taskItem.querySelector("input");
    const taskText = taskItem.querySelector(".task-text");  
    const deleteButton = taskItem.querySelector(".delete-btn");

    todoTask.appendChild(taskItem);

    taskDone(checkbox, taskItem, taskText);
    deleteTask(deleteButton, taskItem);
}

function taskDone(checkbox, taskItem, taskText) {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            doneTask.appendChild(taskItem);
            taskText.style.textDecoration = "line-through";
        } else {
            todoTask.appendChild(taskItem);
            taskText.style.textDecoration = "none";
        }
        updateTaskCount();
    });
}

function deleteTask(deleteButton, taskItem) {
    deleteButton.addEventListener("click", () => {
        taskItem.remove();
        updateTaskCount();
    });
}

submitTask.addEventListener("click", (event) => {
    event.preventDefault()
    addTask();
    isiTask.value ="";
    updateTaskCount();
})

deleteAll.addEventListener("click", () => {
    todoTask.innerHTML = "";
    doneTask.innerHTML = "";
    updateTaskCount();
});
