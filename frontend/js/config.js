const BASE_URL = 'http://localhost:4000';
const API = `${BASE_URL}/api`;

// ── Demo mode ────────────────────────────────────────────────────────
// Set to false to use the real backend (server/ directory).
const DEMO_MODE = false;

const DEMO_USERS = [
  { id: 1, full_name: 'Admin Demo',   email: 'admin@demo.com',  password: 'Admin@123', role: 'admin',  is_active: true },
  { id: 2, full_name: 'Jane Citizen', email: 'user@demo.com',   password: 'User@1234', role: 'user',   is_active: true },
];

const DEMO_DATA = {
  events: [
    { id: 1, title: 'City Council Open Day',      description: 'Meet your local councillors and ask questions about city planning, budgets, and services.', location: 'City Hall, Main St', starts_at: '2025-06-10T09:00:00Z', ends_at: '2025-06-10T17:00:00Z', published: true,  metadata: {} },
    { id: 2, title: 'Community Clean-Up Drive',   description: 'Join hundreds of volunteers for our annual neighbourhood clean-up. Gloves and bags provided.', location: 'Central Park',      starts_at: '2025-06-15T08:00:00Z', ends_at: '2025-06-15T13:00:00Z', published: true,  metadata: {} },
    { id: 3, title: 'Youth Sports Festival',      description: 'A full day of football, basketball, and athletics for ages 8–18. Free entry for all participants.', location: 'Sports Complex',    starts_at: '2025-07-04T10:00:00Z', ends_at: '2025-07-04T18:00:00Z', published: true,  metadata: {} },
    { id: 4, title: 'Public Budget Consultation', description: 'Have your say on how the city spends its budget next year. All residents welcome.', location: 'Community Centre',  starts_at: '2025-07-20T14:00:00Z', ends_at: '2025-07-20T16:00:00Z', published: true,  metadata: {} },
    { id: 5, title: 'Draft: Tech Summit 2025',    description: 'Annual technology and innovation summit. (Draft — not yet published.)',                          location: 'Convention Centre', starts_at: '2025-08-01T09:00:00Z', ends_at: '2025-08-01T17:00:00Z', published: false, metadata: {} },
  ],
  announcements: [
    { id: 1, title: 'Water Maintenance Notice',    duration_seconds: 62,  published: true,  created_at: '2025-05-01T10:00:00Z', audio_url: null, transcript: 'Water supply will be interrupted on June 5th from 8am to 12pm in the downtown area for scheduled maintenance. Please store water in advance.' },
    { id: 2, title: 'Road Closure – Bridge St',    duration_seconds: 45,  published: true,  created_at: '2025-05-10T08:00:00Z', audio_url: null, transcript: 'Bridge Street will be closed to traffic from June 1st to June 30th due to resurfacing works. Please use alternative routes via Oak Avenue.' },
    { id: 3, title: 'New Recycling Guidelines',    duration_seconds: 90,  published: true,  created_at: '2025-05-15T09:00:00Z', audio_url: null, transcript: 'Starting July 1st, all households must separate glass, plastic, and paper into the new colour-coded bins provided by the city.' },
  ],
  promos: [
    { id: 1, title: 'Visit Our New Library',       description: 'The newly renovated Central Library is now open. Free membership for all residents — books, e-resources, and study spaces available.',  published: true,  video_url: null, caption_text: 'The Central Library is open Monday to Saturday, 9am to 8pm. Free membership available at the front desk.' },
    { id: 2, title: 'City Parks Summer Programme', description: 'Free outdoor fitness classes, movie nights, and family picnics every weekend this summer across all city parks.',                        published: true,  video_url: null, caption_text: 'Join us every Saturday and Sunday for free events in your local park. No registration required.' },
    { id: 3, title: 'Draft: Transit App Launch',   description: 'Upcoming promo for the new city transit mobile app. (Draft)',                                                                              published: false, video_url: null, caption_text: '' },
  ],
  registrations: [],
  notifications: [
    { id: 1, title: 'Welcome to CivicEvents!',  message: 'Thanks for joining. Browse upcoming events and register to attend.',          is_read: false, created_at: '2025-05-20T10:00:00Z', metadata: {} },
    { id: 2, title: 'New Event Added',          message: 'City Council Open Day has been added. Check it out and register your spot.',   is_read: false, created_at: '2025-05-21T09:00:00Z', metadata: { event_id: 1 } },
    { id: 3, title: 'Maintenance Reminder',     message: 'Water supply interruption scheduled for June 5th. See announcement for details.', is_read: true,  created_at: '2025-05-22T08:00:00Z', metadata: {} },
  ],
  feedback: [
    { id: 1, event_id: 1, user: { full_name: 'Jane Citizen' }, rating: 5, comment: 'Fantastic event, very well organised!', created_at: '2025-06-11T10:00:00Z' },
    { id: 2, event_id: 1, user: { full_name: 'Mark Osei'    }, rating: 4, comment: 'Great turnout. Would love more seating next time.', created_at: '2025-06-11T12:00:00Z' },
  ],
  users: [
    { id: 1, full_name: 'Admin Demo',    email: 'admin@demo.com', role: 'admin', is_active: true,  created_at: '2025-01-01T00:00:00Z' },
    { id: 2, full_name: 'Jane Citizen',  email: 'user@demo.com',  role: 'user',  is_active: true,  created_at: '2025-01-05T00:00:00Z' },
    { id: 3, full_name: 'Mark Osei',     email: 'mark@demo.com',  role: 'user',  is_active: true,  created_at: '2025-02-10T00:00:00Z' },
    { id: 4, full_name: 'Amara Diallo',  email: 'amara@demo.com', role: 'user',  is_active: false, created_at: '2025-03-01T00:00:00Z' },
  ],
  dashboard: {
    total_events: 5, total_promos: 3, total_service_requests: 12, pending_requests: 4,
    resolved: 8, users_count: 4, registrations_count: 7, unread_notifications: 2
  },
  activity: [
    { type: 'event',  title: 'City Council Open Day added',    created_at: '2025-05-18T10:00:00Z' },
    { type: 'promo',  title: 'Visit Our New Library published', created_at: '2025-05-17T14:00:00Z' },
    { type: 'event',  title: 'Youth Sports Festival added',    created_at: '2025-05-16T09:00:00Z' },
    { type: 'promo',  title: 'City Parks Summer Programme',    created_at: '2025-05-15T11:00:00Z' },
  ],
};

