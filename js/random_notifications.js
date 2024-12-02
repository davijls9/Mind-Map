const messages = [
    "Hidrate-se agora! A água é essencial para o corpo e mente.",
    "Levante-se e alongue-se! Uma pausa rápida pode fazer maravilhas.",
    "Ajuste sua postura. Evite tensões desnecessárias.",
    "Reserve alguns minutos para relaxar sua mente.",
    "Mova-se! Atividade física leve ajuda a recarregar as energias.",
];

function sendRandomNotification() {
    const message = messages[Math.floor(Math.random() * messages.length)];

    if (Notification.permission === "granted") {
        new Notification("Mind Map", { body: message });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Mind Map", { body: message });
            }
        });
    }

    setRandomInterval();
}

function setRandomInterval() {
    const interval = Math.floor(Math.random() * (60000 - 5000 + 1)) + 5000;
    setTimeout(sendRandomNotification, interval);
}

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

setRandomInterval();