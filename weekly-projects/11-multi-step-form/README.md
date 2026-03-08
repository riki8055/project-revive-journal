# Week 11 - Complex Multi Step Form

## Day 1 – Architecture Before Code.

### 🎯 Goal Today

Build:

- 4-step form
- Shared global state
- Step navigation
- No validation yet
- No async yet

But with **correct mental model**.

### 🧠 Step 1 – Think Before Coding

You are building:

- Personal Info
- Education
- Experience
- Review & Submit

Now answer this mentally:

If the user goes:

Step 1 → Step 2 → Step 1

Should the data still be there?

Yes.

That means:

👉 Step components cannot own the data.<br>
👉 Data must live above them.

That’s your first architecture decision.

### 🏗️ State Design _(Single Source of Truth)_

We will use useReducer.

Why?

Because:

- Many fields
- Multiple transitions
- Predictable updates
- Scalable for future validation

### 📦 Shape of Global State

Do NOT overcomplicate.

```js
const initialState = {
  currentStep: 1,
  formData: {
    personal: {
      firstName: "",
      lastName: "",
      email: "",
    },
    education: {
      degree: "",
      university: "",
      year: "",
    },
    experience: {
      company: "",
      role: "",
      years: "",
    },
  },
};
```

Notice:<br>
✔ One object<br>
✔ All data centralized<br>
✔ currentStep inside state

No scattered booleans.

### 🧩 Reducer Design

Think in actions.

What actions exist today?

- UPDATE_FIELD
- NEXT_STEP
- PREV_STEP
- GO_TO_STEP

That’s it.

```js
function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.section]: {
            ...state.formData[action.section],
            [action.field]: action.value,
          },
        },
      };

    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case "PREV_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };

    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.step,
      };

    default:
      return state;
  }
}
```

Notice something important:

We are NOT duplicating state.
We are not keeping local copies inside steps.

Single source of truth.

### 🧱 App Structure

```
App
 ├── MultiStepForm
      ├── StepPersonal
      ├── StepEducation
      ├── StepExperience
      ├── StepReview
```

State lives in `MultiStepForm`.

### 🧠 MultiStepForm Component

```jsx
import { useReducer } from "react";

function MultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { currentStep, formData } = state;

  function renderStep() {
    switch (currentStep) {
      case 1:
        return <StepPersonal data={formData.personal} dispatch={dispatch} />;
      case 2:
        return <StepEducation data={formData.education} dispatch={dispatch} />;
      case 3:
        return (
          <StepExperience data={formData.experience} dispatch={dispatch} />
        );
      case 4:
        return <StepReview data={formData} />;
      default:
        return null;
    }
  }

  return (
    <div>
      {renderStep()}

      <div>
        {currentStep > 1 && (
          <button onClick={() => dispatch({ type: "PREV_STEP" })}>Back</button>
        )}

        {currentStep < 4 && (
          <button onClick={() => dispatch({ type: "NEXT_STEP" })}>Next</button>
        )}
      </div>
    </div>
  );
}
```

### 🧾 Example Step Component

```jsx
function StepPersonal({ data, dispatch }) {
  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      section: "personal",
      field: e.target.name,
      value: e.target.value,
    });
  }

  return (
    <div>
      <input
        name="firstName"
        value={data.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
        name="lastName"
        value={data.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <input
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
      />
    </div>
  );
}
```

Notice:<br>
✔ Controlled inputs<br>
✔ No local state<br>
✔ Everything flows from reducer<br>

### 🧾 Example Step (Review) Component

```jsx
function StepReview({ data }) {
  const { personal, education, experience } = data;

  return (
    <div>
      <h2>Review Your Application</h2>

      <section>
        <h3>Personal Information</h3>
        <p>First Name: {personal.firstName}</p>
        <p>Last Name: {personal.lastName}</p>
        <p>Email: {personal.email}</p>
      </section>

      <section>
        <h3>Education</h3>
        <p>Degree: {education.degree}</p>
        <p>University: {education.university}</p>
        <p>Year: {education.year}</p>
      </section>

      <section>
        <h3>Experience</h3>
        <p>Company: {experience.company}</p>
        <p>Role: {experience.role}</p>
        <p>Years: {experience.years}</p>
      </section>
    </div>
  );
}
```

