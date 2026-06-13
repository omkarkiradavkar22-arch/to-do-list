let list = JSON.parse(localStorage.getItem("tasks")) || [];

const add = document.querySelector(".add");
const table = document.querySelector("table");

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(list));
}

// Create and display task
function createTask(taskObj) {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="task">
            <input type="checkbox" ${taskObj.completed ? "checked" : ""}>
            <span>${taskObj.title}</span>
        </td>
        <td>
            <button class="edit">Edit</button>
            <button class="del">Delete</button>
        </td>
    `;

    table.appendChild(row);

    const checkbox = row.querySelector("input[type='checkbox']");
    const taskText = row.querySelector(".task span");

    // Apply completed style on page load
    if(taskObj.completed){
        taskText.style.textDecoration = "line-through";
        taskText.style.opacity = "0.6";
    }

    // Checkbox change
    checkbox.addEventListener("change", () => {

        taskObj.completed = checkbox.checked;

        if(checkbox.checked){
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.6";
        }else{
            taskText.style.textDecoration = "none";
            taskText.style.opacity = "1";
        }

        saveTasks();
    });

    // Delete task
    const del = row.querySelector(".del");

    del.addEventListener("click", () => {

        if(!checkbox.checked){
            alert("Complete the task first!");
            return;
        }

        list = list.filter(task => task !== taskObj);

        saveTasks();

        row.remove();
    });

    // Edit task
    const edit = row.querySelector(".edit");

    edit.addEventListener("click", () => {

        const newTask = prompt(
            "Edit task:",
            taskObj.title
        );

        if(newTask && newTask.trim() !== ""){

            taskObj.title = newTask;

            taskText.innerText = newTask;

            saveTasks();
        }
    });
}

// Load saved tasks on page refresh
list.forEach(task => {
    createTask(task);
});

// Add new task
add.addEventListener("click", () => {

    const title =
    document.querySelector(".title").value.trim();

    if(!title){
        alert("Enter the task!");
        return;
    }

    const taskObj = {
        title: title,
        completed: false
    };

    list.push(taskObj);

    saveTasks();

    createTask(taskObj);

    document.querySelector(".title").value = "";
});