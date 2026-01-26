export function log(level, message, meta = {}) {
  console[level === "ERROR" ? "error" : "log"]({
    time: new Date().toISOString(),
    level,
    message,
    ...meta,
  });
}
