import { initEvents } from "./events/notes.events.js";
import { renderNotes } from "./ui/notes.ui.js";
import { setNotes } from "./state/notes.state.js";
import { fetchNotes } from "./api/notes.api.js";

async function initApp() {
  try {
    const notes = await fetchNotes();

    setNotes(notes);
    renderNotes();
  } catch (error) {
    alert("Failed to load notes");
    console.error(error);
  }

  initEvents();
}

initApp();
