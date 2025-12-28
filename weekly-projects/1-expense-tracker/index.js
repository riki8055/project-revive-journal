const { createExpenseStore } = require("./utils/store");
const { loadExpenses, saveExpenses } = require("./utils/storage");
const { createExpense } = require("./utils/expense");

/* -------------------- Utilities -------------------- */

function cleanupAndExit(code = 0) {
  // Future-safe cleanup hook
  // (nothing async needed right now)

  if (code !== 0) {
    console.log("\n❌ Exiting due to interruption.");
  }

  process.exit(code);
}

// Error Helper
function handleError(err) {
  // Known / expected errors
  if (err instanceof Error) {
    console.error("❌", err.message);
  } else {
    // Truly unknown (should rarely happen)
    console.error("❌ Unknown error:", err);
  }

  cleanupAndExit(1);
}

// Validation Helper Fn
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Formatter Helper Fn
function formatExpense(expense) {
  const date = new Date(expense.createdAt).toLocaleDateString();

  return `[${expense.id}] ${expense.title} - ₹${expense.amount} (${date})`;
}

/* -------------------- Signal Handling -------------------- */

process.on("SIGINT", () => {
  console.log("\n🛑 Interrupted (Ctrl + C)");
  cleanupAndExit(130); // 130 = standard Ctrl+C exit code
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Termination signal received");
  cleanupAndExit(143); // 128 + 15 (SIGTERM)
});

/* -------------------- Main Program -------------------- */

async function main() {
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

  // Load persisted data
  const initialExpenses = await loadExpenses();
  const store = createExpenseStore(initialExpenses);

  const commands = {
    add: async (args) => {
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
      await saveExpenses(store.getAll());

      console.log("✅ Expense added: ", expense);
    },
    list: (args) => {
      assert(args.length === 0, "❌ List command does not take any arguments");

      const expenses = store.getAll();
      if (expenses.length === 0) {
        console.log("No expenses found.");
        return;
      }

      let total = 0;

      expenses.forEach((expense) => {
        console.log(formatExpense(expense));

        total += expense.amount;
      });

      console.log("-----------------------");
      console.log(`Total: ₹${total}`);
    },
    delete: async (args) => {
      const [id] = args;
      assert(id, "❌ Expense ID is required");

      const removed = store.removeById(id);
      assert(removed, `❌ No expense found with id ${id}`);

      await saveExpenses(store.getAll());

      console.log("Expense deleted: ", id);
    },
  };

  const action = commands[command];
  if (!action) {
    console.error(`❌ Unknown command: ${command}`);
    process.exit(1);
  }

  try {
    await action(commandArgs); // Command dispatch via object lookup
  } catch (error) {
    handleError(error);
  }
}

/* -------------------- Entry Point -------------------- */

main().catch(handleError);