// ── Mock API handler ─────────────────────────────────────────────────
function mockApiRequest(method, endpoint, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // simulate network delay
      // AUTH
      if (endpoint === '/auth/login' && method === 'POST') {
        const u = DEMO_USERS.find(u => u.email === data.email && u.password === data.password);
        if (!u) return reject({ status: 401, message: 'Invalid email or password.' });
        const { password, ...user } = u;
        return resolve({ token: 'demo-token-' + u.id, user });
      }
      if ((endpoint === '/auth/register' || endpoint === '/auth/signup') && method === 'POST') {
        return resolve({ message: 'Registered successfully.' });
      }

      // EVENTS
      if (endpoint === '/events' && method === 'GET')  return resolve({ data: DEMO_DATA.events });
      if (endpoint.match(/^\/events\/\d+$/) && method === 'GET') {
        const e = DEMO_DATA.events.find(e => e.id === +endpoint.split('/')[2]);
        return e ? resolve({ data: e }) : reject({ status: 404, message: 'Event not found.' });
      }
      if (endpoint === '/events' && method === 'POST') {
        const e = { ...data, id: Date.now(), published: data.published === 'true' || data.published === true, metadata: {} };
        DEMO_DATA.events.push(e); return resolve({ data: e });
      }
      if (endpoint.match(/^\/events\/\d+$/) && method === 'PUT') {
        const i = DEMO_DATA.events.findIndex(e => e.id === +endpoint.split('/')[2]);
        if (i > -1) DEMO_DATA.events[i] = { ...DEMO_DATA.events[i], ...data };
        return resolve({ data: DEMO_DATA.events[i] });
      }
      if (endpoint.match(/^\/events\/\d+$/) && method === 'DELETE') {
        const i = DEMO_DATA.events.findIndex(e => e.id === +endpoint.split('/')[2]);
        if (i > -1) DEMO_DATA.events.splice(i, 1); return resolve({});
      }

      // EVENT FEEDBACK
      if (endpoint.match(/^\/events\/\d+\/feedback$/) && method === 'GET') {
        const eid = +endpoint.split('/')[2];
        return resolve({ data: DEMO_DATA.feedback.filter(f => f.event_id === eid) });
      }
      if (endpoint === '/event-feedback' && method === 'POST') {
        const f = { ...data, id: Date.now(), user: { full_name: getUser()?.full_name || 'You' }, created_at: new Date().toISOString() };
        DEMO_DATA.feedback.push(f); return resolve({ data: f });
      }

      // REGISTRATIONS
      if (endpoint === '/event-registrations/my-registrations' && method === 'GET') {
        const myRegs = DEMO_DATA.registrations.filter(r => r.user_id === getUser()?.id);
        const withEvents = myRegs.map(r => ({ ...r, event: DEMO_DATA.events.find(e => e.id === r.event_id) }));
        return resolve({ data: withEvents });
      }
      if (endpoint.match(/^\/event-registrations\/event\/\d+$/) && method === 'GET') {
        const eid = +endpoint.split('/')[3];
        return resolve({ data: DEMO_DATA.registrations.filter(r => r.event_id === eid).map(r => ({ ...r, user: DEMO_DATA.users.find(u => u.id === r.user_id) })) });
      }
      if (endpoint === '/event-registrations' && method === 'POST') {
        const exists = DEMO_DATA.registrations.find(r => r.event_id === +data.event_id && r.user_id === +data.user_id);
        if (exists) return reject({ status: 409, message: 'Already registered for this event.' });
        const r = { id: Date.now(), ...data, event_id: +data.event_id, user_id: +data.user_id, created_at: new Date().toISOString() };
        DEMO_DATA.registrations.push(r); return resolve({ data: r });
      }
      if (endpoint.match(/^\/event-registrations\/\d+$/) && method === 'DELETE') {
        const i = DEMO_DATA.registrations.findIndex(r => r.id === +endpoint.split('/')[2]);
        if (i > -1) DEMO_DATA.registrations.splice(i, 1); return resolve({});
      }

      // ANNOUNCEMENTS
      if (endpoint === '/announcements' && method === 'GET') return resolve({ data: DEMO_DATA.announcements });
      if (endpoint.match(/^\/announcements\/\d+$/) && method === 'GET') {
        const a = DEMO_DATA.announcements.find(a => a.id === +endpoint.split('/')[2]);
        return a ? resolve({ data: a }) : reject({ status: 404, message: 'Not found.' });
      }
      if (endpoint === '/announcements' && method === 'POST') {
        const a = { id: Date.now(), title: data.get ? data.get('title') : data.title, published: true, duration_seconds: 0, created_at: new Date().toISOString(), audio_url: null, transcript: data.get ? data.get('transcript') : '' };
        DEMO_DATA.announcements.push(a); return resolve({ data: a });
      }
      if (endpoint.match(/^\/announcements\/\d+$/) && (method === 'PUT' || method === 'DELETE')) {
        const i = DEMO_DATA.announcements.findIndex(a => a.id === +endpoint.split('/')[2]);
        if (method === 'DELETE' && i > -1) DEMO_DATA.announcements.splice(i, 1);
        return resolve({});
      }

      // PROMOS
      if (endpoint === '/promos' && method === 'GET') return resolve({ data: DEMO_DATA.promos });
      if (endpoint.match(/^\/promos\/\d+$/) && method === 'GET') {
        const p = DEMO_DATA.promos.find(p => p.id === +endpoint.split('/')[2]);
        return p ? resolve({ data: p }) : reject({ status: 404, message: 'Not found.' });
      }
      if (endpoint === '/promos' && method === 'POST') {
        const p = { id: Date.now(), title: data.get ? data.get('title') : data.title, description: '', published: false, video_url: null, caption_text: '', created_at: new Date().toISOString() };
        DEMO_DATA.promos.push(p); return resolve({ data: p });
      }
      if (endpoint.match(/^\/promos\/\d+$/) && (method === 'PUT' || method === 'DELETE')) {
        const i = DEMO_DATA.promos.findIndex(p => p.id === +endpoint.split('/')[2]);
        if (method === 'DELETE' && i > -1) DEMO_DATA.promos.splice(i, 1);
        return resolve({});
      }

      // NOTIFICATIONS
      if (endpoint === '/notifications' && method === 'GET')  return resolve({ data: DEMO_DATA.notifications });
      if (endpoint === '/notifications' && method === 'POST') {
        const n = { id: Date.now(), ...data, is_read: false, created_at: new Date().toISOString(), metadata: {} };
        DEMO_DATA.notifications.unshift(n); return resolve({ data: n });
      }
      if (endpoint.match(/^\/notifications\/\d+$/) && method === 'DELETE') {
        const i = DEMO_DATA.notifications.findIndex(n => n.id === +endpoint.split('/')[2]);
        if (i > -1) DEMO_DATA.notifications.splice(i, 1); return resolve({});
      }
      if (endpoint.match(/^\/notifications\/\d+$/) && (method === 'PATCH' || method === 'PUT')) {
        const n = DEMO_DATA.notifications.find(n => n.id === +endpoint.split('/')[2]);
        if (n) Object.assign(n, data); return resolve({ data: n });
      }

      // USERS
      if (endpoint === '/users' && method === 'GET') return resolve({ data: DEMO_DATA.users });
      if (endpoint.match(/^\/users\/\d+$/) && method === 'GET') {
        const u = DEMO_DATA.users.find(u => u.id === +endpoint.split('/')[2]);
        return u ? resolve({ data: u }) : reject({ status: 404, message: 'User not found.' });
      }
      if (endpoint.match(/^\/users\/\d+$/) && method === 'PUT') {
        const u = DEMO_DATA.users.find(u => u.id === +endpoint.split('/')[2]);
        if (u) { u.full_name = data.full_name || u.full_name; u.email = data.email || u.email; }
        return resolve({ data: u });
      }
      if (endpoint.match(/^\/users\/\d+\/(enable|disable)$/) && method === 'PATCH') {
        const parts = endpoint.split('/');
        const u = DEMO_DATA.users.find(u => u.id === +parts[2]);
        if (u) u.is_active = parts[3] === 'enable';
        return resolve({ data: u });
      }

      // DASHBOARD
      if (endpoint === '/dashboard/admin'    && method === 'GET') return resolve({ data: DEMO_DATA.dashboard });
      if (endpoint === '/dashboard/activity' && method === 'GET') return resolve({ data: DEMO_DATA.activity });

      // Fallback
      reject({ status: 404, message: `Mock: no handler for ${method} ${endpoint}` });
    }, 300);
  });
}
