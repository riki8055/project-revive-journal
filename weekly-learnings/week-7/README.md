# Week 7 - Intro to Performance

## Day 1 – Mental Model of Browser Performance

![alt text](image.png)

![alt text](image-1.png)

### 1️⃣ The Browser Is an Assembly Line _(Not Magic)_

Think of the browser like a factory with **strict stages**. <br>
You _cannot_ skip stages. If you disturb one, everything downstream pays the price.

#### The Real Pipeline

```scss
HTML  ──▶ DOM
CSS   ──▶ CSSOM
DOM + CSSOM ──▶ Render Tree
Render Tree ──▶ Layout (Reflow)
Layout ──▶ Paint
Paint ──▶ Composite (GPU)
```

Key truth:

> Most performance bugs happen because devs accidentally restart this pipeline.

### 2️⃣ DOM ≠ What You See

#### DOM

- Structure only
- Nodes, hierarchy
- No sizes, no pixels

#### CSSOM

- Style rules
- Cascade resolved
- Still no pixels

#### Render Tree

- Only visible elements
- `display: none` ❌ removed
- Ready for layout

👉 Performance insight: <br>
Changing DOM structure is cheaper than triggering layout.

### 3️⃣ Layout _(Reflow)_: The Expensive Villain

#### What Layout Does

**Calculates**:

- width / height
- position
- geometry

**Depends on**:

- viewport
- parent elements
- siblings

#### Why It’s Expensive

- One change can affect **hundreds of nodes**
- Often **recursive**
- Happens on the **main thread**

#### Triggers

- Changing:
  - `width`, `height`
  - `margin`, `padding`
  - `top/left`
  - `display`
  - `font-size`

- Reading layout data:
  - `offsetHeight`
  - `getBoundingClientRect()`

> Reflow is like changing the foundation of a building after construction.

### 4️⃣ Paint: Death by a Thousand Cuts

#### What Paint Does

- Colors pixels
- Borders, shadows, text
- Happens after layout

#### Paint Is:

- Cheaper than layout
- Still expensive if frequent

#### Triggers

- `color`
- `background`
- `box-shadow`
- `border-radius`

> One paint is fine. <br>
> **Hundreds per second = jank**.

### 5️⃣ Composite: The Performance Cheat Code

![alt text](image-2.png)

#### What Composite Does

- Moves already-painted layers
- Uses GPU
- No layout
- No paint

#### Properties That Only Composite

✅ `transform` <br>
✅ `opacity`

This is why animations **must** use transform/opacity.

### 6️⃣ The One Rule That Explains 80% of Performance

**DOM Read → DOM Write → DOM Read = Performance Bug**

Example of trouble:

```js
box.style.width = "200px"; // write
console.log(box.offsetWidth); // read (forces layout)
box.style.height = "200px"; // write (forces layout again)
```

This forces the browser to:

- Flush pending changes
- Recalculate layout **multiple times**

This is called **layout thrashing**.

### 7️⃣ Performance Is About Cascades, Not Lines

Important mindset shift:

- Performance cost is **non-local**
- One innocent line can trigger:
  - layout → paint → composite
  - across the whole page

So stop asking:

> “Is this line expensive?”

Start asking:

> “What stage of the pipeline does this line touch?”

### 8️⃣ Your Day 1 Task _(Mandatory)_

#### ✅ Task A: Observe

1. Open **any website**
2. Open **DevTools → Performance**
3. Click **Record**
4. Reload the page
5. Stop recording

Look For

- Purple bars → layout
- Green bars → paint
- Long yellow blocks → JS

Don’t optimize. <br>
**Just observe**.

#### ✅ Task B: Answer These _(Write Them Down)_

1. What triggers layout?
2. What is cheaper: paint or layout?
3. Why are `transform` animations smooth?
4. Why is reading `offsetHeight` dangerous?

If you can answer these **without Googling**, Day 1 is complete.

### What You Gained Today

- A **mental x-ray** of the browser
- Ability to _predict_ performance issues
  Foundation for every optimization you’ll do next
