const http = require("http");
const { router } = require("./router");
const { log } = require("./logger");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    log({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
    });
  });

  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
