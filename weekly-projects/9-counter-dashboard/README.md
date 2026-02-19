# Counter Dashboard

## 📅 Day 1 – JSX → JavaScript _(No Magic Allowed)_

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

## 📅 Day 3 – Props Drilling Pain

### 🎯 Objective

You will understand:

- How props drilling actually works
- Why passing functions causes re-renders
- Why deep trees become performance nightmares

We’re going to create this structure:

```mardown
Dashboard
  └── CounterList
        └── CounterCard
              └── CounterButton
```

State lives at the top.

The button is at the bottom.

And we manually pass everything through.

### 🧱 Step 1 — Build the Deep Tree

> commit hash **65e2f20**

#### 1️⃣ Dashboard _(Top Level State)_

```jsx
// Dashboard.jsx

import { useState } from "react";
import CounterList from "./CounterList";

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
      <CounterList counters={counters} increment={increment} />
    </div>
  );
}
```

#### 2️⃣ CounterList _(Mid-level state, executer)_

```jsx
// CounterList.jsx

import CounterCard from "./CounterCard";

export default function CounterList({ counters, increment }) {
  console.log("CounterList rendered");

  return (
    <>
      {counters.map((count, i) => (
        <CounterCard
          key={i}
          index={i}
          value={count}
          onIncrement={() => increment(i)}
        />
      ))}
    </>
  );
}
```

#### 3️⃣ CounterCard _(Mid-level state)_

```jsx
// CounterCard.jsx

import CounterButton from "./CounterButton";

export default function CounterCard({ value, onIncrement, index }) {
  console.log("CounterCard rendered:", index);

  return (
    <div style={{ margin: "10px", border: "1px solid gray", padding: "10px" }}>
      <h3>Counter {index}</h3>
      <p>Value: {value}</p>
      <CounterButton index={index} onIncrement={onIncrement} />
    </div>
  );
}
```

#### 4️⃣ CounterButton _(Bottom Level State)_

```jsx
// CounterButton.jsx

export default function CounterButton({ onIncrement, index }) {
  console.log("CounterButton rendered:", index);

  return <button onClick={onIncrement}>Increment</button>;
}
```

### 🔍 Step 2 — Click One Counter

Click only Counter 4.

Watch the logs.

You will see:

```yaml
Dashboard rendered
CounterList rendered
CounterCard rendered: 0
CounterButton rendered: 0
CounterCard rendered: 1
CounterButton rendered: 1
...
CounterCard rendered: 9
CounterButton rendered: 9
```

Everything re-renders.

Even components that did not visually change.

### 🧠 Why This Happens

Let’s break it:

#### 1️⃣ State changed in Dashboard

So Dashboard re-renders.

#### 2️⃣ CounterList re-renders

Because parent re-rendered.

#### 3️⃣ New inline function created here:

```jsx
onIncrement={() => increment(i)}
```

This creates a NEW function for every card.

Every render.

New reference → React sees prop changed → child re-renders.

#### 4️⃣ That new function gets passed down again

So CounterButton also re-renders.

### 💣 Where the Pain Is

The problem is not just performance.

It’s architecture pain.

Look at this:

Dashboard knows about increment logic.<br>
CounterButton needs increment.

But:

CounterList and CounterCard don’t care about increment.

Yet they must accept and pass it.

That’s **props drilling**.

They are just middlemen.

### 😵 Imagine This In Real App

Now imagine:

```mathematica
App
 └── Layout
      └── Sidebar
           └── Panel
                └── Widget
                     └── Button
```

And the Button needs:

- User info
- Theme
- Permissions
- Feature flags
- Action handlers

All must be manually passed down.

Every layer must know about them.

That becomes messy and fragile.

### 🔥 Performance Reality

Even if only 1 counter changed:

- All 10 CounterCard ran
- All 10 CounterButton ran
- 20 functions executed
- 20 new element trees created

Scaling issue.

### 🧠 Key Mental Upgrade Today

Rendering is contagious downward.

If parent re-renders,<br>
children re-render<br>
unless we explicitly prevent it.

React does not prevent it by default.

