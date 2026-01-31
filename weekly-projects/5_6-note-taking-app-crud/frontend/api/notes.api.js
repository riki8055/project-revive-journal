import { log } from "../logger.js";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://cfkzk3-3001.csb.app"

async function fetchNotes() {
  log("INFO", "Fetching notes");

  const start = Date.now();
  const res = await fetch(`${BASE_URL}/notes`);

  log("INFO", "Fetch notes response", {
    status: res.status,
    duration: Date.now() - start,
  });

  if (!res.ok) {
    log("ERROR", "Fetch notes failed");
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
