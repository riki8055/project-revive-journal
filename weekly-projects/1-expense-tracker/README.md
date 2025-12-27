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

## Step 3: Expense Data Model (Core Object)

**By the end of this step, you will have:**

- **A single source of truth** for what an expense is
- Validation at creation time
- No accidental malformed data
- Zero classes _(intentionally)_

### Decide the shape

An expense will look like this:

```js
{
  id: string,
  title: string,
  amount: number,
  createdAt: number
}
```

**Why each field exists:**

- `id` → unique identifier (for delete)
- `title` → what the expense is
- `amount` → numeric (not string)
- `createdAt` → timestamp (sortable, serializable)

### Create a factory function _(not a class)_

> commit hash **2c435bf**

Create a folder named `utils` and a new file inside it named `expense.js`

```js
// expense.js

function createExpense({ title, amount }) {
  if (!title) {
    throw new Error("Expense title is required");
  }

  if (typeof amount !== "number" || Number.isNaN(amount)) {
    throw new Error("Expense amount must be a valid number");
  }

  return {
    id: crypto.randomUUID(),
    title,
    amount,
    createdAt: Date.now(),
  };
}

module.exports = { createExpense };
```

**Important notes _(don’t skip)_**

- This is a pure function
- No side effects
- Validation happens once
- Object literal = data model
- Factory > class _(for now)_

### Wire it temporarily into `index.js` _(test only)_

```js
const { createExpense } = require("./expense");
```

### Inside the `add` command _(replace console.log)_:

```js
const expense = createExpense({
  title,
  amount: parsedAmount,
});

console.log("Created expense:", expense);
```

Now run:

```bash
> node index.js add "Tea" 20
```

Expected output:

```bash
Created expense: {
  id: 'b7a9...',
  title: 'Tea',
  amount: 20,
  createdAt: 169...
}
```

### What you just did _(important reflection)_

**You used:**

- Objects as data models
- Factory functions
- Error handling _(throw)_
- Validation at boundaries
- No `this`
- No mutation
- Predictable structure

**Because later:**

- Storage trusts this shape
- Listing relies on this shape
- Deletion relies on `id`
- Persistence relies on serializability

This is **how real systems prevent bugs**.

> If the model is clean → everything else is easy.

### Sanity checks

```bash
> node index.js add
> node index.js add Tea abc
> node index.js add "" 20
> node index.js add Tea 20
```

Only the last one should succeed.

> 💡 A data model is a contract, not a container.

## Step 4: In-Memory Store _(Closure-Based)_

By the end of this step, you will have:

- A private expense list _(not directly accessible)_
- Functions to:
  - add an expense
  - list expenses
  - delete an expense
- No accidental mutation from outside
- A clean API you can later plug into file storage

### Why we need a store at all

Right now:

- You can **create** an expense
- But you can’t **remember** it across commands

We need a place to **hold state**.

❌ Global array → bad
❌ Mutating random objects → bad

✅ Closure → correct

### Create the store module

Create a new file named `store.js` inside `utils` folder:
This file will **export a function**, not data.

### The Core Idea _(before code)_

> We create a function that owns an array.
> That array lives **only inside the function scope**.
> Returned functions can access it → closure.

That's it.

### Implement the store

> commit hash **315dd81**

```js
// store.js

function createExpenseStore() {
  const expenses = [];

  function add(expense) {
    expenses.push(expense);
  }

  function getAll() {
    return [...expenses]; // defensive copy
  }

  function removeById(id) {
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return false;
    }

    expenses.splice(index, 1);
    return true;
  }

  return {
    add,
    getAll,
    removeById,
  };
}

module.exports = { createExpenseStore };
```

#### What just happened?

**🔒 Private state**

```js
const expenses = [];
```

- Cannot be accessed from outside
- Only functions inside this scope can touch it

**🧠 Closure**

**Each returned function:**

- **closes over** `expenses`
- Keeps it alive in memory
- Shares the same array

**🛡 Defensive copy**

```js
return [...expenses];
```

Prevents:

```js
store.getAll().push(fakeExpense); // ❌
```

This is **real engineering discipline**.

### Wire the store into `index.js`

> commit hash **fb6db31**

At the top of `index.js`:

```js
const { createExpenseStore } = require("./store");
```

Create **one store instance**:

