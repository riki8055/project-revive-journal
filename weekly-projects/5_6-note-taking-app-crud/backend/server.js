const http = require("http");
const { router } = require("./router");
const { log } = require("./logger");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const start = Date.now();

  // ✅ CORS HEADERS (GLOBAL)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  log("INFO", "Request received", {
    method: req.method,
    url: req.url,
  });

  res.on("finish", () => {
    log("INFO", "Request completed", {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
    });
  });

  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