### 🎯 Deliverable Today

You must:

- Build the deep tree.
- Log render at every level.
- Click one counter.
- Confirm full tree re-render.
- Understand where new references are created.

Now think like a performance engineer:

What if we stop children from re-rendering<br>
when their props haven’t changed?

This is where `React.memo` comes into action.

But before that…

Answer this:

If we removed the inline arrow function and passed `increment` directly,<br>
would everything still re-render? _(answered in Day 4)_

## Day 4 – Why Everything Re-renders

### 🧠 First — What’s Causing Re-renders Right Now?

Currently you have:

```jsx
onIncrement={() => increment(i)}
```

Every render:

- A NEW function is created.
- New reference.
- Prop changes.
- Child re-renders.

That part is clear.

### 🔥 Now Let’s Remove the Inline Arrow

> commit hash **a9fda21**

Suppose we change `CounterList` like this:

```jsx
<CounterCard key={i} index={i} value={count} onIncrement={increment} />
```

And inside `CounterCard`:

```jsx
<CounterButton index={index} onIncrement={() => increment(index)} />
```

We moved the inline function down.

Will everything still re-render?

YES.

Why?

Because the parent (`Dashboard`) still re-renders.

### 🧠 Core Rule of React

When a component re-renders:

👉 All of its children re-render too<br>
unless they are memoized.

React does NOT check:

> “Are props same?”

It simply calls the child again.

So even if you pass:

```jsx
increment = { increment };
```

And the function reference didn’t change…

React will still execute:

```js
CounterList();
CounterCard();
CounterButton();
```

Because parent re-rendered.

No optimization by default.

### 🔬 Important Distinction

There are two separate concepts:

#### 1️⃣ Re-render because parent re-rendered

This always happens by default.

#### 2️⃣ Re-render because prop reference changed

This matters only when using `React.memo`.

Right now, we are NOT using memo.

So React doesn’t even check props.

It just re-runs the function.

### ⚙️ What Actually Happens Internally

When `setCounters` runs:

1. Dashboard runs again.
2. It returns new JSX.
3. React sees `<CounterList />`
4. React calls `CounterList()` again.
5. React sees `<CounterCard />`
6. React calls `CounterCard()` again.
7. And so on.

React is not doing prop comparison here.

It simply executes the tree.

### 🔥 The Inline Function Is Not the Root Cause _(Yet)_

It makes things worse,<br>
but even without it,<br>
everything still re-renders.

The inline function becomes a problem when we introduce:

```
React.memo
```

Because then prop reference comparison matters.

We haven’t introduced that weapon yet.

### 🧠 Mental Model Upgrade

Default React behavior:

```css
Parent re-render
→ All children re-render
→ All grandchildren re-render
```

Unless you explicitly block it.

React is simple, not magical.

### 🧨 So Why Does React Feel Efficient?

Because although functions re-run:

- React’s reconciliation avoids unnecessary DOM updates.
- DOM mutation is expensive.
- Function execution is cheaper _(but not free)_.

So small trees feel fast.

Large trees start choking.

### 🎯 Final Answer

If you remove inline arrow functions and pass increment directly:

✔ Parent re-renders<br>
✔ All children re-render<br>
✔ All functions execute again

Because React does not prevent child renders by default.

Now we’re ready for the real question:

If we wrap `CounterCard` with `React.memo`…

Will everything still re-render?

## 📅 Day 5 – `React.memo` & `useCallback`

### 🎯 Objective

We will:
- Stop unnecessary re-renders
- Understand referential equality
- Make **only the changed counter re-render**

### 🧠 Step 0 — Current Problem Recap

Right now:
- Clicking Counter 3
- Causes Dashboard to re-render
- Causes CounterList to re-render
- Causes all 10 CounterCard to re-render
- Causes all 10 CounterButton to re-render

Because:
- Parent re-renders
- Children re-run by default
- Inline functions create new references

We will now surgically fix this.

### 🛡 Step 1 — Add `React.memo` to `CounterCard`

> commit hash **54c6df9**

Modify:

