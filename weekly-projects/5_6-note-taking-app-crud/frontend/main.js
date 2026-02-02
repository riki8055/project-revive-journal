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
    if (error.message === "Corrupt server response") {
      alert("Server sent invalid data. Please try again later.");
    } else if (error.message === 'Server is unreachable') {
      alert('Service is temporarily unavailable. Please try again later.')
    } else {
      alert(error.message);
    }
  }

  initEvents();
}

initApp();
