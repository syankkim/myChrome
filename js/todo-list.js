const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY ="todos";
let toDos = [];

// JSON.stringify : array에 값을 string 으로 저장
function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// array.filter(doFilter) -->doFilter true? keep item : remove item
// [1,2,3,4].filter(doFilter)
// doFilter(item) { return item!==3} => new array [1,2,4]
function deleteToDo(e){
    const li = e.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintTooDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(e){
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintTooDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if(savedToDos!==null){
    const parsedToDos = JSON.parse(savedToDos);
    // console.log(parsedToDos);
    // console.log(savedToDos); // ["a","b","c"]
    toDos = parsedToDos;

    //forEach: 함수인자의 item을 iterating
    // parsedToDos.forEach((item)=> console.log(item));
    parsedToDos.forEach(paintTooDo);

}