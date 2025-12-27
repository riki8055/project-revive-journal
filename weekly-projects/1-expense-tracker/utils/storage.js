const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../expenses.json");

async function loadExpenses() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid data format!");
    }

    return parsed;
  } catch (error) {
    // File not found → first run → no expenses
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}
