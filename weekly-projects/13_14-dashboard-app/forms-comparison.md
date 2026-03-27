# Controlled vs Uncontrolled Inputs

## Controlled

- React manages state
- Re-renders on every input change
- Enables:
  - validation
  - dynamic UI updates
  - conditional rendering

### Use When:

- Form logic depends on input
- Real-time validation required
- UI reacts to typing

---

## Uncontrolled

- DOM manages state
- No re-renders on typing
- Uses refs to read values

### Use When:

- Simple forms
- No live validation
- Performance is critical

---

## Key Insight

Controlled = Control + Predictability  
Uncontrolled = Performance + Simplicity

---

## Real World Strategy

Use BOTH:

- Controlled → Login, Signup, Filters
- Uncontrolled → Large forms, surveys, feedback
