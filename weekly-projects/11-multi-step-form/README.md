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
