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

### 2. Basic Controlled Input Example

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

### 3. What Happens Behind The Scenes

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

### 4. Today’s Exercise

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

### Expected UI

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

### Starter Code

> commit hash **d3e74af**

```jsx
// ControlledForm.jsx

import { useState } from "react";

export default function ControlledForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Signup Form</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <h3>Live Preview</h3>

      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
    </div>
  );
}
```

### 5. Important Rule _(Production React)_

A **controlled input must always have**:

```
value
onChange
```

Otherwise React throws warnings.

Example mistake:

```html
<input value="{name}" />
```

React will say:

> "Input is read-only because it has a value but no onChange."

### 6. Small Debug Trick _(Very Useful)_

Add render logging.

```js
console.log("render");
```

Type in the input.

You will see:

```
render
render
render
render
```

This proves **React re-renders on every keystroke**.

This observation becomes important on **Day 3 performance lesson**.

### Your Task _(Important)_

Create file:

```
ControlledForm.jsx
```

Must include:

✔ name<br>
✔ email<br>
✔ password<br>
✔ live preview

## Day 2 - Handling Multiple Inputs Cleanly

Yesterday you wrote **3 separate states + 3 handlers**.
That approach **does NOT scale in real apps**.

### 1. The Problem You Had Yesterday

You wrote something like:

```js
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

And:

```js
onChange={(e) => setName(e.target.value)}
```

👉 Problem:

- Too many states
- Too many handlers
- Not scalable _(imagine 20 fields)_

### 2. The Production Pattern

We use **ONE state object**:

```js
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
});
```

Now React state looks like:

```js
{
  name: "Ritik",
  email: "abc@gmail.com",
  password: "123456"
}
```

### 3. The Magic: One Dynamic Handler

```js
function handleChange(e) {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}
```

#### Why this works

```js
[name]: value
```

This is **computed property**:

If input has:

```html
name="email"
```

Then:

```js
form.email = value;
```

### 4. The Key Rule

Every input MUST have:

```js
name = "fieldName";
```

Because handler depends on it.

### 5. Full Clean Example

> commit hash **5b88331**

```js
// ControlledForm.jsx

import { useState } from "react";

export default function ControlledForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    city: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div>
      <h2>Smart Form</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />

      <h3>Preview</h3>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}
```

### 6. Why This Is Powerful _(Real Insight)_

This pattern enables:

- Dynamic forms _(generated from config)_
- Form libraries _(Formik, React Hook Form)_
- Backend-driven forms

👉 This is how **real SaaS dashboards handle forms**

### 7. Mini Challenge _(Do This)_

Upgrade your form:

Add:

- dropdown _(gender)_
- checkbox _(terms accepted)_

Hint:

```js
type="checkbox"
checked={form.terms}
```

### 8. Common Mistakes _(Very Important)_

❌ Missing `name`

```js
<input value={form.name} onChange={handleChange} />
```

👉 Will NOT work

❌ Overwriting state

```js
setForm({ [name]: value }); // WRONG
```

👉 You lose other fields

### 9. Debug Like a Pro

Add:

```jsx
console.log(form);
```

Type in inputs → watch object update live.

### Your Task

Create:

```bash
ControlledInput.jsx
```

Must include:<br>
✔ 5 inputs<br>
✔ single state object<br>
✔ one handler<br>
✔ live JSON preview

## Day 3 - Controlled Input Performance Pain

### 🎯 Goal

You must **feel** _(not just understand)_ why controlled inputs can be expensive.

### 1. What You Are Going To Prove

> “Every keystroke → full component re-render”

Not theory.<br>
You will **see it happening live**.

### 2. Create the Experiment

#### Step 1 — Build 50 Inputs

> commit hash **53cad7e**

```jsx
import { useState } from "react";

export default function HeavyForm() {
  const [form, setForm] = useState(
    Array.from({ length: 50 }, (_, i) => `field-${i}`)
      .reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {})
  );

  console.log("🔥 FULL FORM RE-RENDER");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div>
      <h2>Heavy Form (50 Inputs)</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          value={form[key]}
          onChange={handleChange}
          placeholder={key}
        />
      ))}
    </div>
  );
}
```

### 3. What You Must Do

- Open console
- Start typing in **ONE input only**

### 4. What You Will Observe

```bash
🔥 FULL FORM RE-RENDER
🔥 FULL FORM RE-RENDER
🔥 FULL FORM RE-RENDER
```

👉 Even though you typed in ONE input<br>
👉 ALL 50 inputs re-render

### 5. WHY This Happens _(Core Insight)_

React works like this:

```text
State changes
   ↓
Component function runs again
   ↓
Entire JSX recalculated
   ↓
All children re-render
```

So:

```text
Typing in 1 input
   ↓
setState()
   ↓
Whole component re-renders
   ↓
All 50 inputs re-render
```

👉 React does NOT update “just one input” by default<br>
👉 It re-runs the whole component

### 6. This Is NOT a Bug

This is how React is designed:

> React = Re-render everything → then diff → update DOM efficiently

But the **JS work still happens**.

### 7. Real World Impact

Imagine:
- 200 inputs
- complex validation
- API calls
- heavy components

👉 You get:

- lag
- typing delay
- poor UX

### 8. Add Deeper Debugging _(Important)_

> commit hash **808c941**

Modify input:

```jsx
<input
  key={key}
  name={key}
  value={form[key]}
  onChange={handleChange}
  placeholder={key}
/>
```

Wrap input in component:

```jsx
function InputField({ name, value, onChange }) {
  console.log("Rendering:", name);

  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={name}
    />
  );
}
```

Now use:

```jsx
<InputField
  key={key}
  name={key}
  value={form[key]}
  onChange={handleChange}
/>
```

### 9. What You Will See Now

Console:

```bash
Rendering: field-0
Rendering: field-1
Rendering: field-2
...
Rendering: field-49
```

👉 ALL inputs re-render<br>
👉 Even untouched ones

### 10. This Is The Pain

Now you’ve experienced:

> ❗ Controlled inputs don’t scale well by default

### 11. Your Deliverable

> commit hash **e94aa1c**

Create:

```bash
render-debug.md
```

Write:
1. What did you observe?
2. Why does React re-render everything?
3. What could go wrong in large apps?

### 12. Think Like an Engineer

Answer this:

> If React re-renders everything…
how do big apps stay fast?

### 13. What Comes Next _(Important)_

👉 **Uncontrolled Inputs + useRef**

This will show you:
- How to bypass React re-renders
- Why libraries like React Hook Form exist
- How real-world forms are optimized

⚠️ Important Mindset Shift

Today is not about fixing the problem.

It’s about **feeling the limitation deeply**.
