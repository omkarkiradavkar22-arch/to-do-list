let list =[];
        const add = document.querySelector(".add");
        const table = document.querySelector("table");
        add.addEventListener("click",()=>{
            const title = document.querySelector(".title").value;
            if(!title){
                alert("enter the task!");
            }else{
            console.log("add btn clicked");
            list.push(title);
            const row = document.createElement("tr");
            row.innerHTML=`
            <td class="task">
            <input type="checkbox">
            <span>${title}</span>
            </td>
            <td><button class="edit">Edit</button>
            <button class="del">Delete</button></td>
            `;
            table.appendChild(row);
            const checkbox = row.querySelector("input[type='checkbox']");
    
            checkbox.addEventListener("change", () => {
                const taskText = row.querySelector(".task span");
    
                if(checkbox.checked){
                    taskText.style.textDecoration = "line-through";
                    taskText.style.opacity = "0.6";
                }else{
                    taskText.style.textDecoration = "none";
                    taskText.style.opacity = "1";
                }
            });
                    console.log(title);
                    const del = row.querySelector(".del");
                    del.addEventListener("click",()=>{
                        console.log("delete btn clicked");
                        if(!checkbox.checked){
                        alert("Complete the task first!");
                        return;
                    }

                        row.remove();
            });

                const edit = row.querySelector(".edit");
                edit.addEventListener("click", () => {
                const taskCell = row.querySelector(".task span");

                const newTask = prompt("Edit task:", taskCell.innerText);

                if(newTask && newTask.trim() !== ""){
                    taskCell.innerText = newTask;
                }
            });
        }
        });