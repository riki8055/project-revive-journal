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
