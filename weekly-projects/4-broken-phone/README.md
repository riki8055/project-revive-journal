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

> commit hash **cc13f27**

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

> commit hash **208d401**

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

> commit hash **ef1280f**

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

### 🐞 Issue #4 — Only one phone displayed despite API returning many results

> commit hash **3900987**

#### 1️⃣ What broke?

When searching for `"iphone"` _(for example)_:

- API returned **multiple phones**
- UI displayed **only one phone**
- No console error
- Data was correct, rendering was not

From the user’s perspective:

> “I know there are many results, but I can see only one.”

#### 2️⃣ Why it broke?

The **rendering target was incorrect**.

❌ **Broken code**

```js
phonesContainer.innerHTML = `<some_code>`;
```

This line was placed **inside a loop**.

Effect:

- Each iteration **overwrote** the container’s contents
- Previous phone cards were destroyed
- Only the **last phone** survived the loop

This is a **destructive DOM mutation bug**.

#### 3️⃣ How it was detected?

You reasoned from **data correctness → UI mismatch**:

1. Verified API response length
2. Confirmed `phones.forEach` was iterating correctly
3. Observed that DOM only showed one element
4. Noticed `innerHTML` was applied to the **parent container**
5. Identified overwrite behavior inside the loop

This is **render-logic isolation**, not guesswork.

#### 4️⃣ How it was fixed?

You redirected rendering to the **child element**, not the container.

✅ **Fixed code**

```js
phoneDiv.innerHTML = `<some_code>`;
phonesContainer.appendChild(phoneDiv);
```

Now:

- Each phone renders into its **own div**
- Container is appended to, not overwritten
- All results appear correctly

No refactor <br>
No batching <br>
No extra state

Just **correct render ownership**.

### Engineering Takeaway _(Very Important)_

This bug exists because:

- `innerHTML` is destructive
- Loop context was ignored
- Render target was misunderstood

Key rule reinforced:

> Never mutate a parent container destructively inside a loop.

This is one of the **most common real-world UI bugs**.

### Status

✅ Issue #4 resolved <br>
✔ Data → UI mapping restored <br>
✔ Deterministic rendering achieved

This fix directly demonstrates **render discipline under messy architecture**.

Issue #5 is also included in this commit, where `phonesContainer.textContent = "";` was added to clear previous results and display new search results when hitting `Search`.

### 🐞 Issue #6 — Phone images are not showing

> commit hash **5963c29**

#### 1️⃣ What broke?

- Phone cards rendered correctly
- Text data (name, brand, etc.) was visible
- **Images did not appear**
- No runtime error was thrown

From the UI:

> Empty or broken image placeholders.

#### 2️⃣ Why it broke?

The code was accessing a **non-existent property** on the API response.

❌ **Broken assumption**

Inside a `forEach` loop:

```js
phones.forEach((phone) => {
  // code here
});
```

We're accessing:

```js
phone.images;
```

But the actual API response contains:

```js
phone.image;
```

Because:

- `images` key does not exist
- Accessing it returns `undefined`
- `<img src="undefined">` fails silently

This is a **data contract mismatch**, not a rendering or DOM issue.

#### 3️⃣ How it was detected?

You followed the **correct debugging workflow**:

1. Inspected API response in DevTools
2. Compared response structure with code usage
3. Noticed:

- No `images` key
- A valid `image` key with URL string

4. Confirmed `undefined` was being passed to `src`

This confirms:

> Rendering logic was correct, data mapping was not.

#### 4️⃣ How it was fixed?

You aligned the code with the **actual API schema**.

✅ **Fix**

```js
phone.image;
```

Replaced:

```js
phone.images ❌
```

Result:

- Valid image URLs passed to `<img>`
- All phone images rendered correctly

No fallback hacks <br>
No refactor <br>
No defensive overengineering

Just **correct schema usage**.

### Engineering Takeaway _(Very Important)_

This bug exists because:

- API schema was assumed, not verified
- No response logging was done initially
- Silent failures masked the issue

Professional rule reinforced:

> Always trust the API response, never your assumption.

### Status

✅ **Issue #6 resolved** <br>
✔ Data → UI mapping corrected <br>
✔ Silent failure eliminated <br>
✔ Week-4 rules respected

You’re doing proper **contract-level debugging**, which is a strong engineering signal.

### 🐞 Issue #7 — “Show All” button does not hide after all data is loaded

> commit hash **0e8ff75**

#### 1️⃣ What broke?

“Show All” button **remained visible** even when:

- All phones were already displayed
- There was nothing more to load
- UX became misleading and confusing

From the user’s perspective:

> “Why is ‘Show All’ still there when everything is already shown?”

#### 2️⃣ Why it broke?

An **invalid Bootstrap utility class** was used.

❌ **Broken code**

