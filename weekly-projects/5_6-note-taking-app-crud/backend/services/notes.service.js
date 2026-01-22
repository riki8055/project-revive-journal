const store = require("../store/notes.store");

function createNote({ title, content }) {
  const note = {
    id: `n_${Date.now()}`,
    title,
    content,
    createdAt: Date.now(),
  };

  return store.add(note);
}

function getNotes() {
  return store.getAll();
}

module.exports = {
  createNote,
  getNotes,
};
