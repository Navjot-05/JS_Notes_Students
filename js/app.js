/**
 * Main Application Logic for JavaScript Beginner Documentation
 * Handles theme toggling, doc rendering, live code runner, search, and progress tracking.
 */

// Application State
const state = {
  theme: localStorage.getItem('jsdocs_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  completedTopics: JSON.parse(localStorage.getItem('jsdocs_completed') || '[]'),
  currentView: 'docs', // 'docs', 'playground', 'quiz', 'cheatsheet'
  activeTopicId: null,
  codeOriginals: new Map() // Stores original code snippets for reset
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderSidebar();
  renderDocs();
  renderCheatSheet();
  updateProgressUI();
  setupSearch();
  setupViewTabs();
  setupMobileDrawer();

  // Handle URL hash if present
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    scrollToTopic(targetId);
  }
});

/* ==========================================================================
   Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.setAttribute('title', `Switch to ${state.theme === 'dark' ? 'Light' : 'Dark'} Theme`);
    themeBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('jsdocs_theme', state.theme);
  
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.setAttribute('title', `Switch to ${state.theme === 'dark' ? 'Light' : 'Dark'} Theme`);
  }
  showToast(`Switched to ${state.theme.toUpperCase()} theme`);
}

/* ==========================================================================
   Sidebar Navigation & Progress Tracking
   ========================================================================== */
function renderSidebar() {
  const sidebarNav = document.getElementById('sidebar-nav');
  if (!sidebarNav) return;

  // Group topics by category
  const categories = {};
  DOCS_DATA.forEach(topic => {
    if (!categories[topic.category]) {
      categories[topic.category] = [];
    }
    categories[topic.category].push(topic);
  });

  let html = '';
  for (const [catName, topics] of Object.entries(categories)) {
    html += `
      <div class="sidebar-category">
        <div class="sidebar-category-title">
          <span>${catName}</span>
          <span class="sidebar-category-count">${topics.length}</span>
        </div>
        <ul class="sidebar-nav-list">
    `;

    topics.forEach(topic => {
      const isCompleted = state.completedTopics.includes(topic.id);
      html += `
        <li class="sidebar-nav-item">
          <div class="sidebar-nav-link" data-topic-id="${topic.id}">
            <input type="checkbox" class="sidebar-item-checkbox" data-id="${topic.id}" ${isCompleted ? 'checked' : ''} title="Mark as learned">
            <span class="sidebar-link-content" onclick="navigateToTopic('${topic.id}')">
              ${topic.title}
            </span>
            <span class="sidebar-badge">${topic.badge}</span>
          </div>
        </li>
      `;
    });

    html += `
        </ul>
      </div>
    `;
  }

  sidebarNav.innerHTML = html;

  // Setup completion checkboxes
  sidebarNav.querySelectorAll('.sidebar-item-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const topicId = e.target.dataset.id;
      toggleTopicCompletion(topicId, e.target.checked);
    });
  });
}

function toggleTopicCompletion(topicId, isCompleted) {
  if (isCompleted) {
    if (!state.completedTopics.includes(topicId)) {
      state.completedTopics.push(topicId);
      showToast('🎉 Topic marked as completed!');
    }
  } else {
    state.completedTopics = state.completedTopics.filter(id => id !== topicId);
  }
  localStorage.setItem('jsdocs_completed', JSON.stringify(state.completedTopics));
  updateProgressUI();
}

function updateProgressUI() {
  const totalTopics = DOCS_DATA.length;
  const completedCount = state.completedTopics.length;
  const percentage = Math.round((completedCount / totalTopics) * 100);

  const fill = document.getElementById('progress-bar-fill');
  const countText = document.getElementById('progress-count-text');

  if (fill) fill.style.width = `${percentage}%`;
  if (countText) countText.textContent = `${completedCount} of ${totalTopics} completed (${percentage}%)`;
}

function resetProgress() {
  if (confirm('Reset your learning progress?')) {
    state.completedTopics = [];
    localStorage.removeItem('jsdocs_completed');
    renderSidebar();
    updateProgressUI();
    showToast('Learning progress reset');
  }
}

/* ==========================================================================
   Documentation Content Rendering
   ========================================================================== */
