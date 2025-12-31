Month 1 > Week 2 > Day 1

# How Browsers Render Pages

![alt text](images/BrowserRenderingPipeline01.png)

<img src="images/dom-cssom-are-combined-8de5805b2061e.png" style="background-color: white; padding: 10px" />

![alt text](images/fig-1-v2.svg)

## 1. URL → Network → Bytes

You type a URL and press Enter.

**Browser does NOT think in “pages”.**

It thinks in **resources**.

**Steps:**

1. DNS lookup → IP address
2. TCP connection _(TLS if HTTPS)_
3. HTTP request → HTML document
4. Server responds with raw bytes

**At this point:**

- ❌ No DOM
- ❌ No CSS
- ❌ No layout
- ❌ No page

Just bytes.

## 2. HTML Parsing → DOM Tree

Browser starts **streaming** HTML _(it doesn’t wait for full file)_.

- HTML is parsed **top to bottom**
- Each tag becomes a **node**
- This forms the **DOM _(Document Object Model)_**

**Key truths:**

- DOM is a **tree**, not text
- Browser cannot render from HTML directly
- DOM represents **structure + meaning**, not appearance

⚠️ Script tags can block parsing unless `async` or `defer`.

## 3. CSS Parsing → CSSOM Tree

**While parsing HTML:**

- Browser discovers CSS (`<link>`, `<style>`)
- CSS is parsed into **CSSOM**

**Important:**

- CSSOM is also a **tree**
- Browser **must finish CSSOM** before rendering anything
- CSS is **render-blocking**

**Why?**

> Browser cannot guess styles — wrong styles = wrong layout.

## 4. DOM + CSSOM → Render Tree

**Now the browser combines:**

- DOM _(what exists)_
- CSSOM _(how it looks)_

Result → **Render Tree**

**Characteristics:**

- Only **visible nodes**
- `display: none` ❌ excluded
- `visibility: hidden` ✅ included _(but invisible)_
- Pseudo-elements ✅ included _(`::before`, `::after`)_

This tree is **what will actually be painted**.

## 5. Layout _(Reflow)_ — Geometry Calculation

Now the browser asks:

> Where exactly does every box go?

This step calculates:

- Width / height
- Position (x, y)
- Margin / padding / border
- Viewport relations

**Triggered by:**

- Initial render
- Window resize
- Font load
- DOM changes
- CSS changes

⚠️ Layout is **expensive**.

## 6. Paint — Pixels on Screen

Browser now:

- Fills pixels
- Draws text
- Draws borders
- Applies colors, shadows, images

Each visual change = repaint.

Examples:

- `color`
- `background`
- `box-shadow`

Paint ≠ Layout.

## 7. Composite — GPU Magic

Modern browsers split page into **layers**.

GPU handles:

- Transforms
- Opacity
- Animations _(when done right)_

This allows:

- Smooth scrolling
- 60fps animations
- No re-layout

This is why:

```css
transform: translateX();
opacity: 0.5;
```

is faster than:

```css
left: 100px;
```

## The Critical Rendering Path _(CRP)_

Summarized pipeline:

```mathematica
HTML → DOM
CSS  → CSSOM
DOM + CSSOM → Render Tree
Render Tree → Layout
Layout → Paint
Paint → Composite
```

Every performance problem lives **somewhere in this path**.

## Mental Models

- Browser renders **trees**, not files
- CSS blocks rendering
- JS can block parsing
- Layout is expensive
- Paint is cheaper than layout
- Composite is cheapest
- Performance = avoiding unnecessary steps

## Why This Matters _(For You Specifically)_

Given your path:

- Full-stack dev
- Performance-aware engineer
- No framework crutches

This knowledge explains:

- Why React “re-render” fear exists
- Why DOM manipulation hurts
- Why Tailwind works fast
- Why bad CSS kills UX
- Why animations stutter

---

Month 1 > Week 2 > Day 2

