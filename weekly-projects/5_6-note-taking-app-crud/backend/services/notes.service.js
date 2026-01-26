const { log } = require("../logger");
const store = require("../store/notes.store");

function createNote({ title, content }) {
  if (!title || !content) {
    log("WARN", "Validation failed: missing fields", {
      titlePresent: !!title,
      contentPresent: !!content,
    });
    throw new Error("Missing Fields");
  }

  if (typeof title !== "string" || typeof content !== "string") {
    log("WARN", "Validation failed: invalid types", {
      titleType: typeof title,
      contentType: typeof content,
    });
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

  log("INFO", "Note created", { id: note.id });

  return result;
}

function getNotes() {
  return store.getAll();
}

module.exports = {
  createNote,
  getNotes,
};
