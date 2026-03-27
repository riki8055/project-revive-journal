# My Deliverables

### 1. What did I observe?

> Typing in one input triggers a state update, which causes the entire component to re-execute, leading to all child inputs re-rendering—even those whose data hasn’t changed.

Key: **component re-execution**

### 2. Why does React re-render everything?

> React re-renders because state updates trigger the component function to run again. React then compares the new virtual DOM with the previous one (diffing) and updates only the necessary parts in the real DOM.

**Re-render ≠ DOM update**

React _re-runs everything, but updates only what changed_

### 3. What could go wrong in large apps?

Imagine having:
- 100+ inputs
- heavy validation
- API calls

👉 Result:
1. Input lags _(most dangeroues)_
2. Expensive re-renders
3. Unnecessary work
4. Complex bugs
5. Poor scalability