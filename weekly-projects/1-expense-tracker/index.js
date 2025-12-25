const args = process.argv.slice(2);

const command = args[0];
if (!command) {
  /*
   * undefined command is real scenario
   * we are explicitly handling it
   */
  console.error("❌ No command provided!");
  process.exit(1);
}

const commandArgs = args.slice(1);

console.log("Command: ", command);
console.log("Args: ", commandArgs);
