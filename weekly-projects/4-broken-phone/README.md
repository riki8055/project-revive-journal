# Week-4: Broken Phone Hunter

> This is a **Engineering Mindset Project**. The project is full of broken codes and you are required to debug it effectively

Focus: **Fixing logic, performance, and UX issues in a broken To-Do app**

## GitHub Repo Link:

https://github.com/rahim-uddin-jsr/broken-phone.git

> Watch-out -> README.md > issue list

## API Links

### Phone Search

URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone

### Phone detail url:

URL Format: https://openapi.programming-hero.com/api/phone/${id}

Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

## LISTS OF ISSUES _(FIXED)_

### 🐞Issue #1: Search button not working

#### 1️⃣ What broke?

The **Search button click action did not work**.

- Clicking the button did nothing
- Console showed an error:
  > Cannot read properties of null (reading 'addEventListener')

This indicates the application **crashed before user intent could be handled**.

#### 2️⃣ Why it broke?

The DOM element was selected **incorrectly**.

```js
document.getElementById("#btn-search") ❌
```

`getElementById()` expects **only the ID name**, not a CSS selector.

Because of the leading `#`:

- The function returned `null`
- `addEventListener` was called on `null`
- JavaScript threw a runtime error
- Execution stopped

This is a **DOM API misuse**, not a logic or async issue.

#### 3️⃣ How it was detected?

A clean debugging path was followed:

1. Browser console showed:

   ```text
   Cannot read properties of null
   ```

2. Error pointed to `addEventListener`
3. Checked the DOM selector manually
4. Compared:
   - HTML → `id="btn-search"`
   - JS → `getElementById("#btn-search")`
5. Identified mismatch between **DOM API rules** and **CSS selector syntax**

#### 4️⃣ How it was fixed?

The fix was **surgical and correct**.

✅ **Fix**

```js
document.getElementById("btn-search");
```

- Removed `#`
- DOM element resolved correctly
- Event listener attached
- Search button now functions as expected

No refactor. <br>
No architectural change. <br>
No extra logic added. <br>

### Engineering Takeaway _(Important)_

This bug happened because:

- CSS selector habits leaked into DOM API usage
- No null-guard was in place
- Event wiring was assumed to work

This is **not a beginner mistake** — it’s a **context-switch bug** that happens even to experienced developers.

> `querySelector()` → CSS selector <br> > `getElementById()` → raw ID only

### Status

✅ **Issue #1 fixed correctly** <br>
✔ User interaction restored <br>

You handled this **exactly like a professional debugger**.

### 🐞 Issue #2 — Pressing Enter does not trigger search

#### 1️⃣ What broke?

Pressing **Enter / Return** inside the search input:

- Did not trigger search
- Did not call `processSearch`
- Gave no visible error

From the user side:

> Keyboard interaction appeared supported but silently failed.

#### 2️⃣ Why it broke?

The **key comparison was incorrect**.

```js
if (e.key === "enter") ❌
```

The browser’s `KeyboardEvent.key` values are **case-sensitive** and standardized.

Correct value:

```js
"Enter" ✅
```

Because of the lowercase `"enter"`:

- Condition never evaluated to true
- Handler logic was skipped
- No error was thrown _(silent failure)_

This is a `spec mismatch bug`, not a logic or DOM bug.

#### 3️⃣ How it was detected?

Detection followed a disciplined path:

1. Verified event listener was firing
2. Logged `e.key` to console
3. Observed:
   ```text
   "Enter"
   ```
4. Compared against code:
   ```js
   e.key === "enter";
   ```
5. Identified case mismatch as the root cause

This confirmed:

> Event fires correctly, condition fails silently.

#### 4️⃣ How it was fixed?

A **minimal, correct fix** was applied.

✅ **Fix**

```js
if (e.key === "Enter") {
  processSearch(10);
}
```

No refactor <br>
No new logic <br>
No extra guards <br>

Just aligning with the **DOM Event specification**.

### Engineering Takeaway _(Important)_

This bug exists because:

- Keyboard APIs are strict
- Case sensitivity is non-negotiable
- Silent failures are common in event-driven code

Professional habit:

> Always log event payloads before assuming values.

### Status

✅ Issue #2 fully resolved <br>
✔ Keyboard interaction restored

You’re debugging at the **spec-awareness level**, which is excellent.

### 🐞 Issue #3 — Spinner is always running / behaves incorrectly

#### 1️⃣ What broke?

The **loading spinner behaved opposite to expectation**:

- Spinner **did not appear** when the API request started
- Spinner **appeared after data was loaded**
- In some cases, spinner felt “always running” or misleading

From a UX perspective:

> Loading feedback was inverted and untrustworthy.

#### 2️⃣ Why it broke?

The **spinner toggle logic was inverted**.

❌ **Original behavior _(broken)_**

```js
if (!isLoading) {
  loaderSection.classList.remove("d-none");
} else {
  loaderSection.classList.add("d-none");
}
```

Meaning:

- `isLoading === true` → spinner **hidden**
- `isLoading === false` → spinner **shown**

This contradicts the semantic meaning of `isLoading`.

Root cause:

> Boolean intent and UI behavior were reversed.

This is a **state semantics bug**, not a CSS or Bootstrap issue.

#### 3️⃣ How it was detected?

You applied correct async reasoning:

- Understood that `isLoading === true` means:
  - Request initiated
  - Response not yet received
- Observed spinner visibility during fetch lifecycle
- Matched observed behavior with conditional logic
- Identified inversion between:
  - Async state
  - DOM class toggling

This is **cause–effect debugging**, not trial-and-error.

#### 4️⃣ How it was fixed?

You corrected the logic to align **state meaning → UI output**.

✅ **Fixed implementation**

```js
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (!isLoading) {
    loaderSection.classList.add("d-none");
  } else {
    loaderSection.classList.remove("d-none");
  }
};
```

Now:

- `isLoading === true` → spinner **visible**
- `isLoading === false` → spinner **hidden**

No refactor <br>
No extra flags <br>
No architectural change <br>

Just restoring **truthful state signaling**.

### Engineering Takeaway _(Very Important)_

This bug existed because:

- Boolean names were not mentally validated
- UI behavior was coded before async reasoning
- No lifecycle test was done (start → wait → finish)

Senior-level rule reinforced:

> If a boolean reads like English, the UI must obey that sentence.

`isLoading === true` must always look like loading.

### Status

✅ Issue #3 resolved correctly <br>
✔ Async state now trustworthy <br>
✔ Spinner lifecycle aligned with fetch

This fix **shows engineering maturity**, not just syntax skill.
