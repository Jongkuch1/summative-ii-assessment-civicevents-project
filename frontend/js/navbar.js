// Renders the top navbar into #navbar-container
let notifLastFocusedEl = null;

function renderNavbar() {
  const user = getUser();
  if (!user) return;
  const admin = user.role === 'admin';
  const initial = user.full_name[0].toUpperCase();
  const firstName = user.full_name.split(' ')[0];

  const html = `
  <nav class="app-nav bg-white border-b border-slate-200 shadow-sm" role="navigation" aria-label="Main navigation">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

      <!-- Logo -->
      <a href="${admin ? 'dashboard.html' : 'events.html'}" class="flex items-center gap-2 group">
        <div class="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3m4-3v3m4-3v3"/>
          </svg>
        </div>
        <span class="text-base font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight">CivicEvents</span>
      </a>

      <!-- Search (desktop) -->
      <form id="global-search-form" class="hidden md:flex items-center bg-slate-100 hover:bg-slate-200 transition rounded-xl px-3.5 py-2 gap-2 flex-1 max-w-xs mx-6" role="search">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input id="global-search" type="search" placeholder="Search events…" aria-label="Search events"
          class="bg-transparent text-slate-700 placeholder-slate-400 text-sm outline-none w-full"/>
      </form>

      <!-- Nav links (always visible) -->
      <div class="flex flex-wrap items-center gap-1 text-sm font-medium text-slate-600">
        <a href="events.html"           class="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">Events</a>
        <a href="announcements.html"    class="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">Announcements</a>
        <a href="promos.html"           class="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">Promos</a>
        <a href="service-requests.html" class="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">Service Requests</a>
        ${admin ? '<a href="dashboard.html" class="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">Dashboard</a>' : ''}

        <!-- Notification bell -->
        <button id="notif-bell" aria-label="Notifications" aria-expanded="false" aria-haspopup="dialog" class="relative p-2 rounded-lg text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span id="notif-count" class="hidden absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-xs rounded-full notif-badge flex items-center justify-center font-bold">0</span>
        </button>

        <!-- Profile dropdown -->
        <div class="relative ml-1">
          <button id="profile-btn" aria-haspopup="true" aria-expanded="false"
            class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition text-slate-700">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">${initial}</div>
            <span class="hidden md:inline text-sm font-semibold">${firstName}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="profile-menu" class="hidden absolute right-0 mt-2 w-48 bg-white text-slate-700 rounded-2xl shadow-xl border border-slate-100 z-50 py-2 text-sm overflow-hidden">
            <div class="px-4 py-2.5 border-b border-slate-100 mb-1">
              <p class="font-bold text-slate-800 text-xs truncate">${user.full_name}</p>
              <p class="text-slate-400 text-xs truncate">${user.email}</p>
            </div>
            <a href="profile.html"          class="flex items-center gap-2.5 px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              My Profile
            </a>
            <a href="my-registrations.html" class="flex items-center gap-2.5 px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              My Registrations
            </a>
            <hr class="my-1 border-slate-100"/>
            <button id="logout-btn" class="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-rose-50 text-rose-600 hover:text-rose-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Logout
            </button>
          </div>
        </div>
      </div>

    </div>
  </nav>

  <!-- Notification Drawer -->
  <div id="notif-drawer" class="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform translate-x-full overflow-y-auto border-l border-slate-100" role="dialog" aria-label="Notifications panel" aria-modal="true" aria-hidden="true">
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </div>
        <h2 class="font-bold text-slate-800 text-sm">Notifications</h2>
      </div>
      <button id="close-drawer" aria-label="Close notifications" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div id="notif-list" class="p-4 space-y-2.5 text-sm text-slate-600">Loading…</div>
  </div>
  <div id="drawer-overlay" class="hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"></div>`;

  $('#navbar-container').html(html);

  // Profile dropdown toggle
  $('#profile-btn').on('click', function() {
    const open = $('#profile-menu').toggleClass('hidden').hasClass('hidden');
    $(this).attr('aria-expanded', !open);
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#profile-btn, #profile-menu').length) {
      $('#profile-menu').addClass('hidden');
    }
  });

  // Logout
  $('#logout-btn').on('click', function() {
    clearAuth();
    window.location.href = 'login.html';
  });

  // Notification bell
  $('#notif-bell').on('click', function() {
    notifLastFocusedEl = document.activeElement;
    $('#notif-bell').attr('aria-expanded', 'true');
    $('#notif-drawer').removeClass('translate-x-full').attr('aria-hidden', 'false');
    $('#drawer-overlay').removeClass('hidden');
    loadNotifications();
    setTimeout(() => $('#close-drawer').trigger('focus'), 50);
  });
  function closeDrawer() {
    $('#notif-bell').attr('aria-expanded', 'false');
    $('#notif-drawer').addClass('translate-x-full').attr('aria-hidden', 'true');
    $('#drawer-overlay').addClass('hidden');
    if (notifLastFocusedEl && typeof notifLastFocusedEl.focus === 'function') {
      notifLastFocusedEl.focus();
    }
  }
  $('#close-drawer, #drawer-overlay').on('click', closeDrawer);

  // Focus trap inside notification drawer
  $('#notif-drawer').on('keydown', function(e) {
    if (e.key !== 'Tab') return;
    const focusable = $(this).find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');
    if (!focusable.length) return;
    const first = focusable.first()[0];
    const last = focusable.last()[0];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Esc closes the drawer for keyboard users.
  $(document).on('keydown.navdrawer', function(e) {
    if (e.key === 'Escape' && !$('#notif-drawer').hasClass('translate-x-full')) {
      $('#close-drawer').trigger('click');
    }
  });

  // Global search
  $('#global-search-form').on('submit', function(e) {
    e.preventDefault();
    const q = $(this).find('input[type="search"]').val().trim();
    if (q) window.location.href = `events.html?search=${encodeURIComponent(q)}`;
  });

  loadNotifCount();
}

function loadNotifCount() {
  apiRequest('GET', '/notifications').then(data => {
    const items = data.data || data || [];
    const unread = items.filter(n => !n.is_read).length;
    if (unread > 0) {
      $('#notif-count').text(unread).removeClass('hidden');
    }
  }).catch(() => {});
}

function loadNotifications() {
  $('#notif-list').html(
    Array(4).fill(`<div class="skeleton h-16 w-full rounded-xl"></div>`).join('')
  );
  apiRequest('GET', '/notifications').then(data => {
    const items = data.data || data || [];
    if (!items.length) {
      $('#notif-list').html(`
        <div class="text-center py-12">
          <div class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          </div>
          <p class="text-slate-400 text-sm font-medium">No notifications yet</p>
        </div>`);
      return;
    }
    const admin = isAdmin();
    const html = items.map(n => `
      <div class="rounded-xl p-3.5 border ${n.is_read ? 'bg-white border-slate-100' : 'bg-indigo-50 border-indigo-100'}" data-notif-id="${n.id}">
        <div class="flex justify-between items-start gap-2">
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-slate-800 text-xs leading-snug">${n.title}</p>
            <p class="text-slate-500 mt-1 text-xs leading-relaxed">${n.message}</p>
            <p class="text-xs text-slate-300 mt-1.5">${formatDate(n.created_at)}</p>
            <a href="notification-detail.html?id=${n.id}" class="inline-flex items-center gap-1 text-slate-600 text-xs hover:underline mt-1.5 font-medium">View details →</a>
            ${n.metadata?.event_id ? `<a href="event-detail.html?id=${n.metadata.event_id}" class="inline-flex items-center gap-1 text-indigo-600 text-xs hover:underline mt-1.5 font-medium">View Event →</a>` : ''}
            ${!n.is_read ? `<button class="mark-read block text-xs text-indigo-500 hover:text-indigo-700 mt-1.5 font-semibold" data-id="${n.id}">Mark as read</button>` : ''}
          </div>
          ${admin ? `<button class="delete-notif p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition shrink-0" data-id="${n.id}" aria-label="Delete notification">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>` : ''}
        </div>
      </div>`).join('');
    $('#notif-list').html(html);

    // Mark as read (optimistic UI)
    $('.mark-read').on('click', function() {
      const id = $(this).data('id');
      const card = $(this).closest('[data-notif-id]');
      card.removeClass('bg-indigo-50 border-indigo-100').addClass('bg-white border-slate-100');
      $(this).remove();
      const cur = parseInt($('#notif-count').text()) || 0;
      const next = cur - 1;
      if (next > 0) $('#notif-count').text(next);
      else { $('#notif-count').text('0').addClass('hidden'); }
      apiRequest('PATCH', `/notifications/${id}`, { is_read: true })
        .catch(() => apiRequest('PUT', `/notifications/${id}`, { is_read: true }).catch(() => {}));
    });

    // Delete notification (admin)
    $('.delete-notif').on('click', function() {
      const id = $(this).data('id');
      apiRequest('DELETE', `/notifications/${id}`).then(() => {
        $(this).closest('[data-notif-id]').slideUp(200, function() { $(this).remove(); });
        showToast('Notification deleted');
      }).catch(err => showToast(err.message, 'error'));
    });
  }).catch(() => {
    $('#notif-list').html('<p class="text-rose-500 text-xs text-center py-4">Failed to load notifications.</p>');
  });
}
