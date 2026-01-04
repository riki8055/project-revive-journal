# Vanilla JS Form System

## Step 1: Base HTML Form _(Browser-Native)_

### Objectives

- Works **without JavaScript**
- Uses **browser validation**
- Produces a **real HTTP request**
- Can be debugged in **Network tab**

If this step is solid, everything else becomes _enhancement_, not repair.

### 1️⃣ Choose a Simple, Realistic Use-Case

We’ll use a **User Registration Form**

_(Enough complexity to learn, not enough to distract)_

**Fields**

- Full Name
- Email
- Password
- Confirm Password
- Submit

### 2️⃣ The HTML _(Read Carefully)_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Vanilla JS Form System</title>
  </head>
  <body>
    <h1>User Registration</h1>

    <form method="POST" action="/register">
      <div>
        <label for="name">Full Name</label>
        <input id="name" name="name" type="text" required minlength="3" />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div>
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minlength="6"
        />
      </div>

      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
        />
      </div>

      <button type="submit">Register</button>
    </form>
  </body>
</html>
```

### 3️⃣ Why Every Line Matters _(No Fluff)_

✅ `method="POST"`

- Sends data in request body
- Correct semantic choice for registration

✅ `action="/register"`

- Browser will navigate here
- Network request will be visible
- Can be mocked later

✅ `name` attributes

> Without name, data is never sent

This is the #1 silent bug in forms.

✅ Native Validation Attributes

- `required`
- `type="email"`
- `minlength`

These:

- Run **before HTTP**
- Block submission automatically
- Require **zero JS**

✅ `<label for="">`

- Accessibility
- Click-to-focus
- Screen reader support
- Keyboard navigation

This is **not optional** in serious systems.

Open this file in a browser and try:

### Case 1: Click submit with empty fields

- Browser blocks submission
- Native error message appears
- ❌ No network request

### Case 2: Invalid email

- Browser shows format error
- ❌ Still no request

### Case 3: All valid values

- Browser sends POST request
- Page navigates
- Network tab shows request

This confirms:

> **Validation happens before HTTP**

### 5️⃣ Network Tab Check _(Do This)_

Open DevTools → Network:

- Filter: **Doc**
- Submit form
- Click request
- Inspect:
  - Method
  - Headers
  - Payload `(application/x-www-form-urlencoded)`

You are now seeing **real browser behavior**, not theory.

### 6️⃣ Core Truths Locked in by Step 1

- Forms are browser-native
- Validation blocks requests
- `name` controls serialization
- No JS is required for real submissions
- Browser already solves many problems

Everything else we add later is **progressive enhancement**.

## Step 2: Controlled DOM Access Layer

### Objectives

Create a **single, disciplined entry point** for:

- Reading DOM
- Writing DOM
- Avoiding repeated queries
- Preventing mutation chaos

This is **architecture**, not syntax.

### 1️⃣ The Problem We’re Solving

Typical beginner code looks like this:

```js
document.querySelector("#email").value;
document.querySelector("#email").classList.add("error");
document.querySelector("#email").focus();
```

Problems:

- Repeated DOM queries
- Hard to change selectors
- Performance cost
- Impossible to reason about mutations

We fix this **now**, before logic grows.

### 2️⃣ Create a DOM Access Module

Create a new file:

📁 `js/dom.js`

<img src="codesnaps/code1.png" width=400 />

Why this matters:

- One source of truth
- Read-only references
- No accidental re-querying

### 3️⃣ Rules of This Layer _(Non-Negotiable)_

These rules apply **throughout the project**:

- ❌ No `document.querySelector` outside this file
- ❌ No inline DOM queries in logic files
- ✅ DOM nodes are **cached once**
- ✅ DOM writes go through known references

This enforces **fewer mutations by design**.

### 4️⃣ Defensive Checks _(Browser Reality)_

DOM can fail silently.

Add guards:

```js
if (!dom.form) {
  throw new Error("Form element not found");
}
```

Fail fast > silent bugs.

### 5️⃣ Entry Script

Create:

📁 `js/main.js`

<img src="codesnaps/code2.png" width=400 />

Add to HTML:

```html
<script type="module" src="js/main.js"></script>
```

Why `type="module"`?

- Scoped variables
- Explicit imports
- Cleaner architecture
- Real-world standard

### 6️⃣ What to Observe Now

- Submit form
- Browser validation still works
- Console logs only when validation passes
- No behavior change yet

This confirms:

> JS layers on top of native behavior

### 7️⃣ Why This Step Is Subtly Powerful

You just:

- Separated **structure** from **behavior**
- Prepared for validation logic
- Reduced mutation surface
- Avoided spaghetti selectors
- Created framework-like discipline without a framework

React/Vue do this internally — you’re doing it **explicitly**.

### 8️⃣ Core Mental Models Locked In

1. DOM access should be centralized
2. Cache DOM nodes once
3. Reads and writes must be controlled
4. Structure first, behavior later
5. JS enhances — browser remains boss