```jsx
function CounterCard({ value, onIncrement, index }) {
  console.log("CounterCard rendered:", index);

  return (
    <div>
      <h3>Counter {index}</h3>
      <p>Value: {value}</p>
      <CounterButton
        index={index}
        onIncrement={onIncrement}
      />
    </div>
  );
}
```

Change to:

```jsx
const CounterCard = React.memo(function CounterCard({ value, onIncrement, index }) {
  console.log("CounterCard rendered:", index);

  return (
    <div>
      <h3>Counter {index}</h3>
      <p>Value: {value}</p>
      <CounterButton
        index={index}
        onIncrement={onIncrement}
      />
    </div>
  );
});
```

Now React will:
- Compare previous props vs new props
- If same _(by reference for objects/functions)_
- Skip re-render

### 🔥 Test It

Click Counter 3.

You will notice:

👉 It still re-renders ALL counters.

Why?

Because this prop is unstable:

```jsx
onIncrement={() => increment(i)}
```

That arrow function creates a new function every render.

New reference → memo fails.

### ⚙️ Step 2 — Stabilize `increment` With `useCallback`

> commit hash **a6e06f6**

Inside Dashboard:

Replace:

```jsx
const increment = (index) => {
  const updated = [...counters];
  updated[index] += 1;
  setCounters(updated);
};
```

With:

```jsx
const increment = React.useCallback((index) => {
  setCounters(prev => {
    const updated = [...prev];
    updated[index] += 1;
    return updated;
  });
}, []);
```

Important:

We used functional state update (`prev =>`). <br>
So we don't depend on `counters`. <br>
Dependency array is safe as `[]`.

Now `increment` has a stable reference.

### ⚙️ Step 3 — Remove Inline Arrow in CounterList

Change:

```jsx
onIncrement={() => increment(i)}
```

To:

```jsx
onIncrement={increment}
```

Then modify CounterCard:

```jsx
<CounterButton
  index={index}
  onIncrement={() => onIncrement(index)}
/>
```

Wait — that still creates a function.

So instead, move responsibility down.

### ✅ Clean Version _(Correct Architecture)_

#### Dashboard

```jsx
const increment = React.useCallback((index) => {
  setCounters(prev => {
    const updated = [...prev];
    updated[index] += 1;
    return updated;
  });
}, []);
```

#### CounterList

```jsx
<CounterCard
  key={i}
  index={i}
  value={count}
  increment={increment}
/>
```

#### CounterCard _(memoized)_

```jsx
const CounterCard = React.memo(function CounterCard({ value, increment, index }) {
  console.log("CounterCard rendered:", index);

  return (
    <div>
      <h3>Counter {index}</h3>
      <p>Value: {value}</p>
      <CounterButton
        index={index}
        increment={increment}
      />
    </div>
  );
});
```

#### CounterButton _(memoized too)_

> commit hash **ab81c26**

```jsx
const CounterButton = React.memo(function CounterButton({ increment, index }) {
  console.log("CounterButton rendered:", index);

  return (
    <button onClick={() => increment(index)}>
      Increment
    </button>
  );
});
```
Notice:
- `increment` reference is stable
- `value` changes only for one counter
- Other counters receive identical props
- Memo now works

### 🔬 Now Test Again

Click Counter 4.

You should see:

```yaml
Dashboard rendered
CounterCard rendered: 4
CounterButton rendered: 4
```

Only the changed one.

That’s the breakthrough moment.

### 🧠 Why This Works

`React.memo` performs shallow comparison:

For each prop:
- Primitives → compared by value
- Objects/functions → compared by reference

Now:
- `increment` is stable
- `index` is same
- `value` changes only for one

So only that card re-renders.

### ⚠️ Important Truth

Memoization is NOT free.

It adds comparison overhead.

Use it when:
- Component is heavy
- Tree is large
- Props are stable

Avoid when:
- Component is tiny
- Props always change
- Optimization not needed

### 🧨 The Big Mental Shift

Before:
> React randomly re-renders.

Now:
> React re-renders when references change.

That’s senior-level React thinking.

Now:

Confirm — does only one counter re-render on your side?
