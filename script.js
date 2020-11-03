const addTasks = document.querySelector(".add-tasks");
const tasksList = document.querySelector(".tasks");
const showPending = document.querySelector(".showPending");
const showCompleted = document.querySelector(".showCompleted");
const title = document.querySelector(".title");
const tasks = [];

// no arrow function because this is referenced inside
function addTask(e) {
    e.preventDefault();
    const text = this.querySelector('[name="task"]').value;
    const color = this.querySelector('[name="color"]').value;
    const id = Date.now();
    const task = {
        id,
        text,
        color,
        completed: false,
    };
    tasks.push(task);
    populateList();
    this.reset();
}

function populateList(showPendingTasks = true) {
    // set the title
    title.innerHTML = showPendingTasks ? "Pending Tasks" : "Completed Tasks";

    tasksList.innerHTML = tasks
        .filter(task => {
            // return where completed is false
            if (showPendingTasks) return !task.completed;
            else return task.completed; // return where completed is true
        })
        .map(task => {
            return `
            <li style="background:${task.color}"> 
                <p>${task.text}</p>
                ${
                    showPendingTasks
                        ? `<button id=${task.id} class="completed">✔</button>`
                        : ""
                }
                <button id=${task.id} class="remove">✖</button>
            </li>`;
        })
        .join("");
}

function handleClick(e) {
    // make sure the user has clicked the tick or cross button
    if (!e.target.matches("button")) return;

    // find out which button and list element was clicked
    const action = e.target.classList.value;
    const id = e.target.id;
    const index = tasks.findIndex(task => task.id == id);

    // console.log(id);

    // take action
    if (action === "completed") {
        tasks[index].completed = !tasks[index].completed;
    } else if (action === "remove") {
        tasks.splice(index, 1);
    }

    // re render the list
    populateList();
}

// event listeners
addTasks.addEventListener("submit", addTask);
tasksList.addEventListener("click", handleClick);
showPending.addEventListener("click", populateList);
showCompleted.addEventListener("click", () => populateList(false));
