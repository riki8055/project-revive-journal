
# 9-Month Full Stack + GenAI Roadmap

This roadmap defines what *completion* means.
It is a reference, not a motivation document.

> **Philosophy:**  
> Stop thinking like a learner. Start thinking like an engineer.
>
> Always ask:
> - **Why does this exist?**
> - **What breaks first?**
> - **How do I know it’s broken?**

---

## MONTH 1–2: Engineering Foundations (Mindset > Syntax)

### Goal
Build engineering instincts before tools. Learn by **breaking things on purpose**.

---

## MONTH 1 — Programming + Web + Git (Reality-First)

### Core Concepts
- JavaScript fundamentals (practical, not academic)
- How the web actually works
- Git as a professional engineering tool
- Debugging mental models

---

## Week 1: Programming Reality Check

### Focus
JavaScript fundamentals with **failure awareness**

### Daily Breakdown
- **Day 1:** Variables, scope, types → *break them intentionally*
- **Day 2:** Functions, closures → *memory leaks via closures*
- **Day 3:** Arrays & objects → *mutation bugs*
- **Day 4:** Async JS (callbacks, promises) → *race conditions*
- **Day 5:** Error handling → *swallowed errors*
- **Day 6:** Mini project

### Mini Project
**CLI Expense Tracker (Node.js)**
- Bad inputs crash it
- Missing error handling
- Fix iteratively

### DSA Mapping
- Arrays → transaction lists
- Hash maps → category lookups

### Deliverables
GitHub repo containing:
- `/bugs.md` — bugs encountered
- `/lessons.md` — engineering lessons learned

---

## Week 2: Web Fundamentals (No Frameworks)

### Focus
Browser, HTTP, DOM

### Daily Breakdown
- **Day 1:** How browsers render pages
- **Day 2:** HTTP methods, headers, status codes
- **Day 3:** DOM manipulation (no libraries)
- **Day 4:** Forms & validation failures
- **Day 5:** Network debugging (DevTools)
- **Day 6:** Project

### Project
**Vanilla JS Form System**
- Client-side validation
- Server rejects bad input
- Observe failures in Network tab

### Failure Scenarios
- 400 vs 500 confusion
- CORS errors
- Silent form failures

---

## Week 3: Git & Engineering Workflow

### Focus
Professional Git usage

### Daily Breakdown
- **Day 1:** Git internals (commit graph)
- **Day 2:** Branching strategies
- **Day 3:** Merge conflicts (create them)
- **Day 4:** Bad commits → rewrite history
- **Day 5:** Code reviews (self-review)
- **Day 6:** Repository refactor

### Deliverables
- Clean commit history
- Meaningful commit messages

---

## Week 4: Engineering Mindset Project

### Project
**Broken To-Do App**
- Fix logic, performance, and UX issues in buggy code

### README Requirements
- What broke
- Why it broke
- How it was detected
- How it was fixed

---

## MONTH 2 — Deeper Web + Architecture Thinking

### Core Concepts
- Separation of concerns
- Data flow
- Observability (logs > `console.log`)

---

## Week 1–2: Modular JS & Simple Architecture

### Project
**Note-Taking App (Vanilla + Node)**
- Frontend ↔ Backend communication
- Manual logging

### Failure Training
- API timeout
- Invalid JSON
- Server crash

---

## Week 3: Intro to Performance

### Concepts
- Reflows & repaints
- Blocking JavaScript
- Network waterfalls

### Task
- Intentionally slow the app
- Identify bottlenecks
- Fix performance issues

---

## Week 4: Consolidation

### Deliverables
- One polished project
- Architecture diagram
- Failure analysis section

---

## MONTH 3–4: Frontend Engineering (React, but Real)

### Goal
Understand **why UIs break**, not just how to build them.

---

## MONTH 3 — React Fundamentals (Under the Hood)

### Core Concepts
- Component lifecycle
- State vs derived state
- Rendering cost

---

### Week 1: React Without Magic
- JSX → JavaScript
- Props drilling problems

**Mini Project:** Counter Dashboard (10 counters)  
- Identify performance issues  
- Fix using memoization

---

### Week 2: State Management Pain
- `useState` misuse
- `useEffect` infinite loops

**Failure Tasks**
- Stale closures
- Unnecessary re-renders

---

### Week 3: Forms, Validation, UX Bugs

**Project:** Complex Multi-Step Form
- Race conditions
- Partial saves

---

### Week 4: Debugging React

### Tools
- React DevTools
- Render tracking

### Deliverable
- Debug diary

---

## MONTH 4 — Production-Grade Frontend

### Week 1–2: Advanced Patterns
- Controlled vs uncontrolled inputs
- Error boundaries
- Lazy loading

**Project:** Dashboard App (Charts + Tables)

---

### Week 3: Frontend Failure Scenarios
- API returns `null`
- Slow network
- Expired authentication

---

### Week 4: Frontend Clone

**Clone:** Simplified Notion / Trello UI  
**Focus:** Data flow, not visuals

---

## MONTH 5: Backend Engineering (Where Systems Die)

### Goal
Learn where most real failures happen.

### Core Concepts
- APIs
- Databases
- Authentication
- Observability

---

### Week 1: Node.js + Express Internals
- Middleware chain
- Error propagation

---

### Week 2: Databases (SQL First)
- Schema design
- Indexes
- N+1 queries

**Failure Training**
- Locking issues
- Slow queries

---

### Week 3: Auth & Security
- JWT
- Session hijacking
- Password hashing

---

### Week 4: Backend Project

**Project:** Production-Style REST API
- Authentication
- Rate limiting
- Logging

---

## MONTH 6: DSA with Engineering Intuition

### Goal
Think in constraints, not LeetCode patterns.

### Topic Mapping
- Arrays → logs
- Hash maps → caches
- Queues → job processing
- Trees → file systems
- Graphs → dependency resolution

### Weekly Structure
- 3 days: DSA
- 2 days: Apply to projects
- 1 day: Failure analysis

### Deliverable
- `/dsa-in-practice.md`

---

## MONTH 7: GenAI Engineering (Not Prompt Toys)

### Goal
Build AI features that fail gracefully.

### Core Concepts
- How LLMs actually work
- Token cost
- Hallucinations
- Prompt iteration

---

### Week 1: Prompt Engineering Patterns
- Role prompting
- Few-shot
- Controlled chain-of-thought

---

### Week 2: LLM API Integration

**Project:** AI Content Analyzer
- Bad prompts
- Token overflow
- Cost tracking

---

### Week 3: Memory & Context

**Project:** AI Chatbot with Memory
- Context window overflow
- Incorrect recall

---

### Week 4: AI Failure Modes
- Hallucination detection
- Fallback logic

---

## MONTH 8: Capstone (Break It On Purpose)

### Capstone Rules
- Full-stack
- GenAI included
- Must fail under stress

### Example Ideas
- AI Research Assistant
- AI Support Ticket Analyzer
- AI Dev Helper

### Mandatory Failures
- Load spike
- Bad prompts
- Database slowdown
- API failure

### Deliverables
- Architecture diagram
- Load test results
- Failure post-mortem

---

## MONTH 9: System Design + Career Readiness

### System Thinking
- Scaling basics
- Caching
- Queues
- Observability
- Deployment
- CI/CD
- Monitoring, logs, alerts

---

### Career Preparation

#### GitHub
- Clean READMEs
- Failure sections
- Architecture diagrams

#### LinkedIn
Weekly posts:
- What broke this week
- What I fixed

#### Resume
- Metrics
- Decisions
- Trade-offs

---

> **Final Rule:**  
> If nothing broke, you didn’t learn enough.

