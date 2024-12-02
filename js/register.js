document.getElementById("role").addEventListener("change", function () {
  const crpField = document.getElementById("crp");
  crpField.style.display = this.value === "profissional" ? "block" : "none";
});

function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value.trim();
  const role = document.getElementById("role").value;
  const crp = document.getElementById("crp").value.trim();

  if (!name || !email || !password || !phone) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

  if (emailExists) {
      alert("Este e-mail já está registrado. Por favor, use outro e-mail.");
      return;
  }

  const newUser = {
      name,
      email,
      password,
      phone,
      crp: role === "profissional" ? crp : null,
      role
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

