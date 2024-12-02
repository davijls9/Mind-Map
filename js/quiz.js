// Perguntas do Quiz com categorias
const questions = [
    {
        category: "Humor",
        options: ["Feliz 😊", "Tranquilo 😌", "Triste 😢"]
    },
    {
        category: "Atividades Físicas",
        options: ["Nenhuma atividade", "Pouca atividade", "Atividade completa"]
    },
    {
        category: "Disposição",
        options: ["Muito disposto", "Disposto", "Pouco disposto"]
    },
    {
        category: "Descanso",
        options: ["Dormi bem", "Dormi razoável", "Dormi mal"]
    }
];

// Inicializa o Quiz
document.addEventListener("DOMContentLoaded", () => {
    loadQuiz();
    addNotesSection();
    // Adiciona funcionalidade ao botão "Voltar"
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", goBack);
    }
});

// Carrega o Quiz na Página
function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    questions.forEach((q, index) => {
        const section = document.createElement("section");
        section.classList.add("mb-4");

        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = q.category;
        section.appendChild(categoryTitle);

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("d-flex", "flex-wrap", "justify-content-center", "gap-3");

        q.options.forEach(option => {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("btn", "btn-outline-primary", "quiz-button");
            button.textContent = option;
            button.addEventListener("click", () => selecionarBotao(button));
            buttonsContainer.appendChild(button);
        });

        section.appendChild(buttonsContainer);
        quizContainer.appendChild(section);
    });
}

// Adiciona a Seção de Anotações ao Final
function addNotesSection() {
    const quizContainer = document.getElementById("quiz-container");

    const notesSection = document.createElement("section");
    notesSection.classList.add("mb-4");

    const notesTitle = document.createElement("h3");
    notesTitle.textContent = "Minhas Anotações";
    notesSection.appendChild(notesTitle);

    const notesArea = document.createElement("textarea");
    notesArea.id = "quiz-notes";
    notesArea.classList.add("form-control");
    notesArea.rows = 5;
    notesArea.placeholder = "Escreva suas anotações sobre este quiz...";
    notesSection.appendChild(notesArea);

    quizContainer.appendChild(notesSection);
}

// Marca o botão selecionado
function selecionarBotao(button) {
    const buttons = button.parentElement.querySelectorAll(".quiz-button");
    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

// Envia o Formulário
function enviarFormulario() {
    const selectedOptions = [];
    const sections = document.querySelectorAll("#quiz-container section");
    const notes = document.getElementById("quiz-notes").value;

    // Obter o email do usuário logado
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (!userSession || !userSession.email) {
        alert("Usuário não está logado. Por favor, faça login para continuar.");
        return;
    }
    const userEmail = userSession.email;

    // Capturar as respostas do quiz
    sections.forEach((section, index) => {
        if (index < questions.length) {
            const selectedButton = section.querySelector(".quiz-button.selected");
            if (selectedButton) {
                selectedOptions.push({
                    category: questions[index].category,
                    answer: selectedButton.textContent
                });
            }
        }
    });

    if (selectedOptions.length < questions.length) {
        alert("Por favor, responda todas as perguntas.");
        return;
    }

    const quizResult = {
        answers: selectedOptions,
        notes: notes || "Sem anotações",
        date: new Date().toLocaleString()
    };

    // Salvar o resultado no localStorage relacionado ao usuário
    const allQuizzes = JSON.parse(localStorage.getItem("userQuizzes")) || {};
    if (!allQuizzes[userEmail]) {
        allQuizzes[userEmail] = [];
    }
    allQuizzes[userEmail].push(quizResult);
    localStorage.setItem("userQuizzes", JSON.stringify(allQuizzes));

    alert("Respostas e anotações enviadas com sucesso!");

    // Redirecionar para relatórios
    window.location.href = "reports.html";
}

// Voltar para a página anterior
function goBack() {
    window.history.back();
}
