function manageNavigation() {
    const navLinks = document.getElementById("nav-links");
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const currentTime = Date.now();

    navLinks.innerHTML = "";

    createSessionFromUrl();

    if (userSession && currentTime - userSession.timestamp < 3600000) {
        console.log("Sessão válida encontrada:", userSession);

        addMenuItem(navLinks, "Quiz", "quiz.html");
        addMenuItem(navLinks, "Mapa", "map.html");
        addMenuItemWithConditionalCounter(navLinks, "Lembretes", "reminders.html", "reminders-counter", checkNewReminders);
        addMenuItemWithConditionalCounter(navLinks, "Notificações", "notifications.html", "notifications-counter", checkNewNotifications);
        addMenuItem(navLinks, "Relatórios", "reports.html");
        addMenuItem(navLinks, "Dicas", "tips.html");
        addMenuItem(navLinks, "Perfil", "profile.html");

        const logoutLink = document.createElement("li");
        logoutLink.className = "nav-item";
        logoutLink.innerHTML = '<a href="#" class="nav-link" id="logout-link">Sair</a>';
        navLinks.appendChild(logoutLink);

        document.getElementById("logout-link").addEventListener("click", logout);

        // Pré-carrega as páginas em segundo plano
        preloadPages();
    } else {
        console.log("Nenhuma sessão válida encontrada. Usuário deve logar.");

        addMenuItem(navLinks, "Login", "login.html");
        addMenuItem(navLinks, "Registrar", "register.html");
    }
}

function createSessionFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");

    if (name && email && role) {
        const userSession = {
            name,
            role,
            email,
            timestamp: Date.now(),
        };
        localStorage.setItem("userSession", JSON.stringify(userSession));
        console.log("Sessão criada com sucesso a partir da URL:", userSession);
    }
}

function logout() {
    console.log("Realizando logout...");
    localStorage.removeItem("userSession");
    alert("Você saiu com sucesso!");
    window.location.href = "index.html";
}

function addMenuItem(container, text, href) {
    const item = document.createElement("li");
    item.className = "nav-item";
    item.innerHTML = `<a href="${href}" class="nav-link">${text}</a>`;
    container.appendChild(item);
}

function addMenuItemWithConditionalCounter(container, text, href, counterId, conditionFunction) {
    const condition = conditionFunction();
    const item = document.createElement("li");
    item.className = "nav-item";
    item.innerHTML = condition
        ? `<a href="${href}" class="nav-link">${text} <span id="${counterId}" class="badge bg-danger ms-1">${condition}</span></a>`
        : `<a href="${href}" class="nav-link">${text}</a>`;
    container.appendChild(item);
}

function checkNewReminders() {
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const now = new Date();
    const newReminders = reminders.filter(reminder => new Date(reminder.time) > now);
    return newReminders.length > 0 ? newReminders.length : null;
}

function checkNewNotifications() {
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    return notifications.length > 0 ? notifications.length : null;
}

function preloadPages() {
    const pagesToPreload = [
        "quiz.html",
        "map.html",
        "reminders.html",
        "notifications.html",
        "reports.html",
        "profile.html"
    ];

    pagesToPreload.forEach(page => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = page;
        document.head.appendChild(link);
    });

    console.log("Páginas pré-carregadas:", pagesToPreload);
}

document.addEventListener("DOMContentLoaded", manageNavigation);
