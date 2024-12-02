// Seleciona uma frase aleatória de um array
function getRandomPhrase(phrases) {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

// Adiciona um elemento HTML dinamicamente ao DOM
function createElement(tag, className, content = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
}

// Adiciona um item à lista (exemplo de recurso de reutilização)
function addListItem(list, className, content) {
    const listItem = createElement("li", className, content);
    list.appendChild(listItem);
}

// Função para carregar JSON do localStorage
function loadData(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

// Função para salvar JSON no localStorage
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Funções utilitárias para localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
