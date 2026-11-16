# ⚡ JavaScript Documentation for Students

A modern, beginner-friendly, and interactive JavaScript documentation web application tailored specifically for students and self-learners.

---

## 🌟 Key Features

1. **Light & Dark Theme Toggle**:
   - One-click toggle button (☀️ / 🌙) in the top header.
   - Automatically detects your system preference (`prefers-color-scheme`).
   - Seamlessly persists your theme choice across visits via `localStorage`.

2. **All Core Topics & Real-World Examples**:
   - **Basics & Getting Started**: What is JS, where does it run, linking in HTML (`defer`/`async`), console outputs (`log`, `table`, `warn`, `error`).
   - **Variables & Scopes**: `const` vs `let` vs `var`, block scoping, hoisting, and naming conventions.
   - **Data Types & Type Conversion**: Primitives, Reference types, `typeof`, `typeof null` historic quirk, truthy vs falsy table.
   - **Operators & Expressions**: Arithmetic, assignment, strict `===` vs loose `==`, logical short-circuiting, `??` (Nullish coalescing), `?.` (Optional chaining), ternary operator.
   - **Control Flow**: `if / else if / else`, `switch / case / break / default`, guard clauses.
   - **Loops & Iteration**: `for`, `while`, `do...while`, `for...of` (iterables), `for...in` (object keys), `break` and `continue`.
   - **Functions & Scope**: Declarations, expressions, arrow functions `() => {}`, default parameters, rest parameters `...args`, closures with counter example.
   - **Strings & Template Literals**: Backtick interpolation `${}`, `slice()`, `trim()`, `toUpperCase()`, `includes()`, `replace()`, `split()`.
   - **Numbers & Math Object**: `parseInt()`, `parseFloat()`, `.toFixed()`, `Math.floor()`, `Math.ceil()`, `Math.random()` range formula.
   - **Arrays & Modern Array Methods**: Indexing, `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()`, `.sort()`.
   - **Objects & Object Methods**: Dot vs bracket notation, methods, `this`, `Object.keys()`, `Object.values()`, `Object.entries()`, destructuring, spread operator.
   - **DOM Manipulation**: Selecting elements (`querySelector`, `querySelectorAll`), `.textContent`, `.classList` (`add`, `remove`, `toggle`), creating elements (`createElement`, `appendChild`).
   - **Events & Interactivity**: `addEventListener`, click, input, keydown, form submit, `e.target`, `e.preventDefault()`.
   - **Asynchronous JavaScript**: Single-threaded call stack, `setTimeout`, Promises (`resolve`, `reject`, `.then`, `.catch`), `async / await`.
   - **Fetch API & JSON**: `JSON.stringify()`, `JSON.parse()`, `fetch()` with `async / await`, error handling with `.ok`.
   - **Modern ES6+ Syntax**: Destructuring, spread/rest, default params, optional chaining, nullish coalescing.
   - **Browser Storage**: `localStorage` vs `sessionStorage`, `setItem`, `getItem`, `removeItem`, saving objects and arrays.
   - **Error Handling & Debugging**: `try...catch...finally`, `throw new Error()`, `ReferenceError`, `TypeError`, `SyntaxError`.

3. **Interactive Runnable Code Blocks**:
   - Every single code example in the documentation has an interactive editor!
   - Students can edit values right on the page and click **"▶ Run Code"** to see the real virtual console output.
   - **"📋 Copy"** button with toast feedback.
   - **"↺ Reset"** button to restore initial snippet.

4. **Student Challenges**:
   - At the end of every topic, a hands-on coding challenge is provided.
   - Click "💡 Reveal Solution" to view the solution and run it.

5. **Student Progress Tracker**:
   - Each lesson in the sidebar has a checkbox to track completion.
   - Progress bar at the top displays `X of 18 completed (Y%)`.
   - Stored in browser `localStorage`.

6. **Live Instant Search**:
   - Instant search bar that filters topics, subtopics, and keywords on keystroke.

7. **Interactive Playground / Sandbox**:
   - Dedicated scratchpad where students can write arbitrary JavaScript.
   - Keyboard shortcut: `Ctrl + Enter` (or `Cmd + Enter`) to run.
   - Pre-loaded starter templates (Array methods, Async Fetch, Destructuring, DOM node simulation).

8. **Knowledge Check Quiz**:
   - 12 multiple choice questions covering key JS concepts.
   - Immediate feedback (green/red) and in-depth explanations for each answer.
   - Final score counter with grade assessment and retake button.

9. **Quick Syntax Cheat Sheet**:
   - Printable / reviewable compact syntax tables for exam review.

---

## 🚀 How to Run

No build step or Node.js installation is required! It runs directly in any modern browser:

### Option 1: Direct File Open
Double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended for Fetch examples)
Using Node.js:
```bash
npx serve .
```
Or using Python:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 📁 File Structure
```
JSHost/
├── index.html              # Main HTML5 application shell & view tabs
├── css/
│   ├── style.css           # Modern design system, themes (light/dark), layouts
│   └── syntax.css          # Syntax highlighting & badges
├── js/
│   ├── docs-data.js        # Comprehensive 18-topic curriculum, cheat sheet & quiz data
│   ├── app.js              # Theme switcher, runner, search, sidebar & progress logic
│   ├── playground.js       # Interactive Sandbox mode & templates
│   └── quiz.js             # Interactive 12-question quiz engine
└── README.md               # Documentation and usage guide
```
