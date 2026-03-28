# Dashboard App

## Day 1 — Dashboard Project Setup _(Guided Execution)_

> commit hash **a787026**

### 🧠 Step 0: Think Before Coding

You're not just “creating folders”.

You're defining:

- Component boundaries
- Reusability strategy
- Future scalability

### 🏗️ Step 1: Create Project

Use Vite _(fast, modern)_:

```bash
npm create vite@latest dashboard-app
cd dashboard-app
npm install
npm install recharts
npm run dev
```

### 📁 Step 2: Structure Setup _(IMPORTANT)_

Inside `src/`, create:

```
src/
  components/
    Chart/
    Table/
    Sidebar/
    Header/

  pages/
    Dashboard/

  hooks/

  utils/
```

#### ⚠️ Rule _(Very Important)_

Each component folder should follow:

```
ComponentName/
  ComponentName.jsx
  ComponentName.css (or module.css)
  index.js
```

👉 Example:

```
Sidebar/
  Sidebar.jsx
  Sidebar.css
  index.js
```

Why this matters:

- Clean imports:

```js
import Sidebar from "@/components/Sidebar";
```

- Scalable
- Matches real company codebases

### 🧩 Step 3: Setup Base Layout

Inside:

```
pages/Dashboard/Dashboard.jsx
```

Write:

```
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <h1>Dashboard Content</h1>
      </div>
    </div>
  );
}
```

### 🧱 Step 4: Create Dummy Components

Create minimal versions:

#### Sidebar.jsx

```js
export default function Sidebar() {
  return <div style={{ width: "200px" }}>Sidebar</div>;
}
```

#### Header.jsx

```js
export default function Header() {
  return <div style={{ height: "60px" }}>Header</div>;
}
```

### 🔌 Step 5: Connect to App

Inside App.jsx:

```js
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return <Dashboard />;
}

export default App;
```

### ⚙️ Step 6: _(Optional but Powerful)_ Path Alias

> commit hash **cc77794**

Instead of messy imports like:

```js
../../components/Sidebar
```

Set alias _(@ → src)_

#### vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Then use:

```js
import Sidebar from "@/components/Sidebar";
```

### 🧪 Step 7: Sanity Check

Your app should show:

- Sidebar _(left)_
- Header _(top)_
- "Dashboard Content"

👉 If not → something is structurally wrong _(fix now, not later)_

### 🎯 Deliverable Checklist _(Strict)_

Before moving to Day 2, confirm:

✅ Project created with Vite<br>
✅ Folder structure EXACT<br>
✅ Sidebar + Header rendering<br>
✅ Dashboard page connected<br>
✅ Recharts installed<br>
✅ No console errors<br>

### 🧠 Reality Check (Important Insight)

Right now, you haven't built anything “fancy”.

But you've done something more important:

👉 **You created a scalable foundation**

Most beginners skip this → regret later.

## Day 2 — DataTable Component _(Production Mindset)_

### 🧠 First Principle

Don’t build:

> “a table for this dashboard”

Build:

> **a reusable table engine**

### Step 1: Component Contract _(IMPORTANT)_

Your table should NOT hardcode anything.

It should accept:

```js
columns = [
  { key: "user", label: "User" },
  { key: "revenue", label: "Revenue" },
  { key: "orders", label: "Orders" },
  { key: "status", label: "Status" },
];

data = [{ user: "Ritik", revenue: 5000, orders: 12, status: "Active" }];
```

👉 This is what makes it reusable.

### 🏗️ Step 2: File Setup

```
components/
  Table/
    DataTable.jsx
    index.js
```

### 🧩 Step 3: Core Implementation

> commit hash **f195a4c**

#### ✅ DataTable.jsx

```jsx
import { useState } from "react";

export default function DataTable({ columns, data }) {
  const [sortConfig, setSortConfig] = useState(null);

  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;

    return 0;
  });

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
                padding: "10px",
                textAlign: "left",
              }}
            >
              {col.label}
              {sortConfig?.key === col.key
                ? sortConfig.direction === "asc"
                  ? " 🔼"
                  : " 🔽"
                : ""}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td
                key={col.key}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### 🔌 Step 4: Export Cleaner

#### index.js

```js
export { default } from "./DataTable";
```

### 🧪 Step 5: Use in Dashboard

Inside `Dashboard.jsx`:

```jsx
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import DataTable from "@/components/Table";

const columns = [
  { key: "user", label: "User" },
  { key: "revenue", label: "Revenue" },
  { key: "orders", label: "Orders" },
  { key: "status", label: "Status" },
];

const data = [
  { user: "Ritik", revenue: 5000, orders: 12, status: "Active" },
  { user: "Aman", revenue: 3000, orders: 8, status: "Inactive" },
  { user: "Neha", revenue: 7000, orders: 15, status: "Active" },
];

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <h2>Users</h2>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
```

### 🧠 Important Engineering Insights

#### 1. Why columns config?

Because:

- You decouple UI from data
- Same table can be reused anywhere

#### 2. Why `sortConfig` object?

Instead of multiple states:

❌ bad:

```js
const [sortKey, setSortKey];
const [direction, setDirection];
```

✅ good:

```js
{
  (key, direction);
}
```

👉 Easier to scale _(multi-sort later)_

#### 3. Why `[...]` before sorting?

```js
[...data];
```

Because:<br>
👉 You NEVER mutate props

### 4. Why index as key is okay here?

Temporary.

But in real apps:<br>
👉 Use unique IDs

### 🔥 Level-Up _(Optional if you want to push)_

Add:

- Conditional cell rendering
- Status color _(green/red)_
- Empty state
- Loading state

### 🎯 Deliverable Checklist

Before Day 3:

- Table renders dynamically
- Sorting works _(asc/desc toggle)_
- No hardcoded columns
- Reusable via props
- Clean structure

### 👇 Your Turn

Now I want you to think like a dev, not a copier:

👉 Answer this:

**How would you support custom cell rendering?**

Example:

- Status → colored badge instead of text
