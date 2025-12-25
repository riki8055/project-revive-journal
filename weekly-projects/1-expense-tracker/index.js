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

const commands = {
  add: (args) => {
    const title = args[0];
    const amount = args[1];

    if (!title) {
      console.error("❌ Title is required!");
      return;
    }

    if (!amount) {
      console.error("❌ Amount is required!");
      return;
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      console.error("❌ Amount must be a number!");
      return;
    }

    console.log("Parsed ADD command:", {
      title,
      amount: parsedAmount,
    });
  },
  list: (args) => {
    if (!(args.length === 0)) {
      console.log("❌ List command does not take any arguments");
      return;
    }

    console.log("Parsed list command");
  },
  delete: () => {
    console.log("Delete expense command");
  },
};

const action = commands[command];
if (!action) {
  console.error(`❌ Unknown command: ${command}`);
  process.exit(1);
}

action(commandArgs);

// console.log("Command: ", command);
// console.log("Args: ", commandArgs);