### 🔥 Important Pain Points _(Feel This)_

#### 1️⃣ Where will validation live?

Inside step?<br>
Inside reducer?<br>
Separate validation engine?

We don’t solve it today.<br>
Just notice the architectural pressure.

#### 2️⃣ What if user edits Step 1 after Step 3?

Because everything is centralized:

✔ Review step automatically reflects changes<br>
✔ No syncing issues

If we had local state in steps?

💣 Data drift<br>
💣 Sync nightmares

#### 3️⃣ Controlled vs Uncontrolled

- We use controlled inputs because:
- We need autosave _(Day 3)_
- We need validation _(Day 2)_
- We need draft restore

Uncontrolled would break future architecture.

### 🧠 Today’s Mental Takeaway

This is NOT a form.

This is a:

> Small state management system.

And we designed it predictably.

### 🧪 Your Task Now

Implement this.

Then test:

- Fill Step 1
- Go to Step 2
- Come back
- Edit
- Jump steps

If it feels stable — Day 1 is complete.

## ⚠️ Day 2 – Validation Hell _(Sync + Async)_

Your form now has:

- Personal Info
- Education
- Experience
- Review

Today we add validation mainly to **Personal Info**:

1. Synchronous validation
2. Async validation _(fake API)_
3. Introduce a race condition
4. Fix the race condition properly

### 🧠 Step 1 — Add Error State

> commit hash **83926a1**

We must store validation errors somewhere.

Extend your reducer state.

```js
const initialState = {
  currentStep: 1,
  formData: {
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    education: {
      degree: "",
      university: "",
      year: "",
    },
    experience: {
      company: "",
      role: "",
      years: "",
    },
  },
  errors: {},
};
```

Example errors:

```
errors = {
  firstName: "Required",
  email: "Invalid email",
  password: "Weak password"
}
```

### 🧩 Reducer Action

Add:

```js
case "SET_ERRORS":
  return {
    ...state,
    errors: action.errors
  }
```

### 🧠 Step 2 — Synchronous Validation

> commit hash **b76119d**

Create a validator.

```js
// validatePersonal.js

function validatePersonal(data) {
  const errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.email.includes("@")) {
    errors.email = "Invalid email";
  }

  if (data.password.length < 6) {
    errors.password = "Password must be 6+ characters";
  }

  return errors;
}
```

### 🧩 Use It Before Moving to Next Step

Modify **Next button logic**.

```js
function handleNext() {
  if (state.currentStep === 1) {
    const errors = validatePersonal(state.formData.personal);

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }
  }

  dispatch({ type: "NEXT_STEP" });
}
```

Now your form prevents progression if invalid.

### 🧾 Show Errors in StepPersonal

> commit hash **49f8c7c**

Example:

```js
function StepPersonal({ data, errors, dispatch }) {
  ...
}
```

Input example:

```js
<input name="firstName" value={data.firstName} onChange={handleChange} />;

{
  errors.firstName && <p>{errors.firstName}</p>;
}
```

Now validation appears in UI.

🧠 Step 3 — Async Validation _(Fake API)_

> commit hash **17d96ce**

Now simulate checking if email already exists.

Fake API:

```js
// fakeAPI.js

function checkEmailExists(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const takenEmails = ["test@gmail.com", "admin@gmail.com"];
      resolve(takenEmails.includes(email));
    }, 1000);
  });
}
```

Usage:

```js
const exists = await checkEmailExists(email);
```

If true → email already used.

### 💣 Step 4 — Introduce the Race Condition

Add async validation on **email typing**.

Inside `handleChange`:

```js
async function handleChange(e) {
  dispatch({
    type: "UPDATE_FIELD",
    section: "personal",
    field: e.target.name,
    value: e.target.value,
  });

  if (e.target.name === "email") {
    const exists = await checkEmailExists(e.target.value);

    if (exists) {
      dispatch({
        type: "SET_ERRORS",
        errors: { email: "Email already exists" },
      });
    }
  }
}
```

Now test this:

Type quickly:

```
a@gmail.com
ab@gmail.com
abc@gmail.com
```

Three API calls fire.

Possible response order:

```
1 → slow
2 → fast
3 → medium
```

Response order:

```
2 returns
3 returns
1 returns LAST
```