```js
showAll.classList.add("d-hidden");
```

Problem:

- `d-hidden` **does not exist** in Bootstrap
- Browser silently ignored it
- Button never actually hid

This is **not a JS logic bug**, but a **UI contract bug** between JavaScript and CSS.

#### 3️⃣ How it was detected?

You applied a correct verification chain:

- Verified logic branch (`else`) was executing
- Checked DOM element → class list updated
- Inspected applied class in DevTools
- Compared against Bootstrap documentation
- Confirmed:
  - `d-none` is valid
  - `d-hidden` is not

This proves:

> Logic was correct, **class semantics were wrong**.

#### 4️⃣ How it was fixed?

You replaced the invalid class with the correct Bootstrap utility.

✅ **Fix**

```js
showAll.classList.add("d-none");
```

Now:

- Button hides when all data is shown
- Appears only when more data exists
- UX state correctly mirrors data state

No refactor <br>
No extra conditionals <br>
No DOM restructuring

Just **correct semantic class usage**.

### Engineering Takeaway _(Important)_

This bug exists because:

- CSS class names were assumed
- UI behavior depended on a non-existent contract
- Silent failures masked the issue

Professional lesson:

> JS is only as correct as the CSS contract it relies on.

### Status

✅ **Issue #7 resolved** <br>
✔ Progressive disclosure restored <br>
✔ UX state aligned with data state

You’re now handling **logic × UI boundary bugs**, which is a crucial real-world skill.

### 🐞 Issues #8, #9, #10 — Phone details not visible / modal looks empty

> commit hash **56b5108**

_(Handled together because they block the same user flow)_

#### 1️⃣ What broke?

**Issue #8**

- Clicking **“Load phone details”** showed **nothing meaningful**
- API call happened, but UI looked empty

**Issue #9**

- Modal technically opened
- But **text was invisible**, giving the impression that nothing loaded

**Issue #10**

- **Storage information** did not appear in the modal

**Additionally:**

- Some detail API calls failed due to **incorrect URL formatting**

From the user’s perspective:

> “I clicked details, something opened, but I can’t see anything useful.”

#### 2️⃣ Why it broke?

🔹**URL issue**

- Detail API URL was incorrectly formed
- `www.` was prepended
- API expects URLs starting with:

  ```arduino
  https://openapi.programming-hero.com/...
  ```

- **Result:** request failure or inconsistent responses

🔹 **Issue #8 & #9 — CSS masking data**

Modal container had:

```html
class="text-white"
```

Modal background is also light

**Result:**

- Text rendered correctly
- But **color matched background**
- Looked like “no data loaded”

This is a **visual failure**, not a logic failure.

🔹 **Issue #10 — Wrong data access path**

- Code accessed:

  ```js
  phone.mainFeatures;
  ```

- Actual data structure:
  ```js
  phone.mainFeatures.storage;
  ```

Because of this:

- Storage value resolved to `undefined` or `[Object.object]`
- UI rendered empty content

This is a **nested data contract bug**.

#### 3️⃣ How it was detected?

ou followed a proper layered debugging approach:

1. Verified click handler fires
2. Checked Network tab → API responds
3. Logged API response object
4. Compared UI output vs actual data
5. Inspected modal DOM → text exists but invisible
6. Inspected `mainFeatures` structure in DevTools

This clearly showed:

> Data exists, but either **can’t be seen** or **is accessed incorrectly**.

#### 4️⃣ How it was fixed?

✅ **URL fix**

- Corrected API URL to use:
  ```text
  https://openapi.programming-hero.com/...
  ```
- Removed invalid `www.` prefix

✅ **Issue #8 & #9 fix _(Modal visibility)_**

- Removed:
  ```html
  text-white
  ```
- Restored proper contrast between text and background
- Modal content immediately became visible

✅ **Issue #10 fix _(Storage field)_**

- Corrected property access:
  ```js
  phone.mainFeatures.storage;
  ```
- Storage details now render correctly

No refactor <br>
No redesign <br>
No extra logic

Just **aligning code with reality**.

### Engineering Takeaway _(Very Important)_

These bugs existed because:

- UI visibility was mistaken for logic failure
- API schema was partially assumed
- CSS silently sabotaged correct data

Key professional lesson:

> If data exists but UI looks empty, always check CSS and data paths before logic.

Many engineers waste hours debugging JS for what is actually a **presentation-layer bug**.

Status

✅ **Issue #8 resolved — details load correctly** <br>
✅ **Issue #9 resolved — modal content visible** <br>
✅ **Issue #10 resolved — storage data displayed** <br>
✔ API contract corrected <br>
✔ UX trust restored

## 🔒 Week-4 Outcome

You:

- Did **not** rewrite the app
- Diagnosed bugs like a **maintenance engineer**

That’s exactly the goal of this project.
