// funções de criação do html
function newBlock() { // novo elemento bloco
    // variaveis referentes aos elementos
    const block = document.createElement("div"); // principal
    const header = document.createElement("div"); // secundario
    const blockName = document.createElement("input");
    const blockDel = document.createElement("button");
    const icon = document.createElement("i");
    const listContainer = document.createElement("div"); // secundario
    const createTodo = document.createElement("button");

    //configuração de cada lemento e inserção dele
    blockName.classList = "blockName";
    blockName.type = "text";
    blockName.value = "Novo Bloco";
    blockName.maxLength = 25; // limite de caracteres (alterar)
    header.appendChild(blockName);

    icon.classList = "fas fa-trash"; // icone o font awesome 
    blockDel.classList = "blockDel";
    blockDel.appendChild(icon);
    blockDel.addEventListener('click', () => { // chamar a função para deleter o bloco ao clicar
        delBlock(blockDel);
    })
    header.appendChild(blockDel);

    header.classList = "blockHeader";
    block.appendChild(header);

    listContainer.classList = "blockList";
    listContainer.appendChild(document.createElement("ul"));

    createTodo.classList = "newTodo";
    createTodo.textContent = "Novo ToDo";
    createTodo.addEventListener('click', () => { // chamar a função para cirar um TODO ao clicar
        newTodo(createTodo);
    })
    listContainer.appendChild(createTodo);

    block.classList = "block";
    block.appendChild(listContainer);
    document.querySelector(".containerBlocks").appendChild(block); // insere o elemento completo no html
}

function newTodo(block) { // novo elemento ToDo
    block = getParent(block, "blockList").querySelector('ul');
    
    // criação do elemento principal e dos children
    const todo = document.createElement("li");
    const check = document.createElement("input");
    const text = document.createElement("input");
    const button = document.createElement("button");
    
    check.type = "checkbox";
    check.classList = "todoCheck";
    todo.appendChild(check);

    text.type = "text";
    text.classList = "todoText";
    todo.appendChild(text);

    button.classList = "todoDel";
    button.textContent = "X";
    button.addEventListener("click", () => { // chamar a função para deleter o TODO ao clicar
        this.delTodo(button);
    })
    todo.appendChild(button);

    todo.classList = "todoItem";

    block.appendChild(todo);
}

function delTodo(todo) { // deleta um ToDo
    todo = getParent(todo, "todoItem");
    try {
        todo.remove();
    }
    catch {
        throw new Error("Element not found.")
    }
}

function delBlock(block) { // deleta o bloco inteiro
    block = getParent(block, "block");
    try {
        block.remove()
    }
    catch {
        throw new Error("Element not found.")
    }
}


// botões
const newBtn = document.querySelector(".newBlock");
const saveBtn = document.querySelector(".save");
const undoBtn = document.querySelector(".undo");
const accountBtn = document.querySelector(".account");
const newTodoBtn = document.querySelectorAll(".newTodo");
const blockDelBtn = document.querySelectorAll(".blockDel")

// botões eventlisteners
newBtn.addEventListener('click', () => {
    newBlock();
})

saveBtn.addEventListener('click', () => {
    alert("Salvar")
})

undoBtn.addEventListener('click', () => {
    alert("Desfazer")
})

accountBtn.addEventListener('click', () => {
    alert("Conta")
})

// funções utilitárias
function getParent(element, searchClass) { // retorna o elemento pai que tiver uma class especifica
    while (element && element.parentElement) {
        element = element.parentElement;
        if (element.getAttribute("class") === searchClass) {
            return element
        }
    }

    return null; // null caso não ache o elemento
}