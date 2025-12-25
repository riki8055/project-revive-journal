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
  add: () => {
    console.log("Add expense command");
  },
  list: () => {
    console.log("List expense command");
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
