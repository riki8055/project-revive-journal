import { fetchWithTimeout } from "./fetchWithTimeout.js";
import { log } from "../logger.js";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://cfkzk3-3001.csb.app";

async function safeJsonParse(response) {
  try {
    return await response.json();
  } catch (err) {
    log("ERROR", "Invalid JSON in response", {
      status: response.status,
    });
    throw new Error("Corrupt server response");
  }
}

async function fetchNotes() {
  log("INFO", "Fetching notes");

  const start = Date.now();

  let res;
  try {
    res = await fetchWithTimeout(
      `${BASE_URL}/notes`,
      {},
      10000, // 3 seconds timeout
    );
  } catch (err) {
    if (err.name === "AbortError") {
      log("ERROR", "Fetch notes timed out");
      throw new Error("Request timed out");
    }
    throw err;
  }

  log("INFO", "Fetch notes response", {
    status: res.status,
    duration: Date.now() - start,
  });

  if (!res.ok) {
    log("ERROR", "Fetch notes failed");
    throw new Error("Failed to fetch notes");
  }

  let data;
  try {
    data = await safeJsonParse(res);
  } catch(err) {
    throw err;  // already meaningful
  }

  return data;
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
