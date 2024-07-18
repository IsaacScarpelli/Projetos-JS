//Seleção de elementos
const tarefaForm = document.querySelector("#tarefa-form");
const tarefaInput = document.querySelector("#tarefa-input");
const tarefaList = document.querySelector("#tarefa-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

//Funções
const saveTarefa = (text, done = 0, save) =>{
    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");

    const tarefaTitle = document.createElement("h3");
    tarefa.appendChild(tarefaTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-tarefa");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    tarefa.appendChild(doneBtn);

    /*const editBtn = document.createElement("button");
    editBtn.classList.add("edit-tarefa")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    tarefa.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-tarefa")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tarefa.appendChild(deleteBtn);*/

    //Save state
    if(done){
        tarefa.classList("done")
    }

    //(save){
    //     saveTarefaLocalStorage({text, done:0})
    //}

    tarefaList.appendChild(tarefa);
    tarefaInput.value = "";
}

//Storage

//Eventos
tarefaForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const inputValue = tarefaInput.value
    console.log(inputValue)
})