Now the UI shows the **wrong validation**.

This is called:

> **Async race condition**

### 🧠 Step 5 — Fix Race Condition _(Stale Response Problem)_

> commit hash **4a9a112**

We must ignore **old responses**.

Solution: **request id tracking**

#### Add a Ref

```js
const requestIdRef = useRef(0);
```

#### Update Email Validation

```js
async function handleChange(e) {
  dispatch({
    type: "UPDATE_FIELD",
    section: "personal",
    field: e.target.name,
    value: e.target.value,
  });

  if (e.target.name === "email") {
    const requestId = ++requestIdRef.current;
    const exists = await checkEmailExists(e.target.value);

    if (requestId !== requestIdRef.current) {
      return;
    }

    if (exists) {
      dispatch({
        type: "SET_ERRORS",
        errors: { email: "Email already exists" },
      });
    }
  }
}
```

Now only the **latest request matters**.

Old responses are ignored.

### 🧠 Why This Is Critical

Without this fix:

Typing fast = broken validation.

And this happens in:

- signup forms
- checkout forms
- banking apps
- admin dashboards

### 🧠 Tomorrow Gets Worse (Day 3)

We introduce **autosave + partial drafts**.

Then you will see another brutal bug:

> Last save finishing after newer save → **data corruption**

This happens in **Notion, Google Docs clones, CRMs, etc**.

### ✅ End of Day 2 Checklist

Your form should now:<br>
✔ Validate required fields<br>
✔ Validate email format<br>
✔ Check email uniqueness async<br>
✔ Prevent stale validation responses<br>

## 💾 Day 3 — Autosave + Partial Saves

Your form currently works, but if the browser refreshes → everything is lost.

Today we add:

- Autosave every **5 seconds**
- Save on **step change**
- **Restore draft on reload**
- Handle **overlapping saves**

We will first implement **a naive version**, then break it, then fix it.

### 🧠 Step 1 — Draft Storage Strategy

For now we store draft in:

```
localStorage
```

Key:

```js
FORM_DRAFT;
```

Draft structure:

```js
{
  currentStep: 2,
  formData: { ... }
}
```

### 🧱 Step 2 — Load Draft on App Start

> commit hash **8bb0e96**

Inside `MultiStepForm`.

```js
function loadDraft() {
  try {
    const savedDraft = localStorage.getItem("FORM_DRAFT");

    if (!savedDraft) return initialState;

    const parsed = JSON.parse(savedDraft);

    return {
      ...initialState,
      ...parsed,
      errors: {}, // never restore errors
    };
  } catch (err) {
    console.error("Failed to load draft", err);
    return initialState;
  }
}
```

Modify `useReducer`:

```js
const [state, dispatch] = useReducer(formReducer, undefined, loadDraft);
```

### 🧠 Step 3 — Save Draft Function

Create helper:

```js
import { useRef } from "react";

const saveIdRef = useRef(0);

async function saveDraft() {
  const saveId = ++saveIdRef.current;

  const draft = {
    currentStep,
    formData,
  };
  // localStorage.setItem("FORM_DRAFT", JSON.stringify(draft));
  await saveDraftToServer(draft);

  if (saveId !== saveIdRef.current) {
    return;
  }

  console.log("Latest save confirmed");
}
```

Note:

We **do NOT store errors**.

Errors are UI state, not persisted data.

### ⏱ Step 4 — Autosave Every 5 Seconds

> commit hash **a974cb3**

Inside `MultiStepForm`.

```js
// autosave whenever relevant parts of the state change, debounced
const saveTimer = useRef(null);
useEffect(() => {
  // clear previous timer
  if (saveTimer.current) {
    clearTimeout(saveTimer.current);
  }

  saveTimer.current = setTimeout(() => {
    saveDraft();
    console.log("Autosaved draft");
  }, 5000); // 5‑second delay

  return () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
  };
}, [currentStep, formData]);
```

Now every 5 seconds:

```
Draft saved automatically
```

### 🧠 Concepts You Just Practiced

#### 1️⃣ In-Flight Request Tracking

Prevent stale operations from updating state.

2️⃣ Last Write Wins

Older operations finishing later corrupt state.

#### 3️⃣ Draft Persistence

Critical for:

