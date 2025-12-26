function createExpense({ title, amount }) {
  if (!title) {
    throw new Error("Expense title is required!");
  }

  if (typeof amount !== "number" || Number.isNaN(amount)) {
    throw new Error("Expense amount must be a valid number!");
  }

  return {
    id: crypto.randomUUID(),
    title,
    amount,
    createdAt: Date.now(),
  };
}

module.exports = { createExpense };
