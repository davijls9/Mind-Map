// Frases pré-definidas
const phrases = [
  "Está tudo bem? Vamos fazer o quiz hoje?",
  "Chegou o momento de parar tudo e respirar um pouco.",
  "O dia hoje é especial, já que hoje é o seu aniversário! Parabéns!",
  "Você sabia que 10 minutos de meditação podem mudar o seu dia?",
  "Aproveite este momento para relaxar e cuidar de si mesmo.",
  "Lembre-se: é ok não estar ok. Procure apoio quando precisar.",
  "Uma mente tranquila é o maior presente que você pode dar a si mesmo."
];

// Adiciona notificações dinamicamente
function addNotification(message) {
  const container = document.getElementById("notifications");
  const notification = createElement("div", "notification", `<h5>Mind Map</h5><p>${message}</p>`);
  container.prepend(notification);
}

// Gera notificações automaticamente
document.addEventListener("DOMContentLoaded", () => {
  addNotification(getRandomPhrase(phrases)); // Frase inicial aleatória

  let index = 0;
  setInterval(() => {
    addNotification(phrases[index]);
    index = (index + 1) % phrases.length;
  }, 5000);
});
