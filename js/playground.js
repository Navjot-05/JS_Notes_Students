/**
 * Interactive Student Playground / Sandbox
 * Allows students to write arbitrary JavaScript, test algorithms, and see real-time console outputs.
 */

const PLAYGROUND_TEMPLATES = {
  arrays: `// Array Methods Practice
const students = [
  { name: "Maya", grade: 92, major: "CS" },
  { name: "Liam", grade: 76, major: "Math" },
  { name: "Noah", grade: 88, major: "CS" },
  { name: "Olivia", grade: 95, major: "Physics" }
];

// 1. Filter students with grade >= 85
const honorRoll = students.filter(s => s.grade >= 85);
console.log("Honor Roll Students:", honorRoll.map(s => s.name));

// 2. Calculate average grade
const totalGrade = students.reduce((sum, s) => sum + s.grade, 0);
const average = totalGrade / students.length;
console.log("Class Average:", average);

// 3. Check if all passed
const allPassed = students.every(s => s.grade >= 50);
console.log("Did everyone pass?", allPassed);`,

  asyncFetch: `// Async / Await with Real API
async function getStudentTodos() {
  console.log("📡 Fetching demo todos from JSONPlaceholder...");
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
    const todos = await response.json();
    
    console.log("✅ Successfully received " + todos.length + " todos:");
    console.table(todos);
  } catch (error) {
    console.error("❌ Failed to fetch:", error.message);
  }
}

getStudentTodos();`,

  destructuring: `// Object & Array Destructuring Demo
const user = {
  id: 42,
  username: "codeMaster",
  profile: {
    country: "Japan",
    skills: ["JS", "TypeScript", "Node.js"]
  }
};

// Deep destructuring with aliases and defaults
const {
  username,
  profile: { country, skills: [primarySkill, secondarySkill] },
  status = "Active"
} = user;

console.log("User:", username);
console.log("Country:", country);
console.log("Primary Skill:", primarySkill);
console.log("Status:", status);`,

  domSimulation: `// Dynamic DOM Node Creation Simulation
const container = document.createElement("div");
container.className = "student-dashboard";

const header = document.createElement("h2");
header.textContent = "My Learning Goals";
container.appendChild(header);

const goals = ["Master JS Variables", "Understand Closures", "Build a Web App"];
const list = document.createElement("ol");

goals.forEach(goal => {
  const item = document.createElement("li");
  item.textContent = goal;
  list.appendChild(item);
});

container.appendChild(list);

console.log("Generated DOM Structure:");
console.log(container.outerHTML);`
};

document.addEventListener('DOMContentLoaded', () => {
  initPlayground();
});

function initPlayground() {
  const textarea = document.getElementById('playground-editor');
  const runBtn = document.getElementById('playground-run-btn');
  const clearBtn = document.getElementById('playground-clear-btn');
  const templateSelect = document.getElementById('playground-template-select');

  if (!textarea || !runBtn) return;

  // Default initial code
  if (!textarea.value.trim()) {
    textarea.value = PLAYGROUND_TEMPLATES.arrays;
  }

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to run
  textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPlaygroundCode();
    }
  });

  runBtn.addEventListener('click', runPlaygroundCode);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const consoleEl = document.getElementById('playground-console-output');
      if (consoleEl) consoleEl.innerHTML = '<div style="color: #64748b; font-style: italic;">Console cleared. Click "Run Code" or press Ctrl+Enter to execute.</div>';
    });
  }

  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      if (PLAYGROUND_TEMPLATES[selected]) {
        textarea.value = PLAYGROUND_TEMPLATES[selected];
        showToast(`Loaded "${e.target.options[e.target.selectedIndex].text}" template`);
      }
    });
  }
}

function runPlaygroundCode() {
  const textarea = document.getElementById('playground-editor');
  const consoleEl = document.getElementById('playground-console-output');
  if (!textarea || !consoleEl) return;

  consoleEl.innerHTML = '';
  const code = textarea.value;

  const customConsole = {
    log: (...args) => appendPlaygroundLine(consoleEl, 'log', args),
    warn: (...args) => appendPlaygroundLine(consoleEl, 'warn', args),
    error: (...args) => appendPlaygroundLine(consoleEl, 'error', args),
    info: (...args) => appendPlaygroundLine(consoleEl, 'info', args),
    table: (data) => appendPlaygroundTable(consoleEl, data)
  };

  try {
    const runner = new Function('console', `
      "use strict";
      try {
        ${code}
      } catch (err) {
        console.error(err.name + ": " + err.message);
      }
    `);
    runner(customConsole);
  } catch (err) {
    appendPlaygroundLine(consoleEl, 'error', [err.name + ": " + err.message]);
  }
}

function appendPlaygroundLine(container, type, args) {
  const line = document.createElement('div');
  line.className = `console-line ${type}`;

  const formattedArgs = args.map(arg => {
    if (typeof arg === 'object' && arg !== null) {
      try {
        return JSON.stringify(arg, null, 2);
      } catch (e) {
        return String(arg);
      }
    }
    return String(arg);
  }).join(' ');

  line.textContent = formattedArgs;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

function appendPlaygroundTable(container, data) {
  const line = document.createElement('div');
  line.className = 'console-line table';

  if (Array.isArray(data) || (typeof data === 'object' && data !== null)) {
    try {
      line.textContent = "📋 Table:\n" + JSON.stringify(data, null, 2);
    } catch (e) {
      line.textContent = String(data);
    }
  } else {
    line.textContent = String(data);
  }

  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}