```js
const store = createExpenseStore();
```

> ⚠️ Important: This must be created once, not per command.

### Connect add command to the store

> commit hash **1ec3355**

Inside `add` command:

```js
const expense = createExpense({
  title,
  amount: parsedAmount,
});

store.add(expense);

console.log("Expense added:", expense);
```

### Connect `list` & `delete` command

> commit hash **df84441**

Replace `list` handler with:

```js
list: () => {
  const expenses = store.getAll();

  if (expenses.length === 0) {
    console.log("No expenses found.");
    return;
  }

  expenses.forEach((e) => {
    console.log(`- ${e.title}: ₹${e.amount}`);
  });
},
```

And for `delete`:

```js
delete: (args) => {
  const [id] = args;
  assert(id, "❌ Expense ID is required");

  const removed = store.removeById(id);

  assert(removed, `❌ No expense found with id ${id}`);

  console.log("Expense deleted:", id);
},
```

### Test the behavior (IMPORTANT)

Run in the **same process**:

```bash
> node index.js add "Tea" 20
> node index.js list
```

⚠️ You will notice something important:

> Expenses do NOT persist across runs

This is expected and correct.

**Why?**

- In-memory store lives only for the **lifetime of the process**
- File persistence comes later

This proves your **store logic is correct**.

### What concepts you just USED _(not learned — USED)_

- Closures (real, not toy examples)
- Encapsulation without classes
- Functions as APIs
- Objects as module boundaries
- Memory lifetime awareness
- Defensive copying
- Error handling discipline

This is **backend-grade JavaScript**.

### Mental anchor _(lock this in)_

> If a function lives long, everything it closes over lives long too.

You are now **using closures intentionally**, not accidentally.

## Step 5: Persistence Layer _(File System)_

By the end of this step:

- Expenses are saved to a file _(`expenses.json`)_
- Expenses are loaded when the app starts
- In-memory store + file system stay in sync
- All I/O is async
- Errors are handled cleanly

### Mental model _(important before code)_

We will follow this rule:

> The store owns the data. The persistence layer **only loads and saves it**.

### Decide persistence format

We will use:

- **JSON**
- One file
- Simple array

> If file doesn’t exist → start empty.

### Create persistence module inside `utils`, name it `storage.js` & Use Node's fs/promises

> commit hash **d48e3fc**

```js
// storage.js

const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "expenses.json");
```

Why:

- `fs/promises` → async / await
- `path.join` → OS-safe paths

### Implement `loadExpenses`

> commit hash **43e9629**

```js
async function loadExpenses() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid data format");
    }

    return parsed;
  } catch (err) {
    // File not found → first run → no expenses
    if (err.code === "ENOENT") {
      return [];
    }

    throw err;
  }
}
```

What this does _(mechanically)_

- Reads file
- Parses JSON
- Validates shape
- Handles “file not found” gracefully
- Fails loudly for real corruption

This is **professional behavior**.

### Implement `saveExpenses` + export `loadExpenses` & `saveExpenses` modules

> commit hash **3dc6419**

```js
async function saveExpenses(expenses) {
  const data = JSON.stringify(expenses, null, 2);
  await fs.writeFile(DATA_FILE, data);
}

// Export
module.exports = {
  loadExpenses,
  saveExpenses,
};
```

Notes:

- `null, 2` → readable JSON
- Atomic overwrite _(simple & fine for CLI)_

### Upgrade the store to accept initial data

> commit hash **837301c**

Modify `store.js`.

Before:

```js
function createExpenseStore() {
  const expenses = [];
```

After:

```js
function createExpenseStore(initialExpenses = []) {
  const expenses = [...initialExpenses];
```

This allows:

- Loading from file once
- Keeping store private

### Wire persistence into `index.js` + make command handlers & execution async

> commit hash **e1f8d30**

At the top:

```js
const { loadExpenses, saveExpenses } = require("./utils/storage");
```

Make your entry point **async**:

```js
async function main() {
  const initialExpenses = await loadExpenses();
  const store = createExpenseStore(initialExpenses);

  // commands defined here
}

main().catch((err) => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});
```

⚠️ Important:

- Store is created **after loading**
- One store per process

### Persist on every mutation

In `add` command:

```js
store.add(expense);
await saveExpenses(store.getAll());
```

In `delete` command:

