# CLI Expense Tracker (Node.js)

## Step 1: App Bootstrap & CLI Entry Point

By the end of this step, you should be able to run:

```bash
node index.js add "Tea" 20
```

…and your program should clearly know:

- ✅ What command was entered _(add)_
- ✅ What arguments were passed _("Tea", 20)_
- ❌ No business logic yet
- ❌ No file system yet

This step is only about **bootstrapping**.

## Understand `process.argv` _(this is key)_

- In Node.js, `process.argv` is an array of command-line arguments:

```bash
[
  '/usr/bin/node',
  '/path/to/index.js',
  'add',
  'Tea',
  '20'
]
```

### Reality-first Understanding

| Index      | Meaning         |
| ---------- | --------------- |
| `argv[0]`  | Node executable |
| `argv[1]`  | Script path     |
| `argv[2+]` | User input      |

### Extract command & arguments

> commit hash **df3cb7d**

```js
const args = process.argv.slice(2);

const command = args[0];
const commandArgs = args.slice(1);

console.log("Command:", command);
console.log("Args:", commandArgs);
```

Run:

```bash
> node index.js add "Tea" 20
```

Output:

```bash
Command: add
Args: [ 'Tea', '20' ]
```

🎯 This is your CLI foundation

### Guard Against Missing Command _(Error Handling)_

> commit hash **1db60e7**

A CLI must fail **gracefully**

```js
if (!command) {
  console.error("❌ No command provided");
  process.exit(1);
}
```

Why this matters:

- `undefined` command is a real scenario
- We are explicitly handling it

### Command Routing _(object-based, not if-else hell)_

> commit hash **aa8cf19**

```js
const commands = {
  add: () => {
    console.log("Add expense command");
  },
  list: () => {
    console.log("List expenses command");
  },
  delete: () => {
    console.log("Delete expense command");
  },
};
```

Now wire it:

```js
const action = commands[command];

if (!action) {
  console.error(`❌ Unknown command: ${command}`);
  process.exit(1);
}

action(commandArgs);
```

### Final `index.js` _(Bootstrap Complete)_

```js
// index.js

const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

if (!command) {
  console.error("❌ No command provided");
  process.exit(1);
}

const commands = {
  add: (args) => {
    console.log("Add expense command", args);
  },
  list: () => {
    console.log("List expenses command");
  },
  delete: (args) => {
    console.log("Delete expense command", args);
  },
};

const action = commands[command];

if (!action) {
  console.error(`❌ Unknown command: ${command}`);
  process.exit(1);
}

action(commandArgs);
```

### Concepts JUST applied

Variables & identifiers

- ✅ Array literals & slicing
- ✅ Objects as maps
- ✅ Functions as values
- ✅ Arrow functions
- ✅ undefined checks
- ✅ Error handling via early exit
- ✅ No this confusion
- ✅ No premature abstractions

### Sanity Check _(run all of these)_

```bash
node index.js
node index.js foo
node index.js add "Tea" 20
node index.js list
```
