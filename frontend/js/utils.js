// Auth helpers
function getToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

function getUser() {
  const u = localStorage.getItem('user') || sessionStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}

function saveAuth(token, user, persistent) {
  const store = persistent ? localStorage : sessionStorage;
  store.setItem('token', token);
  store.setItem('user', JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

function isAdmin() {
  const u = getUser();
  return u && u.role === 'admin';
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = 'pages/login.html';
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!isAdmin()) {
    window.location.href = 'pages/events.html';
    return false;
  }
  return true;
}

function getLoginPath() {
  // Support both root-level pages (index.html) and nested /pages/*.html files
  return window.location.pathname.includes('/pages/') ? 'login.html' : 'pages/login.html';
}

// API request helper
function apiRequest(method, endpoint, data, isFormData) {
  const token = getToken();
  const opts = {
    method,
    headers: {}
  };
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (data && !isFormData) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  } else if (isFormData) {
    opts.body = data;
  }
  return fetch(`${API}${endpoint}`, opts).then(async res => {
    const json = await res.json().catch(() => ({}));

    if (res.status === 401) {
      clearAuth();
      showToast('Session expired. Please login again.', 'error');
      setTimeout(() => window.location.href = getLoginPath(), 1500);
      throw new Error('Unauthorized');
    }

    if (res.status === 403) {
      const msg = json.message || 'You do not have permission to perform this action.';
      throw { status: 403, message: msg };
    }

    if (!res.ok) throw { status: res.status, message: json.message || 'Request failed' };
    return json;
  }).catch(err => {
    // Network error (server offline) — err.status is undefined
    if (err.status === undefined && !(err.message === 'Unauthorized')) {
      throw { message: 'Unable to connect to the server. Please check your connection or contact support.' };
    }
    throw err;
  });
}

// Generic retry wrapper for high-value actions/loaders.
function withRetry(fn, retries = 1, delayMs = 500) {
  return fn().catch(err => {
    if (retries <= 0) throw err;
    return new Promise(resolve => setTimeout(resolve, delayMs)).then(() =>
      withRetry(fn, retries - 1, delayMs)
    );
  });
}

// ── Splash screen helpers ────────────────────────────────────────────
function showSplash() {
  if ($('#civic-splash').length) return;
  $('body').prepend(`
    <div id="civic-splash" role="status" aria-label="Loading CivicEvents">
      <div class="splash-logo" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3m4-3v3m4-3v3"/></svg>
      </div>
      <p class="text-white font-bold text-lg tracking-wide">CivicEvents</p>
      <div class="splash-bar"><div class="splash-bar-fill"></div></div>
    </div>`);
}
function hideSplash() {
  $('#civic-splash').addClass('splash-hide');
  setTimeout(() => $('#civic-splash').remove(), 450);
}

// ── Stacked toast system ───────────────────────────────────────────
function showToast(msg, type = 'success') {
  const cfg = {
    success: { bg: 'bg-green-600', icon: '' },
    error:   { bg: 'bg-red-600',   icon: '' },
    info:    { bg: 'bg-blue-600',  icon: '' },
  };
  const { bg, icon } = cfg[type] || cfg.info;

  if (!$('#toast-stack').length) $('body').append('<div id="toast-stack"></div>');

  const id = 'toast-' + Date.now();
  const toast = $(`
    <div id="${id}" class="civic-toast ${bg}" role="alert" aria-live="assertive">
      <span class="toast-icon" aria-hidden="true">${icon}</span>
      <span class="flex-1">${msg}</span>
      <button class="toast-close" aria-label="Dismiss notification">✕</button>
    </div>`);

  $('#toast-stack').append(toast);

  const dismiss = () => {
    toast.addClass('toast-out');
    setTimeout(() => toast.remove(), 320);
  };
  toast.find('.toast-close').on('click', dismiss);
  setTimeout(dismiss, 4000);
}

