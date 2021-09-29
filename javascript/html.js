// funções de criação do html
function newBlock(blockName="Novo Bloco") { // novo elemento bloco
    // variaveis referentes aos elementos
    const block = document.createElement("div"); // principal
    const header = document.createElement("div"); // secundario
    const blockHeaderName = document.createElement("input");
    const blockDel = document.createElement("button");
    const icon = document.createElement("i");
    const listContainer = document.createElement("div"); // secundario
    const createTodo = document.createElement("button");

    //configuração de cada lemento e inserção dele
    blockHeaderName.classList = "blockName";
    blockHeaderName.type = "text";
    blockHeaderName.value = blockName;
    blockHeaderName.maxLength = 25; // limite de caracteres (alterar)
    header.appendChild(blockHeaderName);

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
    return block
}

function newTodo(block, content="", checkTodo=false) { // novo elemento ToDo
    block = getParent(block, "blockList").querySelector('ul');   
    
    // criação do elemento principal e dos children
    const todo = document.createElement("li");
    const check = document.createElement("input");
    const text = document.createElement("input");
    const button = document.createElement("button");
    
    check.type = "checkbox";
    check.classList = "todoCheck";
    if (checkTodo) {
        check.checked = true;
    }
    check.addEventListener('click', () => {
        checkbox(check);
    })
    todo.appendChild(check);

    text.type = "text";
    text.classList = "todoText";
    text.value = content;
    todo.appendChild(text);

    button.classList = "todoDel";
    button.textContent = "X";
    button.addEventListener("click", () => { // chamar a função para deleter o TODO ao clicar
        this.delTodo(button);
    })
    todo.appendChild(button);

    todo.classList = "todoItem";

    block.appendChild(todo);
    checkbox(todo.firstChild);
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

function checkbox(checkBox) { // verificação da checkbox e alteração do texto
    const textElement = checkBox.parentElement.querySelector(".todoText");
    if (checkBox.checked) {
        textElement.style.color = "rgba(10, 50, 50, 0.5)"
    }
    else {
        textElement.style.color = "rgb(10, 50, 50)"
    }
    checkAll(checkBox)
}

function checkAll(block) { // função para fazer a checagem de todos checkbox
    block = getParent(block, "blockList").querySelectorAll("li")
    let checked = true; // variavel para indicar se há checkbox não marcada
    block.forEach(item => {
        item = item.querySelector(".todoCheck");
        if (!item.checked) {
            checked = false;
        }
    })
    return changeBlockColor(getParent(block[0], "block"), checked)
}

function changeBlockColor(block, checked) { // muda a transparencia do bloco
    if (checked) { // caso todas checkbos estejam marcadas
        block.style.opacity = "0.7";
    }
    else {
        block.style.opacity = "1" 
    }
}

// temporario, alterar para funcionar com banco de dados
function loadBlocks(blocks) { // carrega os blocos
    for (let block of blocks) {
        blockName = block.split("%&%")[0];
        blockTodo = block.split("%&%")[1]
        newBlockLoad = newBlock(blockName);
        blockTodo.split("&&").forEach(todo => {
            if (!todo == "") {
                let check = false;
                if (todo[0] === "*") {
                    check = true;
                    todo.replace("*", "")
                }
                newTodo(newBlockLoad, todo, check)
            }
        })
    }
}

// botões
const newBtn = document.querySelector(".newBlock");
const saveBtn = document.querySelector(".save");
const undoBtn = document.querySelector(".undo");
const accountBtn = document.querySelector(".account");

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

// temporario para testes, deve usar valores vindo de um banco de dados
const blocksToLoad = ["AAAAA%&%*todo1&&*todo2&&*todo3&&*todo4&&", "BBBBB%&%DAWDWU&&*DOAWOUH&&DAWIODJOWID&&DAWNODWAJ&&", "FFFFF"];

loadBlocks(blocksToLoad);

// funções utilitárias
function getParent(element, searchClass) { // retorna o elemento pai que tiver uma class especifica
    if (element.className === "block") {
        return element.lastChild
    }
    while (element && element.parentElement) {
        element = element.parentElement;
        if (element.getAttribute("class") === searchClass) {
            return element
        }
    }

    return null; // null caso não ache o elemento
}