```js
store.removeById(id);
await saveExpenses(store.getAll());
```

### Make command handlers & execution **async**

Update command map:

```js
const commands = {
  add: async (args) => { ... },
  list: async () => { ... },
  delete: async (args) => { ... },
};

// Execution
await action(commandArgs);
```

### Final working codebase after Step 5

`index.js`:

```js
const { createExpenseStore } = require("./utils/store");
const { loadExpenses, saveExpenses } = require("./utils/storage");
const { createExpense } = require("./utils/expense");

// Validation Helper Fn
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

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

      expenses.forEach((e) => {
        console.log(`- ${e.title}: ₹${e.amount}`);
      });
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
    console.error(error.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Fatal error: ", err.message);
  process.exit(1);
});
```

`utils/store.js`:

```js
function createExpenseStore(initialExpenses = []) {
  const expenses = [...initialExpenses];

  function add(expense) {
    expenses.push(expense);
  }

  function getAll() {
    return [...expenses]; // defensive copy
  }

  function removeById(id) {
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return false;
    }

    expenses.splice(index, 1);
    return true;
  }

  return {
    add,
    getAll,
    removeById,
  };
}

module.exports = { createExpenseStore };
```

`utils/storage.js`:

```js
const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "expenses.json");

async function loadExpenses() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid data format");
    }

    return parsed;
  } catch (err) {
    if (err.code === "ENOENT") {
      // First run, no file yet
      return [];
    }
    throw err;
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
```

### Test persistence _(MANDATORY)_

Run these **separately**:

```bash
> node index.js add "Tea" 20
> node index.js add "Coffee" 50
> node index.js list
```

_(optional)_ Then close terminal, reopen, run:

```bash
node index.js list
```

Observe:

✅ Expenses should still be there

✅ `expenses.json` should be readable

✅ No crashes

`expenses.json` — Auto-generated _(Example)_

```js
[
  {
    id: "e7a3c9c4-3b71-4a62-9d3c-8f9c4c0a9a12",
    title: "Tea",
    amount: 20,
    createdAt: 1734950000000,
  },
];
```

### What you just built _(this is big)_

You now have:

- Async file I/O
- Graceful first-run behavior
- Clean separation of concerns
- No global state
- No tight coupling
- Predictable failure modes

This is **real backend architecture**, not tutorial junk.

### Mental anchor _(lock this in)_

> Persistence should support your model, not control it.

You did exactly that.

## Step 6: List Expenses _(Formatted Output)_

When the user runs:

```bash
node index.js list
```

They should see:

- Clean, readable output
- Consistent formatting
- IDs visible (for delete/edit)
- Totals (very important for usefulness)
- No raw objects dumped

### Decide the output contract

We will print one expense per line, with:

```bash
[ID]  TITLE  — ₹AMOUNT  (DATE)
```

And at the end:

And at the end:

```bash
-----------------------
Total: ₹XXX
```

This is:

- Human-friendly
- CLI-appropriate
- Debuggable _(ID visible)_

### Create a formatter _(single responsibility)_

> commit hash **32d0924**

Add this helper inside `index.js` _(above `commands`)_:

```js
function formatExpense(expense) {
  const date = new Date(expense.createdAt).toLocaleDateString();

  return `[${expense.id}]  ${expense.title} — ₹${expense.amount}  (${date})`;
}
```

**Why a function?**

- Keeps list logic clean
- Easy to change formatting later
- Reusable (export later if needed)

### Update the `list` command

Replace your existing `list` handler with this:

```js
list: async () => {
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
```

### What this is doing _(mechanically)_

- Retrieves a **defensive copy** of expenses
- Formats each expense (no raw objects)
- Accumulates total safely
- Prints a summary

No mutation. No side effects.

### Example output _(realistic)_

```bash
[7c1f…]  Tea — ₹20  (12/26/2025)
[a91b…]  Coffee — ₹50  (12/26/2025)
-----------------------
Total: ₹70
```

This is now a **usable tool**, not a dev dump.

### Mental anchor _(important)_

> Raw data is for machines. Formatted data is for humans.

You just built the human layer.

**What concepts you reinforced here**

- Functions as formatters
- Template literals
- Separation of concerns
- Read-only iteration
- Intentional UX decisions

This is **engineering maturity**, not “extra polish”.
