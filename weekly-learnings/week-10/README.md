# Week-10 — State Management Pain

## 🧨 Day 1 — useState Misuse _(The Illusion of Simplicity)_

### 🎯 Objective

Understand that `useState` is:

- Not a normal variable
- Not immediately updated
- Not automatically synchronized
- Not scalable when abused

### 🧪 Step 1 — Build a "Broken Counter"

Create this component:

```jsx
// Counter.jsx

import { useState } from "react";

export default function BrokenCounter() {
  const [count, setCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  const [isEven, setIsEven] = useState(true);

  const handleIncrement = () => {
    setCount(count + 1);

    // Update related states separately
    setDoubleCount((count + 1) * 2);
    setIsEven((count + 1) % 2 === 0);

    console.log("Count right after set:", count);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {doubleCount}</h2>
      <h3>{isEven ? "Even" : "Odd"}</h3>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

### 🔥 What Just Happened?

Click the button.

Now answer:

1. Why does the console log show the **old count**?
2. Why are we calculating `doubleCount` manually?
3. Why are we storing `isEven` in state?
4. What happens if someone updates `count` somewhere else but forgets to update `doubleCount`?

You’ve just created **state inconsistency risk**.

### 💥 Now Break It Further

Modify the increment:

```jsx
const handleIncrement = () => {
  setCount(count + 1);
  setCount(count + 1);
};
```

Expected result?

You think it should increase by 2.

It won’t.

Why?

Because `count` inside the function is a snapshot from the render that created this function.

You’re not updating state.<br>
You’re scheduling updates.

### 🧠 Core Realization #1 — State Is Scheduled

React:

1. Collects updates
2. Batches them
3. Re-renders
4. Gives you new values

`setState` does NOT mutate immediately.

### 💥 Step 2 — Introduce Real Inconsistency

Now intentionally break synchronization.

Remove these lines:

```jsx
setDoubleCount((count + 1) * 2);
setIsEven((count + 1) % 2 === 0);
```

Now your UI shows:

- Count updates
- Double and Even stay frozen

This is what happens in large apps.

Multiple states.<br>
Forgotten updates.<br>
Inconsistent UI.

This is how production bugs are born.

### 🧠 Core Realization #2 — Derived State Is Dangerous

> commit hash **91dfb61**

Ask yourself:

Do we actually need:

```jsx
const [doubleCount, setDoubleCount] = useState(0);
const [isEven, setIsEven] = useState(true);
```

No.

They can be derived:

```jsx
const doubleCount = count * 2;
const isEven = count % 2 === 0;
```

If something can be calculated from state,<br>
**it should not be state**.

### 💣 Step 3 — The Functional Update Fix

> commit hash **5ba3176**

Now try this:

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

Now it increments by 2.

Why?

Because React gives you the latest value during update.

This avoids stale snapshots.

### 🧠 The Real Lesson of Today

`useState` is not:

- A variable
- A database
- A truth container

It is:

- A render trigger mechanism
- A snapshot provider
- A scheduling system

If you treat it casually,<br>
your app becomes fragile.

### 🧱 Clean Version _(What It Should Be)_

```jsx
// Counter.jsx

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const doubleCount = count * 2;
  const isEven = count % 2 === 0;

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {doubleCount}</h2>
      <h3>{isEven ? "Even" : "Odd"}</h3>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

Notice:

- One source of truth
- No synchronization risk
- No unnecessary state
- No manual coupling

### 🔎 End-of-Day Reflection

Answer these without Googling:

1. Why does logging state immediately after `setState` show old data?
2. Why did calling `setCount(count + 1)` twice only increment once?
3. Why is derived state dangerous?
4. What does “state is a snapshot” mean?

## Day 2 — Derived State Trap

Today we build a cart system the wrong way.

You will create a bug that feels small…
but scales into production nightmares.

### 🧨 Step 1 — Build It the Wrong Way

> commit hash **e6f2628**

Create this:

```jsx
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      price: 100
    };

    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);

    // Manually sync total
    setTotalPrice(totalPrice + newItem.price);
  };

  return (
    <div>
      <h2>Total: ₹{totalPrice}</h2>
      <button onClick={addItem}>Add Item (₹100)</button>
      <p>Items: {cartItems.length}</p>
    </div>
  );
}
```

### 🔎 Looks Fine… Right?

Click “Add Item” 3 times.

Total updates. Everything looks clean.

Now let’s break it.

### 💣 Step 2 — Introduce a Remove Feature

> commit hash

Add this:

```jsx
const removeItem = (id) => {
  const updatedCart = cartItems.filter(item => item.id !== id);
  setCartItems(updatedCart);

  // ❌ Intentionally forget to update totalPrice
};
```

Update UI

```jsx
{cartItems.map(item => (
  <div key={item.id}>
    ₹{item.price}
    <button onClick={() => removeItem(item.id)}>Remove</button>
  </div>
))}
```

### 🚨 Now Test It

1. Add 3 items → Total = 300
2. Remove 1 item

What happens?

Items count drops. Total remains 300.

Your UI is lying.

This is derived state damage.

### 🧠 What Just Happened?

You created:

- `cartItems` _(source of truth)_
- `totalPrice` _(mirror of truth)_

