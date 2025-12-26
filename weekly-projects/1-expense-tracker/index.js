const { createExpenseStore } = require("./utils/store");
const { createExpense } = require("./utils/expense");

const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

if (!command) {
  /*
   * undefined command is real scenario
   * we are explicitly handling it
   */
  console.error("❌ No command provided!");
  process.exit(1);
}

// Validation Helper Fn
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const store = createExpenseStore();

const commands = {
  add: (args) => {
    const [title, amount] = args;
    assert(title, "❌ Title is required!");
    assert(amount, "❌ Amount is required!");

    const parsedAmount = Number(amount);
    assert(!Number.isNaN(parsedAmount), "❌ Amount must be a number!");

    const expense = createExpense({
      title,
      amount: parsedAmount,
    });

    store.add(expense);
    console.log("Expense added: ", expense);
  },
  list: (args) => {
    assert(args.length === 0, "❌ List command does not take any arguments");

    console.log("Parsed list command");
  },
  delete: (args) => {
    const [id] = args;
    assert(id, "❌ Expense ID is required");

    console.log("Parsed delete command: ", id);
  },
};

const action = commands[command];
if (!action) {
  console.error(`❌ Unknown command: ${command}`);
  process.exit(1);
}

try {
  action(commandArgs); // Command dispatch via object lookup
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
