const store = require("../store/notes.store");

function createNote({ title, content }) {
  const start = Date.now();

  const note = {
    id: `n_${Date.now()}`,
    title,
    content,
    createdAt: Date.now(),
  };

  const result = store.add(note);

  console.log(`[SERVICE] createNote executed in ${Date.now() - start}ms`);

  return result;
}

function getNotes() {
  return store.getAll();
}

module.exports = {
  createNote,
  getNotes,
};
