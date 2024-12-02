document.addEventListener("DOMContentLoaded", () => {
    loadReminders();
});

function loadReminders() {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (!userSession || !userSession.email) {
        alert("Você precisa estar logado para acessar os lembretes.");
        return;
    }

    const userEmail = userSession.email;
    const allReminders = JSON.parse(localStorage.getItem("userReminders")) || {};
    const reminders = allReminders[userEmail] || [];

    const reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = "";

    reminders.forEach(reminder => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${reminder.text} - ${new Date(reminder.time).toLocaleString()}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remover";
        deleteBtn.onclick = () => deleteReminder(userEmail, reminder);
        li.appendChild(deleteBtn);

        reminderList.appendChild(li);
    });
}

function addReminder() {
    const input = document.getElementById("reminderInput").value.trim();
    const timeInput = document.getElementById("reminderTime").value;
    const reminderTime = new Date(timeInput);

    if (!input || isNaN(reminderTime.getTime())) {
        alert("Por favor, insira um lembrete válido e horário futuro.");
        return;
    }

    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (!userSession || !userSession.email) {
        alert("Você precisa estar logado para adicionar lembretes.");
        return;
    }

    const userEmail = userSession.email;
    const allReminders = JSON.parse(localStorage.getItem("userReminders")) || {};
    if (!allReminders[userEmail]) {
        allReminders[userEmail] = [];
    }

    allReminders[userEmail].push({ text: input, time: reminderTime });
    localStorage.setItem("userReminders", JSON.stringify(allReminders));

    alert("Lembrete adicionado com sucesso!");
    loadReminders();
}

function deleteReminder(userEmail, reminder) {
    const allReminders = JSON.parse(localStorage.getItem("userReminders")) || {};
    allReminders[userEmail] = allReminders[userEmail].filter(r => r.text !== reminder.text || r.time !== reminder.time);
    localStorage.setItem("userReminders", JSON.stringify(allReminders));

    loadReminders();
}