- Notion
- CRMs
- Checkout flows
- Long forms

### 🧪 Stress Test

Try this:<br>
1️⃣ Type rapidly<br>
2️⃣ Change steps quickly<br>
3️⃣ Refresh page<br>

Expected:<br>
✔ Latest data preserved<br>
✔ Draft restored correctly

### 🧠 Tomorrow — The UX Nightmare

Day 4 introduces **real production UX bugs**:

- Double submit
- Pending validation + step change
- Refresh during save
- Loading states
- Retry logic

This is where **professional frontend engineers separate themselves**.

## 🔥 Day 4 – UX Bugs That Kill Real Apps

You currently have:<br>
✔ Multi-step form<br>
✔ Sync validation<br>
✔ Async email validation<br>
✔ Draft persistence _(localStorage)_

But your app still has **hidden UX disasters**.

We will handle **4 real-world problems**.

### 1️⃣ Double Click Submit Problem

Imagine the final step:

User double-clicks **Submit**.

Result:

```
Request 1 → server
Request 2 → server
```

This causes:

- duplicate payments
- duplicate orders
- duplicate accounts

#### Fix: Track Submission State

> commit hash **8cc4c1c**

Add to state:

```js
const currentState = {
  currentStep: 1,
  formData: { ... },
  errors: {},
  isSubmitting: false
};
```

#### Reducer Actions

```js
case "SUBMIT_START":
  return { ...state, isSubmitting: true };

case "SUBMIT_SUCCESS":
  return { ...state, isSubmitting: false };

case "SUBMIT_ERROR":
  return { ...state, isSubmitting: false };
```

#### Submit Handler

> commit hash **5149917**

```js
async function handleSubmit() {
  if (state.isSubmitting) return;

  dispatch({ type: "SUBMIT_START" });

  try {
    await fakeSubmitAPI(state.formData);

    dispatch({ type: "SUBMIT_SUCCESS" });

    alert("Application submitted successfully!");
  } catch (err) {
    dispatch({ type: "SUBMIT_ERROR" });
    alert("Submission failed. Try again.");
  }
}
```

#### Disable Button

```js
<button disabled={state.isSubmitting} onClick={handleSubmit}>
  {state.isSubmitting ? "Submitting..." : "Submit"}
</button>
```

Now **double click does nothing**.

### 2️⃣ Refresh During Save

> commit hash **49977fb**

Right now autosave runs silently.

If user refreshes during save → **data may be lost**.

We warn the user.

#### Add BeforeUnload Protection

```js
useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", handler);

  return () => {
    window.removeEventListener("beforeunload", handler);
  };
}, []);
```

Now browser warns:

> “Changes you made may not be saved.”

### 3️⃣ Navigation During Async Validation

> commit hash **15710ff**

Example:

User types email → validation running.

Then clicks Next immediately.

Now validation finishes after step change.

You get:

`Error appears on wrong step`

#### Fix: Track Validation State

Add:

```js
isValidating: false;
```

Reducer:

```js
case "VALIDATION_START":
  return { ...state, isValidating: true };

case "VALIDATION_END":
  return { ...state, isValidating: false };
```

#### Update Email Validation

Before API call:

```js
dispatch({ type: "VALIDATION_START" });
```

After:

```js
dispatch({ type: "VALIDATION_END" });
```

Disable Next While Validating

```js
<button onClick={handleNext} disabled={state.isValidating}>
  {state.isValidating ? "Checking..." : "Next"}
</button>
```

Now user **cannot escape validation**.

### 🎯 End of Day 4 Result

Your form now handles:<br>
✔ Double submit protection<br>
✔ Async validation blocking<br>
✔ Refresh protection<br>
✔ Persistent errors<br>
✔ Loading feedback<br>
✔ Retry after failure<br>

Now your form behaves like **a real SaaS product**.

### 🚀 Day 5 _(Very Important)_

Tomorrow we remove messy booleans like:

```
isSubmitting
isValidating
isSaving (BeforeUnload)
hasError (pending)
```

And replace them with a **UI State Machine**.

This is how:

- Airbnb
- Stripe
- Shopify

manage complex UI flows.

## Day 5 – Build a Mini State Machine

> Day 5 is where your form architecture becomes **professional-grade**.

Right now your UI probably has flags like:

```js
isDirty;
isSubmitting;
isValidating;
isSaving;
```

This leads to **boolean explosion**.

Example impossible state:

```js
isSubmitting = true;
isValidating = true;
isSaving = true;
```

What does that even mean?

This is why large applications use **State Machines**.

### 🧠 State Machine Mental Model

Instead of many booleans, the UI is always in **one clear state**.

Example states:

```
idle
editing
validating
saving
submitting
success
error
```

At any moment:

```
UI = ONE STATE
```

### 🎯 Step 1 — Add a `status` Field

> commit hash **9a3acfd**

Replace many booleans with a single status.

Update your base state:

```js
const currentState = {
  currentStep: 1,
  formData: {...},
  errors: {},
  status: "idle"
};
```

Possible values:

```
"idle"
"editing"
"validating"
"saving"
"submitting"
"success"
"error"
```

### 🎯 Step 2 — Define Allowed Transitions

State machines work by **explicit transitions**.

Example flow:

```
idle → editing
editing → validating
validating → editing
editing → saving
saving → editing
editing → submitting
submitting → success
submitting → error
```

This prevents illegal states.

Example illegal transition:

```
success → validating ❌
```

### 🎯 Step 3 — Update Reducer

Add a transition action.

```js
case "SET_STATUS":
  return {
    ...state,
    status: action.status
  };
```

### 🎯 Step 4 — Use Status in Validation

> commit hash **26d169e**

Example async email validation.

Before API call:

```js
dispatch({ type: "SET_STATUS", status: "validating" });
```

After validation finishes:

```js
dispatch({ type: "SET_STATUS", status: "editing" });
```

Now UI knows exactly what's happening.

### 🎯 Step 5 — Saving Draft

> commit hash **8f201c7**

Before autosave:

```js
dispatch({ type: "SET_STATUS", status: "saving" });
```

After save finishes:

```js
dispatch({ type: "SET_STATUS", status: "editing" });
```

### 🎯 Step 6 — Submitting Form

> commit hash **b4d532f**

Update your submit handler.

```js
async function handleSubmit() {
  if (status === "submitting") return;

  dispatch({ type: "SET_STATUS", status: "submitting" });

  try {
    await fakeSubmitAPI(formData);
    dispatch({ type: "SET_STATUS", status: "success" });
    localStorage.removeItem("FORM_DRAFT");
    alert("Application submitted successfully!");
  } catch (e) {
    dispatch({ type: "SET_STATUS", status: "error" });
    alert("Submission failed. Try again.");
  }
}
```

🎯 Step 7 — UI Based on Status

Buttons should react to state.

Example:

```js
<button onClick={handleSubmit} disabled={state.status === "submitting"}>
  {state.status === "submitting" ? "Submitting..." : "Submit"}
</button>
```

### 🎯 Example Status Indicators

You can also show UX feedback.

```js
{
  state.status === "saving" && <p>Saving draft...</p>;
}
{
  state.status === "validating" && <p>Checking email...</p>;
}
{
  state.status === "error" && <p>Something went wrong.</p>;
}
```

### 🧠 Why This Is Powerful

Instead of managing many booleans:

```
isSaving
isSubmitting
isValidating
```

You now manage **one predictable flow**.

Debugging becomes easier:

```js
console.log(state.status);
```

You instantly know **what the UI is doing**.

### 🧠 Real-World Example

Libraries like **XState** implement full state machines.

Companies like:

- Shopify
- Stripe
- Airbnb
- Netflix

use this pattern to control complex UI flows.

Example XState machine:

```
idle
 └ editing
      ├ validating
      ├ saving
      └ submitting
```

### 🧪 Test Your Form Now

Run these scenarios:<br>
1️⃣ Type email → status = "`validating`"<br>
2️⃣ Autosave triggers → status = "`saving`"<br>
3️⃣ Submit → status = "`submitting`"<br>
4️⃣ Success → status = "`success`"

You should never **see conflicting states**.

### 🚀 What Comes Next _(Final Day)_

Day 6 is about **Performance & Stability**.

We will test your form under stress:

- fast typing
- step jumping
- slow network
- unnecessary re-renders

You'll learn:

```
memo
useCallback
render optimization
```

The same techniques used in **large production React apps**.
