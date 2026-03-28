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
