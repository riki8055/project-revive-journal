# Week 13-14: Advanced Patterns _(Dashboard App)_

## Day 1 - Controlled Inputs _(Single Source of Truth)_

### 1. The Core Idea

In **vanilla HTML**, the browser manages input values.

```html
<input type="text" />
```

The **DOM stores the value internally**.

But in **React controlled inputs**, the **state controls the input value**.

React becomes the **single source of truth**.

Flow:

```
User types
   ↓
onChange fires
   ↓
React state updates
   ↓
React re-renders
   ↓
Input value updates from state
```

So **the input always reflects React state**.

## 2. Basic Controlled Input Example

```jsx
import { useState } from "react";

export default function ControlledForm() {
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Controlled Input</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Name: {name}</p>
    </div>
  );
}
```

Important parts:

```
value={name}
```

React **controls the input value**.

```
onChange={(e) => setName(e.target.value)}
```

Updates React state.

## 3. What Happens Behind The Scenes

Every keystroke triggers:

```
keypress
   ↓
onChange
   ↓
setState
   ↓
React re-render
   ↓
input value updated
```

This is why controlled inputs can become **slow with many inputs** (you will feel this pain on **Day 3**).

## 4. Today’s Exercise

Build this form:

```
Name
Email
Password
```

Requirements:

- Controlled inputs
- `useState`
- live preview

## Expected UI

```
Form

[ Name input ]

[ Email input ]

[ Password input ]

Live Preview
Name: ...
Email: ...
Password: ...
```
