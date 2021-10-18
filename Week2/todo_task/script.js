document.querySelector("#add").onclick = function () {
  // ADDING INPUT VALIDATION TO ENSURE USERS DONT ADD EMPTY TASKS
  if (document.querySelector("#newtask input").value.length == 0) {
    alert("Yo, Enter An Actual Task");
  } else {
    //ADD TASKS
    document.querySelector("#tasks").innerHTML += `
        <div class = "task">
        <span id="taskname">
        ${document.querySelector("#newtask input").value}
        </span>
        <button class="delete">
      Delete
        </button>
        </div>
        `;
    //DELETE TASKS
    var current_tasks = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }

    //CROSS OFF TASKS
    var tasks = document.querySelectorAll(".task");

    for (let i = 0; i < tasks.length; i++) {
      tasks[i].onclick = function () {
        this.classList.toggle("done");
      };
    }
    document.querySelector("#newtask input").value = "";
  }
};
