# React Without Magic

## What exactly happens behind the scenes when `setCount` runs?

Assume this:

```jsx
const [count, setCount] = useState(0);
```

And you click:

```jsx
onClick={() => setCount(count + 1)}
```

### Step 1 — `setCount` Does NOT Immediately Change State

When you call:

```js
setCount(1);
```

React does NOT instantly change `count`.

Instead, it:

- Creates an **update object**
- Pushes it into an internal update queue
- Schedules a re-render

Think of it like:

```js
UpdateQueue.push({ newState: 1 });
```

React marks this component as “dirty”.

### Step 2 — React Schedules Work

React’s internal scheduler decides:

- When to process updates
- Whether to batch multiple updates
- What priority the update has

In modern React _(concurrent mode capable)_, updates are not always synchronous.

But eventually…

React decides:

> “Okay, time to re-render this component.”

### Step 3 — React Calls Your Component Function Again

This is the key.

React does:

```js
Counter();
```

Again.

From the top.

Fresh execution.

New `count` value is pulled from React’s internal hook state storage.

### Step 4 — New Element Tree Is Created

Your return statement runs again:

```jsx
return (
  <div>
    <h2>Count: {count}</h2>
    <button>Increment</button>
  </div>
);
```

This produces a NEW object tree:

```js
{
  type: "div",
  props: {
    children: [...]
  }
}
```

This is a completely new JavaScript object structure.

React does NOT mutate the old one.

### Step 5 — Reconciliation _(The Comparison Phase)_

Now React has:

- Old element tree
- New element tree

It compares them.

Example:

Old:

```php-template
<h2>Count: 0</h2>
```

New:

```php-template
<h2>Count: 1</h2>
```

React sees:

- Same type (h2)
- Same position
- Only text changed

So it updates only the text node in the real DOM.

This is why React feels efficient.

### Step 6 — Commit Phase

React applies the minimal DOM changes.

Browser updates the UI.

Done.

### 🧠 Important Realization

React does NOT:

- Modify existing JSX objects
- Mutate element trees
- Patch JavaScript objects

Instead, it:

1. Re-executes your component
2. Builds a new description
3. Diffs old vs new
4. Applies minimal DOM changes

### 🔥 Why This Matters for Performance

Because every render:

- New objects are created
- New functions are created
- New references are created

And React compares by reference.

This is where memoization becomes necessary later.

### ⚙️ Internal Hook Storage _(Advanced Insight)_

React keeps hook state in a linked list structure internally.

Something like:

```markdown
FiberNode
└── memoizedState
└── Hook1
└── Hook2
```

When component re-runs, React doesn’t recreate state.

It reads it from this internal structure.

That’s why `useState` must be called in the same order every render.

### 🔥 Final Answer _(System Level)_

When `setCount` runs:

1. React queues an update.
2. React schedules re-render.
3. React calls component function again.
4. A new element tree is created.
5. React compares old vs new.
6. Only necessary DOM changes are committed.

It never mutates the old element object.
