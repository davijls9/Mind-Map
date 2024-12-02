document.addEventListener("DOMContentLoaded", () => {
    loadProfileInfo();
    loadLastReport();
    setupProfileForm();
});

// Carrega as informações do perfil do localStorage
function loadProfileInfo() {
    const userSession = JSON.parse(localStorage.getItem("userSession"));

    if (!userSession || !userSession.email) {
        document.getElementById("profile-info").innerHTML = "<p>Informações do perfil não disponíveis.</p>";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(user => user.email === userSession.email);

    if (!currentUser) {
        document.getElementById("profile-info").innerHTML = "<p>Informações do perfil não disponíveis.</p>";
        return;
    }

    document.getElementById("profile-info").innerHTML = `
        <h3>Bem-vindo, ${currentUser.name}!</h3>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Telefone:</strong> ${currentUser.phone || "Não informado"}</p>
        <p><strong>Função:</strong> ${currentUser.role}</p>
        ${currentUser.role === "profissional" ? `<p><strong>CRP:</strong> ${currentUser.crp || "Não informado"}</p>` : ""}
    `;
}

// Carrega o último relatório do localStorage
function loadLastReport() {
    const userSession = JSON.parse(localStorage.getItem("userSession"));

    if (!userSession || !userSession.email) {
        document.getElementById("report-content").innerHTML = "<p>Nenhum relatório disponível.</p>";
        return;
    }

    const userEmail = userSession.email;
    const allQuizzes = JSON.parse(localStorage.getItem("userQuizzes")) || {};
    const userQuizzes = allQuizzes[userEmail] || [];

    if (userQuizzes.length === 0) {
        document.getElementById("report-content").innerHTML = "<p>Nenhum relatório disponível.</p>";
        return;
    }

    const lastReport = userQuizzes[userQuizzes.length - 1];

    document.getElementById("report-content").innerHTML = `
        <h4>Último Relatório</h4>
        <p><strong>Data:</strong> ${lastReport.date}</p>
        ${lastReport.answers.map(answer => `
            <p><strong>${answer.category}:</strong> ${answer.answer}</p>
        `).join("")}
        <p><strong>Anotações:</strong> ${lastReport.notes}</p>
    `;
}

// Configura o formulário de edição de perfil
function setupProfileForm() {
    const userSession = JSON.parse(localStorage.getItem("userSession"));

    if (!userSession || !userSession.email) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(user => user.email === userSession.email);

    if (!currentUser) return;

    const form = document.getElementById("profile-form");
    document.getElementById("name").value = currentUser.name;
    document.getElementById("email").value = currentUser.email;
    document.getElementById("phone").value = currentUser.phone || "";
    document.getElementById("password").value = currentUser.password || "";
    if (currentUser.role === "profissional") {
        document.getElementById("crp").value = currentUser.crp || "";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedProfile = {
            ...currentUser,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value,
            crp: currentUser.role === "profissional" ? document.getElementById("crp").value : null
        };

        const updatedUsers = users.map(user => user.email === userSession.email ? updatedProfile : user);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert("Perfil atualizado com sucesso!");
        loadProfileInfo(); // Recarrega as informações do perfil
    });
}