function renderDocs() {
  const docsContainer = document.getElementById('docs-content');
  if (!docsContainer) return;

  let html = '';

  DOCS_DATA.forEach((topic, topicIdx) => {
    html += `
      <section id="${topic.id}" class="topic-section">
        <div class="section-header">
          <span class="section-tag">${topic.category}</span>
          <h2 class="section-title">${topic.title}</h2>
          <p class="section-subtitle">${topic.subtitle}</p>
        </div>

        <div class="topic-overview">
          ${topic.overview}
        </div>
    `;

    // Render Subsections
    topic.sections.forEach((sec, secIdx) => {
      const codeId = `code-${topicIdx}-${secIdx}`;
      const consoleId = `console-${topicIdx}-${secIdx}`;

      if (sec.code) {
        state.codeOriginals.set(codeId, sec.code);
      }

      html += `
        <div class="doc-card" id="${sec.subId}">
          <div class="topic-header">
            <h3 class="topic-title">${sec.title}</h3>
          </div>

          <div class="topic-text">
            ${sec.content}
          </div>

          ${sec.callout ? `
            <div class="callout ${sec.callout.type}">
              <div class="callout-icon">${sec.callout.type === 'tip' ? '💡' : sec.callout.type === 'warning' ? '⚠️' : 'ℹ️'}</div>
              <div class="callout-body">
                <div class="callout-title">${sec.callout.title}</div>
                <div>${sec.callout.text}</div>
              </div>
            </div>
          ` : ''}

          ${sec.code ? `
            <div class="code-box">
              <div class="code-header">
                <div class="code-title">
                  <div class="code-dots">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                  </div>
                  <span>javascript</span>
                </div>
                <div class="code-actions">
                  <button class="code-btn" onclick="copySnippet('${codeId}')" title="Copy code">
                    📋 Copy
                  </button>
                  <button class="code-btn" onclick="resetSnippet('${codeId}')" title="Reset code">
                    ↺ Reset
                  </button>
                  ${sec.runnable ? `
                    <button class="code-btn btn-run" onclick="runSnippet('${codeId}', '${consoleId}')" title="Run code">
                      ▶ Run Code
                    </button>
                  ` : ''}
                </div>
              </div>

              <div class="code-wrapper">
                <textarea id="${codeId}" class="code-editor" spellcheck="false">${escapeHtml(sec.code)}</textarea>
              </div>

              ${sec.runnable ? `
                <div id="${consoleId}" class="console-box">
                  <div class="console-header">
                    <span>Console Output</span>
                    <button class="code-btn" style="padding: 0.1rem 0.4rem; font-size: 0.7rem;" onclick="clearConsole('${consoleId}')">Clear</button>
                  </div>
                  <div class="console-output"></div>
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;
    });

    // Render Student Challenge
    if (topic.challenge) {
      const challengeCodeId = `challenge-code-${topicIdx}`;
      state.codeOriginals.set(challengeCodeId, topic.challenge.solution);

      html += `
        <div class="challenge-box">
          <div class="challenge-title">
            <span>🎯</span>
            <span>${topic.challenge.title}</span>
          </div>
          <div class="challenge-desc">${topic.challenge.description}</div>
          <button class="challenge-toggle-solution" onclick="toggleChallengeSolution('solution-${topicIdx}')">
            💡 Click to Reveal Solution
          </button>
          <div id="solution-${topicIdx}" class="challenge-solution">
            <div class="code-box">
              <div class="code-header">
                <div class="code-title">Solution</div>
                <div class="code-actions">
                  <button class="code-btn" onclick="copySnippet('${challengeCodeId}')">📋 Copy</button>
                  <button class="code-btn btn-run" onclick="runSnippet('${challengeCodeId}', 'console-chal-${topicIdx}')">▶ Run</button>
                </div>
              </div>
              <textarea id="${challengeCodeId}" class="code-editor" spellcheck="false">${escapeHtml(topic.challenge.solution)}</textarea>
              <div id="console-chal-${topicIdx}" class="console-box">
                <div class="console-header"><span>Console Output</span></div>
                <div class="console-output"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    html += `</section>`;
  });

  docsContainer.innerHTML = html;

  // Auto-resize textareas to fit content
  document.querySelectorAll('.code-editor').forEach(textarea => {
    adjustTextareaHeight(textarea);
    textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
  });
}

function adjustTextareaHeight(el) {
  el.style.height = 'auto';
  el.style.height = (el.scrollHeight + 5) + 'px';
}

function toggleChallengeSolution(solutionId) {
  const el = document.getElementById(solutionId);
  if (!el) return;
  const isShown = el.classList.contains('show');
  if (isShown) {
    el.classList.remove('show');
  } else {
    el.classList.add('show');
    // adjust textarea height
    const textarea = el.querySelector('.code-editor');
    if (textarea) adjustTextareaHeight(textarea);
  }
}

/* ==========================================================================
   Interactive Safe Live Code Runner
   ========================================================================== */
function runSnippet(codeId, consoleId) {
  const textarea = document.getElementById(codeId);
  const consoleBox = document.getElementById(consoleId);
  if (!textarea || !consoleBox) return;

  const outputContainer = consoleBox.querySelector('.console-output');
  outputContainer.innerHTML = '';
  consoleBox.classList.add('visible');

  const code = textarea.value;

  // Intercept console functions safely
  const customConsole = {
    log: (...args) => appendConsoleLine(outputContainer, 'log', args),
    warn: (...args) => appendConsoleLine(outputContainer, 'warn', args),
    error: (...args) => appendConsoleLine(outputContainer, 'error', args),
    info: (...args) => appendConsoleLine(outputContainer, 'info', args),
    table: (data) => appendConsoleTable(outputContainer, data)
  };

  try {
    // Run inside an isolated function with overridden console
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
    appendConsoleLine(outputContainer, 'error', [err.name + ": " + err.message]);
  }
}

function clearConsole(consoleId) {
  const consoleBox = document.getElementById(consoleId);
  if (!consoleBox) return;
  const outputContainer = consoleBox.querySelector('.console-output');
  if (outputContainer) outputContainer.innerHTML = '';
}

function appendConsoleLine(container, type, args) {
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
}

function appendConsoleTable(container, data) {
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
}

function resetSnippet(codeId) {
  const textarea = document.getElementById(codeId);
  const original = state.codeOriginals.get(codeId);
  if (textarea && original !== undefined) {
    textarea.value = original;
    adjustTextareaHeight(textarea);
    showToast('Code reset to original');
  }
}

function copySnippet(codeId) {
  const textarea = document.getElementById(codeId);
  if (!textarea) return;

  navigator.clipboard.writeText(textarea.value).then(() => {
    showToast('📋 Code copied to clipboard!');
  }).catch(() => {
    textarea.select();
    document.execCommand('copy');
    showToast('📋 Code copied!');
  });
}

/* ==========================================================================
   Navigation & Scrollspy
   ========================================================================== */
function navigateToTopic(topicId) {
  switchView('docs');
  scrollToTopic(topicId);
  
  // Close mobile drawer if open
  const sidebar = document.getElementById('docs-sidebar');
  if (sidebar) sidebar.classList.remove('open');
}

function scrollToTopic(topicId) {
  const element = document.getElementById(topicId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateActiveSidebarLink(topicId);
  }
}

function updateActiveSidebarLink(topicId) {
  document.querySelectorAll('.sidebar-nav-link').forEach(link => {
    if (link.dataset.topicId === topicId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   Live Search
   ========================================================================== */
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length > 0) {
      if (searchClear) searchClear.style.display = 'block';
      performSearch(query);
    } else {
      if (searchClear) searchClear.style.display = 'none';
      clearSearch();
    }
  });

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.style.display = 'none';
      clearSearch();
      searchInput.focus();
    });
  }
}

