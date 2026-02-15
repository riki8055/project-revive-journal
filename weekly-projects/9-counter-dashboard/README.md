# Counter Dashboard

## 🧠 Day 1 – JSX → JavaScript _(No Magic Allowed)_

### 🎯 Objective

Understand exactly what JSX becomes and how rendering actually works.

### STEP 1 — Write a Simple Counter _(Using JSX)_

> commit hash **3d37bd5**

Create this component:

```jsx
import React, { useState } from "react";

function Counter() {
  console.log("Counter function executed");

  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

#### What to Observe

Open DevTools console.

Every click:

- The function runs again.
- Console logs again.
- A NEW UI description is created.

React does NOT update partially. <br>
It re-executes the entire function.

### STEP 2 — Rewrite WITHOUT JSX

> commit hash **78c285d**

Now remove JSX entirely.

Rewrite the same component:

```js
import React, { useState } from "react";

function Counter() {
  console.log("Counter function executed");

  const [count, setCount] = useState(0);

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Count: ", count),
    React.createElement(
      "button",
      {
        onClick: () => setCount(count + 1),
      },
      "Increment",
    ),
  );
}

export default Counter;
```

It behaves IDENTICALLY.

Because JSX becomes this.

### STEP 3 — What `React.createElement` Actually Produces

Temporarily log an element:

```js
const element = React.createElement("h1", null, "Hello");
console.log(element);
```

You’ll see something like:

```js
{
  type: "h1",
  key: null,
  ref: null,
  props: {
    children: "Hello"
  }
}
```

This is a React Element.

It is:

- NOT the DOM
- NOT HTML
- NOT rendered yet

It is just a plain JavaScript object.

### STEP 4 — The Virtual DOM Mental Model

When Counter runs:

1. It returns a tree of element objects.
2. React compares this new tree with the previous tree.
3. It calculates differences.
4. It updates the real DOM minimally.

Important:

React does NOT update DOM directly from your JSX. <br>
It updates from comparing element objects.

That comparison process is reconciliation.

### STEP 5 — Why Re-renders Happen

Re-render happens when:

- State changes
- Parent re-renders
- Context changes
- Props change

But technically what happens?

> React simply calls your component function again.

That’s it.

No magic.

Rendering = function execution.

### STEP 6 — Key Mental Upgrade

Your component:

```jsx
function Counter() { ... }
```

Is not a class.
Not a template.

It is just:

```js
UI = Function(state);
```

Every state change → function runs → new UI description created.

### 🎯 Deliverable for Today

You must:

1. Build the Counter using JSX.
2. Rewrite it using `React.createElement`.
3. Add `console.log` inside component.
4. Observe:
   - Function runs on every click.
   - Entire function re-executes.
   - JSX and non-JSX behave the same.

### 🔥 Before We Move On

Answer this clearly:

When `setCount` runs, does React:<br>
A) Modify the existing element object<br>
or<br>
B) Call the component again and create a new element tree?

Think like a systems engineer now.

## 📅 Day 2 – State & Re-render Reality

### 🎯 Objective

Understand:

- `useState` triggers re-render
- Parent re-render → all children re-render
- React does NOT “skip smartly” by default

We’ll intentionally create a performance problem.

### 🧱 Step 1 — Build 10 Counters Inside One Parent

> commit hash **78f5e62**

Put all state in the parent.

```jsx
// Dashboard.jsx

import { useState } from "react";
import Counter from "./Counter";

export default function Dashboard() {
  console.log("Dashboard rendered");

  const [counters, setCounters] = useState(Array(10).fill(0));

  const increment = (index) => {
    const updated = [...counters];
    updated[index] += 1;
    setCounters(updated);
  };

  return (
    <div>
      <h1>Counter Dashboard</h1>
      {counters.map((count, i) => (
        <Counter
          key={i}
          index={i}
          value={count}
          onIncrement={() => increment(i)}
        />
      ))}
    </div>
  );
}
```

### 🔍 Step 2 — Observe Console Logs

Open DevTools → Console.

Now click **only Counter 3**.

What happens?

You will see:

```yaml
Dashboard rendered
Counter rendered: 0
Counter rendered: 1
Counter rendered: 2
Counter rendered: 3
Counter rendered: 4
...
Counter rendered: 9
```

ALL counters re-render.

Even though you changed only one.

### 🧠 Why This Happens

Because:

1. `setCounters()` updates parent state.
2. Parent re-renders.
3. Parent function runs again.
4. It recreates all `<Counter />` elements.
5. React calls all Counter functions again.

React does NOT automatically say:

> “Only counter 3 changed.”

By default, it just re-runs everything under that parent.

### ⚠️ Important Detail

Even though only one counter changed visually:

- All 10 Counter functions executed.
- 10 new element objects were created.
- 10 sets of props were recreated.

React still optimizes DOM updates —
but function execution already happened.

That’s the performance cost.

### 💣 The Hidden Problem

This line is especially dangerous:

```jsx
onIncrement={() => increment(i)}
```

Every render:

- A new function is created
- New reference
- React sees prop changed
- Child re-renders

We’ll attack this later.

### 🧠 Mental Model Upgrade

Rendering cost = Function execution cost<br>
Not just DOM updates.

DOM may update minimally,<br>
but JavaScript work still happens fully.

That’s why large trees get slow.

### 🔥 Your Task Now

1. Build this exactly.
2. Add logs.
3. Click one counter.
4. Confirm:

- Dashboard re-renders.
- All 10 counters re-render.

Now think:

If we had 1,000 counters…
