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

async function saveExpenses(expenses) {
  const data = JSON.stringify(expenses, null, 2);
  await fs.writeFile(DATA_FILE, data);
}

module.exports = {
  loadExpenses,
  saveExpenses,
};