// ── Custom confirm modal ───────────────────────────────────────────
function confirmModal(message, confirmText = 'Delete', cancelText = 'Cancel') {
  return new Promise(resolve => {
    const id = 'confirm-modal-' + Date.now();
    const modal = $(`
      <div id="${id}" class="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" id="${id}-backdrop"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-fade-in">
          <div class="flex items-start gap-4 mb-5">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            </div>
            <div>
              <h2 id="${id}-title" class="font-bold text-gray-800 text-base">Are you sure?</h2>
              <p class="text-sm text-gray-500 mt-1">${message} This action cannot be undone.</p>
            </div>
          </div>
          <div class="flex justify-end gap-3">
            <button id="${id}-cancel" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition">${cancelText}</button>
            <button id="${id}-confirm" class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition">${confirmText}</button>
          </div>
        </div>
      </div>`);
    $('body').append(modal);
    const lastFocused = document.activeElement;
    setTimeout(() => $(`#${id}-confirm`).trigger('focus'), 50);

    const close = (result) => {
      modal.remove();
      if (lastFocused && lastFocused.focus) lastFocused.focus();
      resolve(result);
    };

    $(`#${id}-confirm`).on('click', () => close(true));
    $(`#${id}-cancel, #${id}-backdrop`).on('click', () => close(false));
    modal.on('keydown', e => {
      if (e.key === 'Escape') close(false);
      if (e.key === 'Tab') {
        const focusable = modal.find('button');
        const first = focusable.first()[0], last = focusable.last()[0];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  });
}

// ── Skeleton loaders ───────────────────────────────────────────────
function skeletonCard(count = 3) {
  return Array(count).fill(`
    <div class="bg-white rounded-xl shadow overflow-hidden flex flex-col">
      <div class="skeleton h-40 w-full rounded-none"></div>
      <div class="p-4 space-y-3">
        <div class="skeleton h-4 w-3/4"></div>
        <div class="skeleton h-3 w-1/2"></div>
        <div class="skeleton h-3 w-full"></div>
        <div class="flex gap-2 mt-2">
          <div class="skeleton h-7 w-16 rounded-lg"></div>
          <div class="skeleton h-7 w-16 rounded-lg"></div>
        </div>
      </div>
    </div>`).join('');
}

function skeletonList(count = 4) {
  return Array(count).fill(`
    <div class="bg-white rounded-xl shadow p-5 flex gap-4 items-center">
      <div class="skeleton h-10 w-10 rounded-full shrink-0"></div>
      <div class="flex-1 space-y-2">
        <div class="skeleton h-4 w-2/3"></div>
        <div class="skeleton h-3 w-1/3"></div>
      </div>
    </div>`).join('');
}

function formatDate(d) {
  return d ? new Date(d).toLocaleString() : '—';
}

function formatDateShort(d) {
  return d ? new Date(d).toLocaleDateString() : '—';
}

function formatDuration(seconds) {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// Inject footer into #footer-container if present
function renderFooter() {
  const el = document.getElementById('footer-container');
  if (!el) return;
  // mt-auto on the container itself (direct flex child of body) pushes footer to page bottom
  el.classList.add('mt-auto');
  el.innerHTML = `
  <footer class="bg-slate-50 border-t border-slate-200 text-slate-500 text-sm mt-auto" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">

      <!-- Col 1: Brand -->
      <div>
        <div class="flex items-center gap-2 mb-3">
          <div class="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3m4-3v3m4-3v3"/></svg>
          </div>
          <span class="text-slate-800 font-extrabold text-sm tracking-tight">CivicEvents</span>
        </div>
        <p class="text-slate-400 text-xs leading-relaxed">Your city's hub for events, announcements, public services, and civic engagement. Accessible by design.</p>
      </div>

      <!-- Col 2: Explore -->
      <div>
        <p class="text-slate-700 font-bold mb-3 text-xs uppercase tracking-wider">Explore</p>
        <ul class="space-y-2 text-xs">
          <li><a href="events.html"        class="hover:text-indigo-600 transition">Events</a></li>
          <li><a href="announcements.html" class="hover:text-indigo-600 transition">Announcements</a></li>
          <li><a href="promos.html"        class="hover:text-indigo-600 transition">Promos</a></li>
          <li><a href="service-requests.html" class="hover:text-indigo-600 transition">Service Requests</a></li>
        </ul>
      </div>

      <!-- Col 3: Help & Contact -->
      <div>
        <p class="text-slate-700 font-bold mb-3 text-xs uppercase tracking-wider">Help & Contact</p>
        <ul class="space-y-2 text-xs">
          <li><a href="mailto:help@civicevents.city" class="hover:text-indigo-600 transition">help@civicevents.city</a></li>
          <li><a href="tel:+250794411361"            class="hover:text-indigo-600 transition">+250 794 411 361</a></li>
          <li><a href="#"                            class="hover:text-indigo-600 transition">Privacy Policy</a></li>
          <li><a href="#"                            class="hover:text-indigo-600 transition">Accessibility Statement</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-200 text-center text-xs text-slate-400 py-4">
      © ${new Date().getFullYear()} CivicEvents · Built with care for the community
    </div>
  </footer>`;
}
