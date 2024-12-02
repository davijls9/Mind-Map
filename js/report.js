// Carrega e exibe resultados do quiz// Carrega e exibe resultados do quiz
function carregarResultadosQuiz() {
  const userSession = JSON.parse(localStorage.getItem("userSession"));
  if (!userSession || !userSession.email) {
      alert("Usuário não está logado.");
      return;
  }
  const userEmail = userSession.email;

  const allQuizzes = JSON.parse(localStorage.getItem("userQuizzes")) || {};
  const userQuizzes = allQuizzes[userEmail] || [];

  const quizResultsContainer = document.getElementById("quiz-results-container");
  quizResultsContainer.innerHTML = "";

  if (userQuizzes.length === 0) {
      quizResultsContainer.innerHTML = "<p class='text-center'>Nenhum resultado disponível.</p>";
      return;
  }

  userQuizzes.forEach(quiz => {
      const resultDiv = document.createElement("div");
      resultDiv.className = "result-item";

      resultDiv.innerHTML = `
          <h3>Data: ${quiz.date}</h3>
          ${quiz.answers.map(answer => `
              <p><strong>${answer.category}:</strong> ${answer.answer}</p>
          `).join("")}
          <p><strong>Anotações:</strong> ${quiz.notes}</p>
      `;
      quizResultsContainer.appendChild(resultDiv);
  });
}



// Compartilhar conteúdo no clipboard
function shareContent() {
  const quizResult = JSON.parse(localStorage.getItem("quizResult"));
  if (!quizResult) return;

  const content = formatReportText(quizResult);
  navigator.clipboard.writeText(content)
    .then(() => alert("Conteúdo copiado para a área de transferência!"))
    .catch(error => alert("Erro ao copiar o conteúdo: " + error.message));
}

// Compartilhar via WhatsApp
function shareViaWhatsApp() {
  const quizResult = JSON.parse(localStorage.getItem("quizResult"));
  if (!quizResult) return;

  const content = formatReportText(quizResult);
  const urlWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(content)}`;
  window.open(urlWhatsApp, "_blank");
}

// Gerar e baixar como PDF
function shareAsPDF() {
  const quizResult = JSON.parse(localStorage.getItem("quizResult"));
  if (!quizResult) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let yPosition = 10;

  doc.text("Resultado do Quiz", 10, yPosition);
  yPosition += 10;

  doc.text(`Data: ${quizResult.date}`, 10, yPosition);
  yPosition += 10;

  quizResult.answers.forEach(answer => {
    doc.text(`${answer.category}: ${answer.answer}`, 10, yPosition);
    yPosition += 10;
  });

  doc.text(`Anotações: ${quizResult.notes}`, 10, yPosition);
  doc.save("resultado_quiz.pdf");
}

// Formatar texto para compartilhamento
function formatReportText(report) {
  const answers = report.answers.map(answer => `- ${answer.category}: ${answer.answer}`).join("\n");
  return `Resultado do Quiz\n\nData: ${report.date}\n\nRespostas:\n${answers}\n\nAnotações:\n${report.notes}`;
}

// Inicializa a exibição dos resultados
document.addEventListener("DOMContentLoaded", carregarResultadosQuiz);
