let notes = [];

function getNotes() {
  return notes;
}

function setNotes(newNotes) {
  notes = newNotes;
}

function addNote(note) {
  notes = [...notes, note];
}

export { getNotes, setNotes, addNote };
