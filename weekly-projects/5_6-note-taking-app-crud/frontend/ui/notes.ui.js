import { getNotes } from "../state/notes.state";

const listEl = document.getElementById("notes-list");

function renderNotes() {
  const notes = getNotes();

  listEl.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = `${note.title}: ${note.content}`;
    listEl.appendChild(li);
  });
}

export { renderNotes };
