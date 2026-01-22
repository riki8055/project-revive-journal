const { createNote, getNotes } = require("./services/notes.service");

function router(req, res) {
  const { method, url } = req;

  if (method === "GET" && url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (method === "GET" && url === "/notes") {
    const notes = getNotes();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
    return;
  }

  if (method === "POST" && url === "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsed = JSON.parse(body); // intentionally unsafe (for now)
      const note = createNote(parsed);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(note));
    });

    return;
  }

  // fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

module.exports = { router };
