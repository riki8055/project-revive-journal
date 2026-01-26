const BASE_URL = "http://localhost:3000";

async function fetchNotes() {
  const res = await fetch(`${BASE_URL}/notes`);

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

async function createNote({ title, content }) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create note");
  }

  return data;
}

export { fetchNotes, createNote };