function performSearch(query) {
  switchView('docs');

  let matchFound = false;
  DOCS_DATA.forEach(topic => {
    const topicEl = document.getElementById(topic.id);
    const sidebarLink = document.querySelector(`.sidebar-nav-link[data-topic-id="${topic.id}"]`);

    const matchesTopic = topic.title.toLowerCase().includes(query) ||
                         topic.subtitle.toLowerCase().includes(query) ||
                         topic.sections.some(s => s.title.toLowerCase().includes(query) || (s.code && s.code.toLowerCase().includes(query)));

    if (topicEl) {
      topicEl.style.display = matchesTopic ? 'block' : 'none';
    }
    if (sidebarLink && sidebarLink.parentElement) {
      sidebarLink.parentElement.style.display = matchesTopic ? 'block' : 'none';
    }

    if (matchesTopic && !matchFound) {
      matchFound = true;
      topicEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function clearSearch() {
  DOCS_DATA.forEach(topic => {
    const topicEl = document.getElementById(topic.id);
    const sidebarLink = document.querySelector(`.sidebar-nav-link[data-topic-id="${topic.id}"]`);
    if (topicEl) topicEl.style.display = 'block';
    if (sidebarLink && sidebarLink.parentElement) sidebarLink.parentElement.style.display = 'block';
  });
}

/* ==========================================================================
   View Switching (Docs, Playground, Quiz, Cheatsheet)
   ========================================================================== */
function setupViewTabs() {
  document.querySelectorAll('[data-view-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.dataset.viewTarget;
      switchView(targetView);
    });
  });
}

function switchView(viewName) {
  state.currentView = viewName;

  document.querySelectorAll('.view-container').forEach(view => {
    view.classList.remove('active-view');
  });

  document.querySelectorAll('[data-view-target]').forEach(btn => {
    if (btn.dataset.viewTarget === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const activeViewEl = document.getElementById(`view-${viewName}`);
  if (activeViewEl) {
    activeViewEl.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Hide or show sidebar depending on view
  const sidebar = document.getElementById('docs-sidebar');
  if (sidebar) {
    sidebar.style.display = viewName === 'docs' ? 'block' : 'none';
  }
}

/* ==========================================================================
   Cheat Sheet Rendering
   ========================================================================== */
function renderCheatSheet() {
  const container = document.getElementById('cheatsheet-content');
  if (!container) return;

  let html = '<div class="cheatsheet-grid">';
  CHEATSHEET_DATA.forEach(group => {
    html += `
      <div class="sheet-card">
        <h4 class="sheet-title">📌 ${group.category}</h4>
    `;

    group.items.forEach(item => {
      html += `
        <div class="sheet-item">
          <span class="sheet-code">${escapeHtml(item.code)}</span>
          <span class="sheet-desc">${item.desc}</span>
        </div>
      `;
    });

    html += `</div>`;
  });
  html += '</div>';

  container.innerHTML = html;
}

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function setupMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('docs-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }
}

/* ==========================================================================
   Toasts & Utilities
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}
