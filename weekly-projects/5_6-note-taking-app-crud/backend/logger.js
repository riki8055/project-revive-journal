function log(level, message, meta = {}) {
  const entry = {
    time: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  console.log(JSON.stringify(entry));
}

module.exports = { log };
