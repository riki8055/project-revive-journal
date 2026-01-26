import { createNote } from "../api/notes.api.js";
import { addNote } from "../state/notes.state.js";
import { renderNotes } from "../ui/notes.ui.js";

const form = document.getElementById("note-form");

function initEvents() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    try {
      const createdNote = await createNote({ title, content });

      addNote(createdNote);
      renderNotes();
      form.reset();
    } catch (error) {
      alert("Failed to save note");
      console.error(error);
    }
  });
}

export { initEvents };
