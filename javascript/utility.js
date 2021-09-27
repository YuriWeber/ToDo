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