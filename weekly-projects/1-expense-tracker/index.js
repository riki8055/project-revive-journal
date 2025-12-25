const args = process.argv.slice(2);

const command = args[0];
if (!command) {
  console.error("❌ No command provided!");
  process.exit(1);
}

const commandArgs = args.slice(1);

console.log("Command: ", command);
console.log("Args: ", commandArgs);
