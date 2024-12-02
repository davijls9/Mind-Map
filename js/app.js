// Dados iniciais com mais informações
const initialData = {
  sections: [
    {
      title: "Por que transtornos mentais têm aumentado nos últimos anos?",
      content: [
        { title: "Fatores Humanos", text: "Mudanças no estilo de vida e redes sociais são fatores." },
        { title: "Avanços Tecnológicos", text: "O aumento de dispositivos impacta a saúde mental." },
        { title: "Mudança de Estilo de Vida", text: "Menos atividades ao ar livre afetam o bem-estar." },
        { title: "Impacto Social", text: "Isolamento social e trabalho remoto contribuem para a solidão." },
        { title: "Crises Globais", text: "Pandemias e instabilidades econômicas afetam o psicológico." }
      ]
    },
    {
      title: "Como lidar com estresse?",
      content: [
        { title: "Exercícios Físicos", text: "Atividades físicas ajudam a reduzir o cortisol, o hormônio do estresse." },
        { title: "Meditação", text: "Pratique meditação ou mindfulness diariamente para relaxar." },
        { title: "Sono", text: "Durma pelo menos 7-8 horas por noite para se recuperar do estresse." },
        { title: "Tempo Offline", text: "Desconecte-se das redes sociais e aproveite a vida real." },
        { title: "Hobbies", text: "Dedique-se a atividades que tragam prazer e relaxamento." }
      ]
    },
    {
      title: "Onde achar ajuda?",
      resources: [
        "Departamento de Atenção à Saúde do Trabalhador - DAST",
        "Programa de Assistência à Saúde do Fumante - PRASF",
        "Centro de Valorização da Vida (CVV) - Ligue 188",
        "Psicólogos e Terapeutas Locais",
        "Unidades Básicas de Saúde (UBS)"
      ]
    },
    {
      title: "Dicas para um dia melhor",
      content: [
        { title: "Organize-se", text: "Planeje suas tarefas pela manhã para ter um dia mais produtivo." },
        { title: "Faça Pausas", text: "Dê intervalos a cada 2 horas para descansar a mente." },
        { title: "Se Hidrate", text: "Beba água regularmente para manter o corpo e a mente em equilíbrio." },
        { title: "Seja Grato", text: "Liste 3 coisas pelas quais você é grato hoje." },
        { title: "Pratique Bondade", text: "Faça algo gentil por alguém e veja como isso melhora seu humor." }
      ]
    }
  ],
  footer: {
    quote: "Cuide de sua mente, é onde sua vida acontece. - Equipe Mind Map",
    links: ["Política de Privacidade", "Termos de Uso", "Contato", "Sobre Nós", "Ajuda"]
  }
};

// Salvar os dados iniciais no localStorage, se ainda não existirem
if (!localStorage.getItem("mindMapData")) {
  localStorage.setItem("mindMapData", JSON.stringify(initialData));
}

// Carregar os dados do localStorage
const data = JSON.parse(localStorage.getItem("mindMapData"));

// Função para exibir seções dinamicamente e de forma randômica
function displaySections() {
  const sectionsContainer = document.getElementById("sections");
  sectionsContainer.innerHTML = "";

  const randomizedSections = data.sections
    .map(section => ({
      ...section,
      content: section.content?.sort(() => Math.random() - 0.5),
      resources: section.resources?.sort(() => Math.random() - 0.5)
    }))
    .sort(() => Math.random() - 0.5);

  randomizedSections.forEach(section => {
    const sectionElement = document.createElement("div");
    sectionElement.innerHTML = `<h2 class="section-title">${section.title}</h2>`;

    if (section.content) {
      section.content.forEach(item => {
        const card = document.createElement("div");
        card.className = "card p-4 mb-3";
        card.innerHTML = `<h5>${item.title}</h5><p>${item.text}</p>`;
        sectionElement.appendChild(card);
      });
    }

    if (section.resources) {
      const list = document.createElement("ul");
      list.className = "list-group mb-3";
      section.resources.forEach(resource => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = resource;
        list.appendChild(listItem);
      });
      sectionElement.appendChild(list);
    }

    sectionsContainer.appendChild(sectionElement);
  });
}

// Função para exibir rodapé
function displayFooter() {
  document.getElementById("footer-quote").textContent = data.footer.quote;
  const footerLinks = document.getElementById("footer-links");
  footerLinks.innerHTML = "";

  data.footer.links.forEach(link => {
    const listItem = document.createElement("li");
    listItem.className = "list-inline-item";
    listItem.innerHTML = `<a href="#">${link}</a>`;
    footerLinks.appendChild(listItem);
  });
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  displaySections();
  displayFooter();
});
