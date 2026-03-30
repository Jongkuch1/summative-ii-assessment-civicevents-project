# CivicEvents — Frontend

A civic engagement web platform that connects residents with their local government. Citizens can browse public events, listen to audio announcements, watch promotional videos, register for events, submit service requests, and leave feedback. Administrators have a dedicated dashboard with real-time charts to manage all content and users.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Default Credentials](#default-credentials)
5. [Project Structure](#project-structure)
6. [API Reference](#api-reference)
7. [Role-Based Access Control](#role-based-access-control)
8. [File Upload Limits](#file-upload-limits)
9. [Design System](#design-system)
10. [Demo Checklist](#demo-checklist)
11. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML5, Tailwind CSS (CDN), jQuery 3.7, Chart.js 4 |
| Backend | Node.js 18+, Express 4 |
| Database | PostgreSQL 15+ |
| Auth | JWT via jsonwebtoken, bcryptjs |
| Uploads | multer (images, audio, video) |

---

## Prerequisites

- **Node.js 18 or higher** — `node --version`
- **PostgreSQL 15+** — running locally on port 5432
- **npm** — bundled with Node.js
- A modern browser (Chrome 90+, Firefox 88+, Safari 15+, Edge 90+)

---

## Getting Started

### 1. Set up the database

Make sure PostgreSQL is running:

```bash
brew services start postgresql@16
```

Create the database and tables (first time only):

```bash
psql -U postgres -c "CREATE DATABASE \"civic-events-db\";"
psql -U postgres -d "civic-events-db" -f backend/migrations/001_create_tables.sql
```

### 2. Start the backend

```bash
cd backend
npm install
npm start
```

Expected output:

```text
CivicEvents+ backend listening on port 4000
Connected to PostgreSQL
```

### 3. Open the frontend

Open `frontend/pages/login.html` in your browser:

```bash
open frontend/pages/login.html
```

Or use VS Code Live Server — right-click `login.html` and select **Open with Live Server**.

### 4. Verify the connection

Sign in with the admin credentials below. If the dashboard loads with stats and both charts render, the backend is connected correctly.

---

## Default Credentials

| Role | Email | Password |
| --- | --- | --- |
| Admin | `jongkuch123@gmail.com` | `Password123@` |

New accounts can be created from the Sign Up page.

**Password policy** (enforced on both frontend and backend):

- Minimum 8 characters
- At least one uppercase letter (A–Z)
- At least one lowercase letter (a–z)
- At least one digit (0–9)
- At least one special character (`!@#$%^&*`)

---

## Project Structure

```text
civic-events/
├── backend/                         # Express API (do not modify)
│   ├── server.js
│   ├── app.js
│   ├── .env
│   ├── migrations/
│   │   └── 001_create_tables.sql
│   └── src/
│       ├── config/db.js
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
│
└── frontend/                        # Your frontend (this folder)
    ├── index.html                   # Public landing page
    ├── README.md                    # This file
    ├── css/
    │   └── style.css                # Design system: variables, animations
    ├── js/
    │   ├── config.js                # BASE_URL = http://localhost:4000
    │   ├── utils.js                 # Auth helpers, apiRequest(), toasts, modals
    │   └── navbar.js                # Shared navbar, notification drawer
    └── pages/
        ├── login.html               # Login (remember-me, password toggle)
        ├── signup.html              # Signup (password strength meter)
        ├── events.html              # Event list — search, filter, pagination
        ├── event-detail.html        # Detail, register, feedback
        ├── event-form.html          # Admin: create/edit event + image upload
        ├── announcements.html       # Announcement list
        ├── announcement-detail.html # Audio player + transcript
        ├── announcement-form.html   # Admin: create/edit + audio upload
        ├── promos.html              # Promo list
        ├── promo-detail.html        # Video player + captions
        ├── promo-form.html          # Admin: create/edit + video upload (100 MB)
        ├── service-requests.html    # List with status filter
        ├── service-request-form.html# Submit service request
        ├── service-request-detail.html # Detail + admin status update
        ├── dashboard.html           # Admin: stat cards + charts + activity feed
        ├── users.html               # Admin: user list + enable/disable
        ├── notification-form.html   # Admin: broadcast + manage notifications
        ├── notification-detail.html # Notification detail
        ├── my-registrations.html    # My event registrations
        └── profile.html             # Edit profile + change password
```

---

## API Reference

**Base URL:** `http://localhost:4000/api`

All protected routes require:

```http
Authorization: Bearer <jwt_token>
```

### Authentication

| Method | Endpoint | Auth | Body |
| --- | --- | --- | --- |
| POST | `/auth/signup` | Public | `{ full_name, email, password }` |
| POST | `/auth/login` | Public | `{ email, password }` |

### Events

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/events` | User | List events (admin sees drafts too) |
| POST | `/events` | Admin | Create — `multipart/form-data` with `image` field |
| GET | `/events/:id` | User | Single event |
| PUT | `/events/:id` | Admin | Update |
| DELETE | `/events/:id` | Admin | Delete |
| GET | `/events/:id/feedback` | User | Feedback list |
| POST | `/event-feedback` | User | Submit feedback |

### Event Registrations

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/event-registrations` | User | Register: `{ user_id, event_id }` |
| GET | `/event-registrations/my-registrations` | User | My registrations |
| GET | `/event-registrations/event/:id` | Admin | All registrants for an event |
| DELETE | `/event-registrations/:id` | User | Cancel registration |

### Announcements

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/announcements` | User | List |
| POST | `/announcements` | Admin | Create — `multipart/form-data` with `audio` field |
| GET | `/announcements/:id` | User | Single announcement |
| PUT | `/announcements/:id` | Admin | Update |
| DELETE | `/announcements/:id` | Admin | Delete |

### Promos

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/promos` | User | List |
| POST | `/promos` | Admin | Create — `multipart/form-data` with `video` field |
| GET | `/promos/:id` | User | Single promo |
| PUT | `/promos/:id` | Admin | Update |
| DELETE | `/promos/:id` | Admin | Delete |

### Notifications

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/notifications` | User | List notifications |
| POST | `/notifications` | Admin | Broadcast `{ title, message }` |
| PATCH | `/notifications/:id` | User | Mark as read `{ is_read: true }` |
| DELETE | `/notifications/:id` | Admin | Delete |

### Service Requests

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/service-requests` | User/Admin | List (own or all) |
| POST | `/service-requests` | User | Submit `{ title, category, description }` |
| GET | `/service-requests/:id` | User/Admin | Single request |
| PATCH | `/service-requests/:id` | Admin | Update status |
| DELETE | `/service-requests/:id` | User/Admin | Delete |

### Users

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/users` | Admin | List all users |
| GET | `/users/:id` | User/Admin | Profile |
| PUT | `/users/:id` | User/Admin | Update `{ full_name, email }` |
| PATCH | `/users/:id/enable` | Admin | Enable account |
| PATCH | `/users/:id/disable` | Admin | Disable account |

### Dashboard

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/dashboard/admin` | Admin | Stats: users, events, promos, registrations, feedback |

---

## Role-Based Access Control

| Feature | User | Admin |
| --- | :---: | :---: |
| Browse published events, announcements, promos | ✅ | ✅ |
| View unpublished (draft) content | — | ✅ |
| Register / cancel event registration | ✅ | — |
| Submit event feedback (once per event) | ✅ | — |
| Submit service requests | ✅ | ✅ |
| Create / edit / delete content | — | ✅ |
| Upload images, audio, video | — | ✅ |
| View all users | — | ✅ |
| Enable / disable user accounts | — | ✅ |
| Broadcast notifications | — | ✅ |
| View admin dashboard + charts | — | ✅ |
| Edit own profile + change password | ✅ | ✅ |

**How guards are enforced:**

- **Backend:** Every protected route uses `authenticate` middleware (verifies JWT). Admin routes use `authorize(['admin'])` middleware.
- **Frontend:** Every authenticated page calls `requireAuth()` on load. Admin pages also call `requireAdmin()`. UI elements (edit/delete buttons, admin sidebar) are conditionally shown using `isAdmin()`.

---

## File Upload Limits

| Content | Field | Max Size | Formats |
| --- | --- | --- | --- |
| Event image | `image` | 5 MB | JPEG, PNG, WebP |
| Announcement audio | `audio` | 20 MB | MP3, OGG, WAV, M4A |
| Promo video | `video` | 100 MB | MP4, WebM, MOV |

Uploaded files are served from `backend/uploads/` at `http://localhost:4000/uploads/`.

---

## Design System

Custom CSS variables defined in `css/style.css`:

| Token | Value | Usage |
| --- | --- | --- |
| `--civic-indigo` | `#4f46e5` | Primary actions, links |
| `--civic-violet` | `#7c3aed` | Gradient accent |
| `--civic-sky` | `#0ea5e9` | Secondary highlights |
| `--civic-slate` | `#1e293b` | Body text |

Key utility classes:

| Class | Description |
| --- | --- |
| `.btn-gradient` | Indigo→Violet gradient button |
| `.skeleton` | Shimmer loading placeholder |
| `.civic-toast` | Stacked dismissible toast notification |
| `.app-nav` | Sticky white navbar for inner pages |

---

## Demo Checklist

Use this before recording your demo video:

- [ ] Sign up as a new user; verify password strength meter and policy enforcement
- [ ] Log in (admin) — dashboard loads with real stats and both charts
- [ ] Log in (user) — redirected to events page
- [ ] Events: admin creates event with image upload; user registers and cancels
- [ ] Event feedback: user submits rating; duplicate blocked on second attempt
- [ ] Announcements: admin uploads audio; user plays it and sees duration
- [ ] Promos: admin uploads video; user plays it with captions
- [ ] Service requests: user submits; admin updates status
- [ ] Notifications: admin broadcasts; user sees badge, opens drawer, marks as read
- [ ] Profile: update name/email; change password
- [ ] User management: admin enables/disables a user
- [ ] Responsive layout shown on mobile width
- [ ] Keyboard navigation works on major pages

---

## Troubleshooting

### Backend fails to start

Check PostgreSQL is running:

```bash
brew services list | grep postgresql
```

If not running:

```bash
brew services start postgresql@16
```

### Port already in use

```bash
lsof -i :4000
kill -9 <PID>
```

### Frontend shows "Unable to connect to server"

- Confirm backend is running on port 4000
- Check `js/config.js` — `BASE_URL` must be `http://localhost:4000`

### Login works but protected requests fail

- Check browser localStorage for `token` and `user` keys
- If token expired, log out and log in again

### Media not loading

- Confirm files exist under `backend/uploads/`
- Verify the URL: `http://localhost:4000/uploads/events/<filename>`
