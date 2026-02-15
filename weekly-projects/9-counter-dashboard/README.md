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
