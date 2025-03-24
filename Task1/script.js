let tasks = [];
const addbtn = document.getElementById("sumbit");
const inputbar = document.getElementById("task-name");
const Tasklist = document.getElementById("Tasks");

tasks = JSON.parse(localStorage.getItem('taskStore')) || [];
tasksLoad();

function saveTasks() {
  localStorage.setItem('taskStore', JSON.stringify(tasks));
}

function tasksLoad(){
    console.log(tasks); // To show in console
    Tasklist.innerHTML="";
    tasks.forEach((task,index)=>{
        let div = document.createElement("div");
        div.classList.add("task-item");
        div.innerHTML = `
         <p>${task}</p>
         <button onclick="edit(${index})">Edit</button>
         <button onclick="deleteTask(${index})">delete</button>
         `;
         Tasklist.appendChild(div);
    });
}

//Adding Tasks
addbtn.addEventListener("click",()=>{
    let task = inputbar.value;
    tasks.push(task);
    inputbar.value = null;
    saveTasks();
    tasksLoad();
});

//Deleting Tasks
function deleteTask(taskIndex){
    tasks.splice(taskIndex,1);
    saveTasks();
    tasksLoad();
}

//Editing Tasks
function edit(taskIndex){
    const newTask = prompt("Edit Task:",tasks[taskIndex]);
    if(newTask !== null){
        tasks[taskIndex] = newTask;
        saveTasks();
        tasksLoad();
    }
}

tasksLoad();//Initial Render to update the DOM