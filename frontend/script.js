// Load saved data
let tasks = JSON.parse(localStorage.getItem("studymateTasks")) || [];
let notes = JSON.parse(localStorage.getItem("studymateNotes")) || [];
let studyMinutes = Number(localStorage.getItem("studymateMinutes")) || 0;

// Save data
function saveData() {
    localStorage.setItem("studymateTasks", JSON.stringify(tasks));
    localStorage.setItem("studymateNotes", JSON.stringify(notes));
    localStorage.setItem("studymateMinutes", studyMinutes);
}

// Display tasks
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.replaceChildren();

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span");

        text.textContent = `${task.title} — Due: ${task.date} `;
        li.appendChild(text);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";
        removeButton.style.marginLeft = "10px";

        removeButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveData();
            displayTasks();
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
    });

    document.getElementById("taskCount").textContent = tasks.length;
}

// Add a task
document.getElementById("taskForm").addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const date = document.getElementById("taskDate").value;

    if (!title || !date) return;

    tasks.push({ title, date });
    saveData();
    displayTasks();
    event.target.reset();
});

// Display notes
function displayNotes() {
    const noteList = document.getElementById("noteList");
    noteList.replaceChildren();

    notes.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "note";

        const title = document.createElement("h3");
        title.textContent = note.title;

        const subject = document.createElement("p");
        subject.textContent = `Subject: ${note.subject}`;

        const content = document.createElement("p");
        content.textContent = note.content;
        content.style.whiteSpace = "pre-wrap";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";
        removeButton.style.marginTop = "10px";

        removeButton.addEventListener("click", () => {
            notes.splice(index, 1);
            saveData();
            displayNotes();
        });

        card.append(title, subject, content, removeButton);
        noteList.appendChild(card);
    });
}

// Add a note
document.getElementById("noteForm").addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const subject = document.getElementById("noteSubject").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    if (!title || !subject || !content) return;

    notes.push({ title, subject, content });
    saveData();
    displayNotes();
    event.target.reset();
});

// Study timer
let remainingSeconds = 25 * 60;
let timerInterval = null;
let sessionSeconds = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    document.getElementById("timerDisplay").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

document.getElementById("startTimer").addEventListener("click", () => {
    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        remainingSeconds--;
        sessionSeconds++;
        updateTimerDisplay();

        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            studyMinutes += Math.floor(sessionSeconds / 60);
            sessionSeconds = 0;
            saveData();

            document.getElementById("studyTime").textContent = studyMinutes;
            alert("Study session complete! Great work!");
        }
    }, 1000);
});

document.getElementById("resetTimer").addEventListener("click", () => {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    remainingSeconds = 25 * 60;
    sessionSeconds = 0;
    updateTimerDisplay();
});

// Initial display
displayTasks();
displayNotes();
updateTimerDisplay();
document.getElementById("studyTime").textContent = studyMinutes;
