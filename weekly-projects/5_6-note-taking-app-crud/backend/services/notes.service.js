const store = require("../store/notes.store");

function createNote({ title, content }) {
  if (!title || !content) {
    throw new Error("Missing Fields");
  }

  if (typeof title !== "string" || typeof content !== "string") {
    throw new Error("Invalid field types");
  }

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
