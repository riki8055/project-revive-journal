const notes = [];

function getAll() {
  return notes;
}

function add(note) {
  notes.push(note);
  return note;
}

module.exports = {
  getAll,
  add,
};
