import { addNote } from "../state/notes.state";
import { renderNotes } from "../ui/notes.ui";

const form = document.getElementById("note-form");

function initEvents() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    addNote({
      id: Date.now(),
      title,
      content,
    });

    renderNotes();
    form.reset();
  });
}

export { initEvents };
