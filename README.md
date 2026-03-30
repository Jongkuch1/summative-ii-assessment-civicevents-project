# CivicEvents+

CivicEvents+ is a full-stack civic engagement platform that connects residents with their local government. Citizens can browse and register for public events, read announcements, submit service requests, and manage their profiles. Administrators get a dedicated dashboard with analytics, user management, and content control tools.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Frontend Pages](#frontend-pages)
- [Authentication & Roles](#authentication--roles)
- [File Uploads](#file-uploads)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **User authentication** — JWT-based login/signup with bcrypt password hashing
- **Role-based access control** — Separate citizen and admin roles with protected routes
- **Events** — Browse, view details, register, and submit feedback on civic events
- **Announcements** — Admin-published notices with detail pages for citizens
- **Promos** — Create and publish promotional content with media attachments
- **Notifications** — System notifications with detail view
- **Service Requests** — Citizens submit requests; admins review and manage them
- **File uploads** — Image, audio, and video support via multer
- **Admin Dashboard** — Analytics, charts, user management, and content moderation
- **Email support** — Nodemailer integration for transactional emails
- **Postman Collection** — Included for API testing (`CivicEvents+ API.postman_collection.json`)

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | HTML5, CSS3, JavaScript (ES6+), jQuery, Chart.js |
| Backend     | Node.js (ESM), Express.js v5                    |
| Database    | PostgreSQL 15+                                  |
| Auth        | JSON Web Tokens (JWT), bcrypt                   |
| Validation  | express-validator                               |
| File Uploads| multer                                          |
| Email       | nodemailer                                      |
| Logging     | morgan                                          |
| Dev         | nodemon, cross-env                              |

---

## Project Structure

```text
civic-events/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # PostgreSQL pool (reads from .env)
│   │   ├── controllers/               # Request/response handlers per resource
│   │   ├── middlewares/               # Auth, error handling, validation middleware
│   │   ├── models/                    # Database query functions
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── events.routes.js
│   │   │   ├── eventRegistrations.routes.js
│   │   │   ├── eventFeedback.routes.js
│   │   │   ├── announcements.routes.js
│   │   │   ├── promos.routes.js
│   │   │   ├── notifications.routes.js
│   │   │   ├── users.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── index.routes.js        # Route aggregator
│   │   ├── services/                  # Business logic layer
│   │   └── utils/                     # Helper utilities
│   ├── migrations/
│   │   ├── 001_create_tables.sql      # Schema creation
│   │   └── 002_seed_data.sql          # Optional seed data
│   ├── uploads/                       # Persisted uploaded files
│   ├── app.js                         # Express app setup
│   ├── server.js                      # Server entry point
│   ├── package.json
│   └── CivicEvents+ API.postman_collection.json
└── frontend/
    ├── index.html                     # Landing / home page
    ├── css/                           # Stylesheets
    ├── js/
    │   ├── config.js                  # API base URL config
    │   ├── navbar.js                  # Shared navigation logic
    │   └── utils.js                   # Shared helper functions
    └── pages/
        ├── login.html
        ├── signup.html
        ├── events.html
        ├── event-detail.html
        ├── event-form.html
        ├── announcements.html
        ├── announcement-detail.html
        ├── announcement-form.html
        ├── promos.html
        ├── promo-detail.html
        ├── promo-form.html
        ├── notifications.html
        ├── notification-detail.html
        ├── notification-form.html
        ├── service-requests.html
        ├── service-request-detail.html
        ├── service-request-form.html
        ├── my-registrations.html
        ├── profile.html
        ├── users.html
        ├── user-detail.html
        └── dashboard.html
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v15 or higher
- npm v9+

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=civic_events_db
DB_PASS=your_postgres_password
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (optional — for nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password

# Server
PORT=3000
```

> Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Jongkuch1/summative-ii-assessment-civicevents-project.git
cd summative-ii-assessment-civicevents-project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file as described in [Environment Variables](#environment-variables).

### 3. Database Setup

Create the PostgreSQL database:

```bash
createdb civic_events_db
```

Run the schema migration:

```bash
npm run db:setup
```

Optionally seed with sample data:

```bash
npm run db:seed
```

Or run both at once:

```bash
npm run db:reset
```

### 4. Start the Backend

**Development (auto-reload with nodemon):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The API will be available at `http://localhost:3000` (or the `PORT` set in `.env`).

### 5. Frontend Setup

No build step is required. Open `frontend/index.html` directly in your browser, or serve it with a static file server:

```bash
# Using the VS Code Live Server extension, or:
npx serve frontend
```

If your backend runs on a port other than `3000`, update the API base URL in [frontend/js/config.js](frontend/js/config.js).

---

## Available Scripts

All scripts are run from the `backend/` directory:

| Script          | Description                                      |
|-----------------|--------------------------------------------------|
| `npm start`     | Start the server in production mode              |
| `npm run dev`   | Start the server with nodemon (hot reload)       |
| `npm run db:setup` | Run schema migration (`001_create_tables.sql`) |
| `npm run db:seed`  | Run seed data migration (`002_seed_data.sql`)  |
| `npm run db:reset` | Run both setup and seed in sequence            |

---

## API Overview

All API routes are prefixed with `/api`. A full Postman collection is included at `backend/CivicEvents+ API.postman_collection.json` — import it into Postman to explore and test every endpoint.

| Resource              | Base Route                     |
|-----------------------|--------------------------------|
| Authentication        | `/api/auth`                    |
| Events                | `/api/events`                  |
| Event Registrations   | `/api/event-registrations`     |
| Event Feedback        | `/api/event-feedback`          |
| Announcements         | `/api/announcements`           |
| Promos                | `/api/promos`                  |
| Notifications         | `/api/notifications`           |
| Service Requests      | `/api/service-requests`        |
| Users                 | `/api/users`                   |
| Dashboard / Analytics | `/api/dashboard`               |

---

## Frontend Pages

| Page                         | Description                                         |
|------------------------------|-----------------------------------------------------|
| `index.html`                 | Home / landing page                                 |
| `pages/login.html`           | User login                                          |
| `pages/signup.html`          | New user registration                               |
| `pages/events.html`          | Browse all civic events                             |
| `pages/event-detail.html`    | Event details and registration                      |
| `pages/event-form.html`      | Create / edit an event (admin)                      |
| `pages/announcements.html`   | Browse announcements                                |
| `pages/announcement-form.html` | Create / edit an announcement (admin)             |
| `pages/promos.html`          | Browse promotional content                          |
| `pages/promo-form.html`      | Create / edit a promo (admin)                       |
| `pages/service-requests.html`| View submitted service requests                     |
| `pages/service-request-form.html` | Submit a new service request (citizen)         |
| `pages/my-registrations.html`| View your event registrations                       |
| `pages/profile.html`         | View and edit your profile                          |
| `pages/users.html`           | User management list (admin)                        |
| `pages/dashboard.html`       | Admin analytics dashboard                           |

---

## Authentication & Roles

Authentication uses **JWT** tokens sent via the `Authorization: Bearer <token>` header.

| Role    | Permissions                                                                 |
|---------|-----------------------------------------------------------------------------|
| Citizen | Register, log in, view/register for events, submit service requests, manage own profile |
| Admin   | All citizen permissions + create/edit/delete events, announcements, promos, notifications, manage users, view dashboard analytics |

Tokens are validated by the auth middleware on all protected routes. Role checks are enforced per route.

---

## File Uploads

Uploaded files (images, audio, video) are handled by **multer** and stored in `backend/uploads/`. Uploaded file paths are saved to the database and served statically by Express.

Supported types: images (JPEG, PNG, GIF, WebP), audio (MP3, WAV), video (MP4, WebM).

---

## Database

The schema is defined in `backend/migrations/001_create_tables.sql`. Key tables include:

- `users` — citizen and admin accounts
- `events` — civic events with date, location, and media
- `event_registrations` — user-event registration records
- `event_feedback` — post-event ratings and comments
- `announcements` — admin-published notices
- `promos` — promotional content with media
- `notifications` — system notifications
- `service_requests` — citizen-submitted service requests

Connection pooling is managed by the `pg` library. Configuration is read entirely from environment variables — no hardcoded credentials.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

Please keep PRs focused and include a clear description of the change and its motivation.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

Maintainer: [Jongkuch1](https://github.com/Jongkuch1)
For questions, bugs, or feature requests, please [open an issue](https://github.com/summative-ii-assessment-civicevents-project-Jongkuch1
).
