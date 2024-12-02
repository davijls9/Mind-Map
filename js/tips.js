document.addEventListener("DOMContentLoaded", () => {
    loadTips();
});

function loadTips() {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (!userSession || !userSession.email) {
        alert("Você precisa estar logado para acessar as dicas.");
        return;
    }

    const userEmail = userSession.email;
    const allTips = JSON.parse(localStorage.getItem("userTips")) || {};
    const tips = allTips[userEmail] || generateRandomTips();

    const tipsContainer = document.getElementById("tips-container");
    tipsContainer.innerHTML = "";

    tips.forEach(tip => {
        const tipCard = document.createElement("div");
        tipCard.className = "card mb-3 p-3";
        tipCard.innerHTML = `
            <h5>${tip.response}</h5>
            <p>${tip.suggestion}</p>
        `;
        tipsContainer.appendChild(tipCard);
    });
}

function generateRandomTips() {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (!userSession || !userSession.email) return [];

    const userEmail = userSession.email;
    const userQuizzes = JSON.parse(localStorage.getItem("userQuizzes")) || {};
    const lastQuiz = (userQuizzes[userEmail] || []).slice(-1)[0];
    if (!lastQuiz) return [];

    const tips = [];
    const answerMapping = {
        "Feliz 😊": [
            "Continue mantendo esse estado de espírito positivo!",
            "Aproveite para contagiar as pessoas ao seu redor com sua alegria.",
            "Que tal escrever em um diário de gratidão hoje?",
            "Compartilhe sua felicidade com amigos ou familiares.",
            "Mantenha esse equilíbrio, e sua produtividade vai aumentar!"
        ],
        "Triste 😢": [
            "Considere falar com alguém de confiança sobre seus sentimentos.",
            "Reserve um tempo para si mesmo e pratique algo que você goste.",
            "Faça uma pequena caminhada para clarear a mente.",
            "Tente identificar o que está causando sua tristeza e enfrentá-la aos poucos.",
            "Procure apoio profissional, caso necessário."
        ],
        "Nenhuma atividade": [
            "Tente incluir uma caminhada curta em sua rotina.",
            "Que tal começar com 5 minutos de alongamento por dia?",
            "Atividades físicas podem melhorar seu humor e disposição.",
            "Defina metas simples, como subir escadas em vez de usar o elevador.",
            "Movimente-se! Pequenas ações fazem grandes diferenças."
        ],
        "Pouca atividade": [
            "Ótimo começo! Que tal aumentar a intensidade?",
            "Tente adicionar exercícios leves à sua rotina.",
            "Continue progredindo, e logo verá resultados.",
            "Que tal um desafio de 10 minutos de exercícios amanhã?",
            "Estabeleça uma frequência maior e veja os benefícios."
        ],
        "Atividade completa": [
            "Excelente trabalho em se manter ativo!",
            "Continue assim e lembre-se de variar os exercícios.",
            "Que tal recompensar-se por manter sua rotina?",
            "Mantenha o ritmo, mas também respeite seus limites.",
            "Compartilhe sua jornada com amigos para inspirá-los."
        ],
        "Muito disposto": [
            "Aproveite essa energia para realizar tarefas importantes.",
            "Use essa disposição para organizar sua agenda e prioridades.",
            "Seja produtivo, mas lembre-se de reservar um tempo para descansar.",
            "Que tal planejar algo novo e empolgante?",
            "Sua energia pode inspirar outras pessoas ao seu redor!"
        ],
        "Disposto": [
            "Você está indo bem! Continue assim.",
            "Aproveite esse estado para realizar pequenas metas.",
            "Planeje sua semana para manter esse ritmo.",
            "Que tal reservar um tempo para aprendizado ou hobbies?",
            "Use esse momento para cuidar de si mesmo e das pessoas próximas."
        ],
        "Pouco disposto": [
            "Considere ajustar seu sono e alimentação.",
            "Reserve um momento para descansar e recarregar as energias.",
            "Que tal ouvir uma música relaxante para melhorar sua disposição?",
            "Evite tarefas pesadas e concentre-se no essencial.",
            "Experimente técnicas de respiração para aumentar sua energia."
        ],
        "Dormi bem": [
            "Dormir bem é essencial. Continue priorizando isso.",
            "Mantenha sua rotina de sono para colher mais benefícios.",
            "Um bom sono é o segredo para uma mente mais saudável.",
            "Aproveite essa disposição para realizar tarefas pendentes.",
            "Que tal compartilhar sua rotina de sono com amigos?"
        ],
        "Dormi razoável": [
            "Tente relaxar antes de dormir para melhorar sua qualidade de sono.",
            "Que tal ajustar seu horário para dormir um pouco mais cedo?",
            "Evite telas antes de dormir para ter um sono mais profundo.",
            "Pratique técnicas de relaxamento para ajudar no descanso.",
            "Estabeleça uma rotina de sono mais consistente."
        ],
        "Dormi mal": [
            "Considere técnicas de relaxamento para melhorar seu sono.",
            "Evite cafeína e alimentos pesados antes de dormir.",
            "Tente manter seu ambiente de sono mais confortável.",
            "Que tal um banho quente antes de dormir para relaxar?",
            "Procure entender as causas do sono ruim e corrigi-las."
        ]
    };

    lastQuiz.answers.forEach(answer => {
        const suggestions = answerMapping[answer.answer];
        if (suggestions) {
            const randomTip = suggestions[Math.floor(Math.random() * suggestions.length)];
            tips.push({
                response: answer.answer,
                suggestion: randomTip
            });
        }
    });

    const allTips = JSON.parse(localStorage.getItem("userTips")) || {};
    allTips[userEmail] = tips;
    localStorage.setItem("userTips", JSON.stringify(allTips));

    return tips;
}