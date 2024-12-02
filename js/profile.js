document.addEventListener("DOMContentLoaded", () => {
    loadProfileInfo();
    loadLastReport();
    setupProfileForm();
});

// Carrega as informações do perfil do localStorage
function loadProfileInfo() {
  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!userSession) {
      document.getElementById("profile-info").innerHTML = "<p>Informações do perfil não disponíveis.</p>";
      return;
  }

  const user = users.find(u => u.email === userSession.email);

  if (!user) {
      document.getElementById("profile-info").innerHTML = "<p>Usuário não encontrado.</p>";
      return;
  }

  document.getElementById("profile-info").innerHTML = `
      <h3>Bem-vindo, ${user.name}!</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Telefone:</strong> ${user.phone || "Não informado"}</p>
      <p><strong>Função:</strong> ${user.role}</p>
      ${user.role === "profissional" ? `<p><strong>CRP:</strong> ${user.crp || "Não informado"}</p>` : ""}
  `;
}




// Carrega o último relatório do localStorage
function loadLastReport() {
    const quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];

    if (quizResults.length === 0) {
        document.getElementById("report-content").innerHTML = "<p>Nenhum relatório disponível.</p>";
        return;
    }

    const lastReport = quizResults[quizResults.length - 1];

    document.getElementById("report-content").innerHTML = `
        <p><strong>Data:</strong> ${lastReport.date}</p>
        ${lastReport.answers.map(answer => `
            <p><strong>${answer.category}:</strong> ${answer.answer}</p>
        `).join("")}
        <p><strong>Anotações:</strong> ${lastReport.notes}</p>
    `;
}

// Configura o formulário de edição de perfil
function setupProfileForm() {
    const profileInfo = JSON.parse(localStorage.getItem("userSession"));

    if (!profileInfo) return;

    const form = document.getElementById("profile-form");
    document.getElementById("name").value = profileInfo.name;
    document.getElementById("email").value = profileInfo.email;
    document.getElementById("phone").value = profileInfo.phone || "";
    document.getElementById("password").value = profileInfo.password || "";
    if (profileInfo.role === "profissional") {
        document.getElementById("crp").value = profileInfo.crp || "";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedProfile = {
            ...profileInfo,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value,
            crp: profileInfo.role === "profissional" ? document.getElementById("crp").value : null
        };

        localStorage.setItem("userSession", JSON.stringify(updatedProfile));
        alert("Perfil atualizado com sucesso!");
        loadProfileInfo(); // Recarrega as informações do perfil
    });
}

// Renderiza gráficos por categoria
document.addEventListener("DOMContentLoaded", () => {
    loadProfileInfo();
    loadLastReport();
    setupProfileForm();
});

// Funções de perfil e relatório mantidas como estão ...

