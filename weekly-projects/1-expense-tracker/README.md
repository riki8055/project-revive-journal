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

## Final `index.js` _(Bootstrap Complete)_

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

## Step 2: Command Parsing & Validation

By the end of this step:

```bash
node index.js add "Tea" 20
```

- ✅ Inputs are parsed correctly
- ✅ Invalid inputs fail early
- ✅ Errors are human-readable
- ❌ No expense is saved yet

### Define what each command expects

| Command  | Expected args    |
| -------- | ---------------- |
| `add`    | title _(string)_ |
| `list`   | none             |
| `delete` | id               |

### Create a small validation helper

> commit hash **03bea0b**

```js
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
```

**Why this exists:**

- Keeps validation readable
- Centralizes failure logic
- Uses **Error objects** (real JS, not strings)

### Parse & Validate `add` command

> commit hash **315a0a1**

Replace your `add` handler with this:

```js
add: (args) => {
  const [title, amount] = args;

  assert(title, "❌ Title is required");
  assert(amount, "❌ Amount is required");

  const parsedAmount = Number(amount);
  assert(!Number.isNaN(parsedAmount), "❌ Amount must be a number");

  console.log("Parsed ADD command:", {
    title,
    amount: parsedAmount,
  });
},
```

**What you just did (important)**

- Used **array destructuring**
- Checked for `undefined`
- Converted string → number
- Validated user intent
- Prevented bad state early

### Validate `list` command _(strict)_

> commit hash **102cdc0**

```js
list: (args) => {
  assert(
    args.length === 0,
    "❌ List command does not take any arguments"
  );

  console.log("Parsed LIST command");
},
```

**Why this matters:**

- Prevents misuse
- Makes CLI predictable

### Validate `delete` command

> commit hash **d8d2d11**

```js
delete: (args) => {
  const [id] = args;

  assert(id, "❌ Expense ID is required");

  console.log("Parsed DELETE command:", id);
},
```

### Wrap command execution in `try/catch`

> commit hash **03bea0b**

Replace:

```js
action(commandArgs);
```

With:

```js
try {
  action(commandArgs);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
```

**Why this is important**

- All validation errors are now centralized
- App does not crash
- Exit code signals failure correctly

## Final `index.js` _(after step 2)_

```js
// index.js

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

const commands = {
  add: (args) => {
    const [title, amount] = args;
    assert(title, "❌ Title is required!");
    assert(amount, "❌ Amount is required!");

    const parsedAmount = Number(amount);
    assert(!Number.isNaN(parsedAmount), "❌ Amount must be a number!");

    console.log("Parsed ADD command:", {
      title,
      amount: parsedAmount,
    });
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
  action(commandArgs);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
```

### Test Cases

```bash
> node index.js
> node index.js add
> node index.js add "Tea"
> node index.js add "Tea" abc
> node index.js add "Tea" 20
> node index.js list foo
> node index.js delete
> node index.js delete 123
```

If every failure is **clear and intentional**, you did it right.

**Concepts reinforced**

- Functions as values
- Objects as routers
- Error handling (throw, try/catch)
- undefined vs valid input
- Early failure (engineering mindset)
- Clean CLI UX

This is **real backend discipline**.
