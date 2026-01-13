# Week 4

## What I built

- No build, just maintenance 
- <a href="https://github.com/riki8055/project-revive-journal/tree/main/weekly-projects%2F4-broken-phone">Broken Phones Web App</a>

## What I learned

- How to debug a project full of broken codes.

- Focused on fixing logic, performance, and UX issues in a broken Phones app

- Learned about _(issue-wise)_:
    - DOM API misuse (context-switch bug) _(issue #1)_
    - spec mismatch bug (silent failures) _(issue #2)_
    - state semantics bug (**cause–effect debugging** over trial-and-run) _(issue #3)_
    - destructive DOM mutation bug (`innerHTML` is destructive) / Never mutate a parent container destructively inside a loop. _(issue #4)_
    - data contract mismatch (Always trust the API response, never your assumption) _(issue #6)_
    - logic x UI contract bug ( js is only as correct as the CSS contract it relies on) _(issue #7)_
    - visual failure (issue #9), nested data contract bug (issue #10)
    - presentation-layer bug

- I diagnosed bugs like a **maintenance engineer**.

## What confused me

- Nothing

## What I avoided

- Nothing

## What I will do next week

Week 5-6 (Month 2): Modular JS & Simple Architecture