Now you must remember to sync:
- Add
- Remove
- Update quantity
- Apply discount
- Clear cart

Miss one.<br>
Bug.<br>
This scales horribly in real apps.

### 🔥 Step 3 — The Fake “Fix” Most Devs Use

> commit hash **ce55892**

They do this:

```jsx
useEffect(() => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  setTotalPrice(total);
}, [cartItems]);
```
Now you have:
- Extra re-render
- Effect dependency risk
- More moving parts
- More complexity

You’re solving a problem that shouldn't exist.

### 🧠 The Correct Architecture

> commit hash **8593750**

Delete this:

```js
const [totalPrice, setTotalPrice] = useState(0);
```

Replace with:

```js
const totalPrice = cartItems.reduce(
  (sum, item) => sum + item.price,
  0
);
```

That’s it.

Single source of truth.

Now:
- Add works
- Remove works
- Update works
- Clear works
- No sync logic
- No effects needed

### ⚡ Why This Is Superior

React re-renders when `cartItems` changes.

During render:

```
UI = f(cartItems)
```

Pure. Predictable. Consistent.

### 🧠 Engineering Principle You Just Learned

Never store:
- Totals
- Lengths
- Filters
- Formatted strings
- Boolean checks

If they can be computed from state.

Store minimal data. Derive everything else.

### 🎯 Your Task

Now extend this cart:

Add:
- Quantity per item
- Increment quantity button
- Decrement quantity button

But:

You are NOT allowed to create:

```
totalPrice state
itemCount state
```

Everything must be derived.

Build it. Break it. Then explain what changed in your mental model.

## Day 3 — useEffect Infinite Loops _(Controlled Chaos)_

Today you will intentionally crash your app.

Not because React is broken. Because your mental model is.

### 🧨 Step 1 — Create the Infinite Loop

> commit hash **74ee671**

Build this:

```jsx
import { useEffect, useState } from "react";

export default function InfiniteLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect running...");
    setCount(count + 1);
  });

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}
```

### 🔥 What Happens?

Your screen explodes. CPU spikes. Console floods.

Why?

Let’s break it logically.


### 🧠 The Loop Mechanism

1. Component renders.
2. useEffect runs.
3. `setCount` updates state.
4. State change triggers re-render.
5. Re-render triggers effect again.
6. Repeat forever.

No dependency array = run after every render.

And you're causing a render inside the effect.

Loop.

### 💥 Step 2 — “Fix” It _(Basic Fix)_

> commit hash **bfd94ec**

Now add:

```js
useEffect(() => {
  console.log("Effect running...");
  setCount(count + 1);
}, []);
```

What happens now?

It runs once.

Why?

Because empty dependency array = run only after first mount.

### ⚠️ But This Is Still Wrong

You are still using:

```js
setCount(count + 1);
```

Inside an effect with `[]`.

What is `count` here?

It’s 0. Forever.

Because the effect captured the initial render value.

You just created a stale closure without knowing.

### 🧨 Step 3 — Break It With Dependencies

Now do this:

```js
useEffect(() => {
  console.log("Effect running...");
  setCount(count + 1);
}, [count]);
```

What happens?


Infinite loop again.

Why?

Because:
- count changes
- effect runs
- effect changes count
- repeat

You told React:
> Whenever count changes, change count.

That’s logical recursion.

### 🧠 Core Lesson #1

Effects should not update a value they depend on unless you guard it.

### 💣 Step 4 — Break It With Objects

> commit hash **f761505**

Now try this:

```jsx
const obj = { value: 1 };

useEffect(() => {
  console.log("Effect running...");
}, [obj]);
```

No state updates.

Still runs every render.

Why?

Because:

```js
const obj = { value: 1 };
```

Creates a new object on every render.

Objects are compared by reference. New reference = dependency changed.

💣 Step 5 — Break It With Functions

> commit hash **16f3336**

```js
const logSomething = () => {
  console.log("Hello");
};

useEffect(() => {
  console.log("Effect running...");
}, [logSomething]);
```

Same problem.

Functions are recreated every render. New reference. Dependency changes. Effect runs again.

### 🧠 Core Lesson #2 — Stability Matters

React dependency array checks by reference.

Primitive values:
- number
- string
- boolean

These are stable if unchanged.

Objects & functions:
- New reference each render
- Unstable by default

### 🧠 Proper Mental Model of useEffect

useEffect is NOT:
- Lifecycle magic
- Auto sync system
- State manager

It is:
> A synchronization tool with external systems.

Examples:
- Fetching data
- Subscribing to events
- Timers
- DOM APIs

Not for:
- Derived state
- Simple calculations
- State mirroring

### 🔥 Controlled Correct Example

> commit hash **c21c3ba**

Proper increment-once example:

```jsx
useEffect(() => {
  setCount(prev => prev + 1);
}, []);
```

Or better — don’t even use effect if unnecessary.

### 🎯 Now Your Task

Build a component that:
1. Fetches fake data (use setTimeout instead of real API)
2. Stores it in state
3. Accidentally causes infinite loop
4. Fix it properly

Rules:
- You must break it first.
- You must explain why it broke.
- You must fix it without removing logic.