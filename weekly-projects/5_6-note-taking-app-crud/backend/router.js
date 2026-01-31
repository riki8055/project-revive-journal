const { log } = require("./logger");
const { createNote, getNotes } = require("./services/notes.service");
const { delay } = require("./utils/delay");

const SHOULD_CORRUPT = false;

function router(req, res) {
  const { method, url } = req;

  if (method === "GET" && url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (method === "GET" && url === "/notes") {
    (async () => {
      await delay(5000); // 5 seconds - intentional

      const notes = getNotes();

      if (SHOULD_CORRUPT) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("{ invalid json "); // deliberate corruption

        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(notes));
    })();

    return;
  }

  if (method === "POST" && url === "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let parsed;

      try {
        parsed = JSON.parse(body);
      } catch (error) {
        log("ERROR", "Invalid JSON received", {
          bodySnippet: body.slice(0, 50),
        });
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }

      try {
        const note = createNote(parsed);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(note));
      } catch (error) {
        res.writeHead(422, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message }));
      }
    });

    return;
  }

  // fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

module.exports = { router };
