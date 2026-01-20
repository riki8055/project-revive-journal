function log({ method, url, status, duration }) {
  const time = new Date().toISOString();

  console.log(`[${time}] ${method} ${url} ${status} ${duration}ms`);
}

module.exports = { log };
