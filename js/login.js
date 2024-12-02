function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

  if (!user) {
      alert("E-mail ou senha incorretos.");
      return;
  }

  const userSession = {
      name: user.name,
      email: user.email,
      role: user.role,
      timestamp: Date.now()
  };

  localStorage.setItem("userSession", JSON.stringify(userSession));
  alert("Login realizado com sucesso!");
  window.location.href = "index.html";
}
