function loginUser() {
  console.log("Iniciando o processo de login do profissional...");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email digitado:", email);
  console.log("Senha digitada:", password);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Usuários registrados no localStorage:", users);

  const user = users.find(u => u.email === email && u.password === password && u.role === "profissional");
  console.log("Resultado da busca por profissional:", user);

  if (user) {
      console.log("Profissional encontrado:", user);

      const userSession = {
          name: user.name,
          role: user.role,
          email: user.email,
          timestamp: Date.now(),
      };

      console.log("Criando sessão do profissional no localStorage:", userSession);

      // Salva a sessão no localStorage
      localStorage.setItem("userSession", JSON.stringify(userSession));

      console.log("Redirecionando para index.html com informações de login...");
      window.location.href = `index.html?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&role=profissional`;
  } else {
      console.error("Erro: Email ou senha inválidos para profissional.");
      alert("Email ou senha inválidos para profissional!");
  }
}