# HTTP Methods, Headers, Status Codes

> This is the language browsers and servers speak. Everything else (APIs, auth, cookies, caching) sits on top of this.

At its core, HTTP is:

> A stateless request–response protocol over the network

No memory. No session. No browser intelligence.
Just **request → response**.

## 1. HTTP Request: 4 Things _(Always)_

Every HTTP request has exactly these components:

```
METHOD /path HTTP/1.1
Headers
(blank line)
Body (optional)
```

Example:

```
POST /login HTTP/1.1
Host: example.com
Content-Type: application/json

{ "email": "...", "password": "..." }
```

## 2. HTTP Methods — “What do you want me to do?"

Methods define **intent**, not implementation.

### Core Methods _(Non-Negotiable)_

| Method | Meaning         | Must Know Truth                    |
|--------|-----------------|------------------------------------|
| GET    | Fetch data      | No body (by convention), cacheable |
| POST   | Create / Submit | Has body, not idempotent           |
| PUT    | Replace         | Full replacement                   |
| PATCH  | Modify          | Partial update                     |
| DELETE | Remove          | Idempotent                         |

### Idempotency _(Very Important)_

- **GET, PUT, DELETE** → same request = same result

- **POST** → may create multiple resources if repeated

Browsers, proxies, retries depend on this.

## 3. Headers — Metadata That Controls Everything

Headers are **instructions**, not decoration.

### Request Headers _(Browser → Server)_

| Header        | Purpose                        |
|---------------|--------------------------------|
| Host          | Which server                   |
| User-Agent    | Browser identity               |
| Accept        | What response formats I accept |
| Content-Type  | What I'm sending               |
| Authorization | Who I am                       |
| Cookie        | Stored client state            |

Example:

```
Accept: application/json
Authorization: Bearer <token>
```

### Response Headers _(Server → Browser)_

| Header         | Purpose             |
|----------------|---------------------|
| Content-Type   | What I sent         |
| Content-Length | Size                |
| Set-Cookie     | Store client state  |
| Cache-Control  | Caching rules       |
| Location       | Redirect target     |

Example:

```
Set-Cookie: sessionId=abc; HttpOnly; Secure
```

## 4. Status Codes — Outcome of the Contract

Status codes are **machine-readable outcomes**.

### 1xx — Informational

- Rarely used directly

### 2xx — Success

| Code | Meaning    |
|------|------------|
| 200  | OK         |
| 201  | Created    |
| 204  | No Content |

> 💡 `204` is powerful for delete/update operations.

### 3xx — Redirection

| Code | Meaning              |
|------|----------------------|
| 301  | Permanent Redirect   |
| 302  | Temporary Redirect   |
| 304  | Not Modified (cache) |

> ⚠️ 304 saves bandwidth + render time

### 4xx — Client Errors

| Code | Meaning           |
|------|-------------------|
| 400  | Bad Request       |
| 401  | Unauthorised      |
| 403  | Forbidden         |
| 404  | Not Found         |
| 429  | Too Many Requests |

Truth:
- 401 → “Who are you?”
- 403 → “I know you, but no.”

### 5xx — Server Errors

| Code | Meaning               |
|------|-----------------------|
| 500  | Internal Server Error |
| 502  | Bad Gateway           |
| 503  | Service Unavailable   |

These mean:
> “Request was valid. Server failed.”

## Statelessness — The Hidden Rule

HTTP **does not remember anything**.

So how do websites “remember” you?

Answers:

- Cookies
- Tokens
- Headers
- URL params

All hacks **around** statelessness.

## 6. Browser Reality _(Important)_

When browser makes a request:

- It automatically adds headers
- It handles redirects
- It stores cookies
- It enforces CORS
- It caches aggressively

You never talk to HTTP raw — browser mediates it.

## Final Mental Map

```txt
Client intent → METHOD
Context & rules → HEADERS
Action result → STATUS CODE
Actual data → BODY
```