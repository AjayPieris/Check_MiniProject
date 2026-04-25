<div align="center">

<img src="client/public/logo.png" alt="CeylonConnect Logo" width="120" />

# CeylonConnect

**Discover Sri Lanka — One Tour at a Time**

A full-stack tour booking platform that connects tourists with verified local guides across Sri Lanka. Built with a modern React frontend and a Node.js + Express backend, supporting both **MySQL** and **PostgreSQL** databases.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8%2B-4479A1?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Database Setup](#1-database-setup) · [API Reference](#-api-reference) · [Client Routes](#-client-routes) · [Environment Variables](#-environment-variables)

</div>

---

## 📖 Overview

**CeylonConnect** is a community-driven tour booking marketplace for Sri Lanka. Tourists can discover and book authentic local experiences, guides can manage their listings and get verified through an admin-reviewed badge system, and platform administrators oversee everything from a dedicated control panel — all with real-time messaging powered by Pusher and AI travel assistance via Google Gemini.

---

## ✨ Features

### 🧳 Tourists
- Browse and search tours by **location, category, district, and price**
- View rich tour pages with itinerary, guide info, gallery, and FAQs
- Book tours with group size and date selection
- Leave **star ratings and reviews**
- **Real-time chat** with guides (Pusher)
- Raise and track **booking disputes**
- Browse and RSVP to **cultural events**
- **AI travel assistant** powered by Google Gemini

### 🧭 Local Guides
- Create, edit, and delete **tour listings** with image uploads
- Manage bookings (confirm / cancel)
- Submit identity documents for **verified guide badge** approval
- Real-time messaging with tourists
- Public-facing **guide profile** page

### 🛡️ Administrators
- Full **user management** (view, block / unblock)
- Tour moderation
- **Badge verification** request review with document links
- **Dispute resolution** panel
- **Event management** (create, edit, delete)
- Platform-wide **in-app notification** system

---

## 🛠 Tech Stack

| Layer          | Technology                                              |
| -------------- | ------------------------------------------------------- |
| **Frontend**   | React 19, Vite 7, Tailwind CSS 3, React Router v7       |
| **Backend**    | Node.js ≥ 18, Express 5                                 |
| **Database**   | MySQL 8+ (`mysql2`) **or** PostgreSQL 15+ (`pg`)        |
| **Auth**       | JWT (`jsonwebtoken`) + bcrypt                           |
| **Real-time**  | Pusher (Channels)                                       |
| **File Uploads** | Cloudinary                                            |
| **AI**         | Google Gemini API                                       |
| **Notifications** | Custom in-app notification system                   |

---

## 📁 Project Structure

```
CeylonConnect/
├── client/                        # React frontend (Vite)
│   ├── public/                    # Static assets (images, logo)
│   └── src/
│       ├── api/                   # Admin & notification API calls
│       ├── api1/                  # Core API calls (tours, bookings, users…)
│       ├── components/
│       │   ├── admin/             # Admin dashboard panels
│       │   ├── dashboard/         # Tourist dashboard widgets
│       │   ├── filters/           # Tour filter components
│       │   ├── local/             # Guide dashboard panels
│       │   ├── section/           # Homepage sections
│       │   └── tour/              # Tour detail components
│       ├── data/                  # Static data (districts, mock)
│       ├── lib/                   # Axios HTTP client
│       ├── pages/                 # Route-level page components
│       ├── services/              # Auth & storage helpers
│       └── state/                 # React Context (Auth, Booking)
│
└── server/                        # Express backend
    ├── database/
    │   ├── setup.sql              # PostgreSQL schema
    │   └── setup.mysql.sql        # MySQL schema
    ├── middleware/                # JWT auth middleware
    ├── scripts/                   # One-off migration scripts
    └── src/
        ├── config/                # DB & Pusher configuration
        ├── controllers/           # Route handlers (business logic)
        ├── models/                # Database query layer
        └── routes/                # Express routers
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
| ----------- | ------- |
| Node.js     | ≥ 18    |
| npm         | ≥ 9     |
| MySQL **or** PostgreSQL | MySQL ≥ 8 / PostgreSQL ≥ 15 |
| [Cloudinary](https://cloudinary.com) account | — |
| [Pusher](https://pusher.com) app | — |
| [Google Gemini](https://aistudio.google.com) API key | — |

---

### 1. Database Setup

Choose **one** database engine:

---

#### 🐬 Option A — MySQL

```sql
-- Create the database
CREATE DATABASE ceylonconnect
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE ceylonconnect;
```

Then run the schema:

```bash
mysql -u root -p ceylonconnect < server/database/setup.mysql.sql
```

---

#### 🐘 Option B — PostgreSQL

```sql
-- Create the database
CREATE DATABASE ceylonconnect;
\c ceylonconnect
```

Then run the schema:

```bash
psql -U postgres -d ceylonconnect -f server/database/setup.sql
```

The PostgreSQL schema also includes sample seed data (users, tours, events).

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory (see the full [Environment Variables](#-environment-variables) reference below). A minimal template:

**For MySQL:**

```env
PORT=5000
JWT_SECRET=your_super_secret_key

DB_TYPE=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=ceylonconnect

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PUSHER_APP_ID=your_pusher_app_id
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
NEXT_PUBLIC_PUSHER_CLUSTER=ap2

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

**For PostgreSQL:**

```env
PORT=5000
JWT_SECRET=your_super_secret_key

DB_TYPE=postgres
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=ceylonconnect

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PUSHER_APP_ID=your_pusher_app_id
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
NEXT_PUBLIC_PUSHER_CLUSTER=ap2

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
# Development (with auto-reload via nodemon)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** Create a `.env` file in `client/` if you need to override the default API base URL:
> ```env
> VITE_API_URL=http://localhost:5000
> ```

---

## 👤 User Roles

| Role      | Description                                                                            |
| --------- | -------------------------------------------------------------------------------------- |
| `tourist` | Browse tours, book, review, chat, raise disputes, attend events                        |
| `local`   | All tourist access + manage own tours & bookings, request verification badge           |
| `admin`   | Full platform access — user management, badge approvals, dispute resolution, events    |

> **Creating an Admin Account:**
> After registering normally, manually update the database:
>
> ```sql
> -- MySQL / PostgreSQL
> UPDATE users
> SET role = 'admin', is_verified = TRUE
> WHERE email = 'your@email.com';
> ```

---

## 📡 API Reference

All protected routes require an `Authorization: Bearer <token>` header obtained from `POST /api/users/login`.

| Prefix                | Description                              |
| --------------------- | ---------------------------------------- |
| `POST /api/users/register` | Create a new account               |
| `POST /api/users/login`    | Authenticate and receive JWT        |
| `/api/users`          | Profile management                       |
| `/api/tours`          | CRUD for tour listings                   |
| `/api/bookings`       | Create and manage bookings               |
| `/api/reviews`        | Tour and guide reviews                   |
| `/api/messages`       | Direct messaging between users           |
| `/api/pusher`         | Pusher auth endpoint (real-time)         |
| `/api/badge-requests` | Guide verification requests              |
| `/api/uploads`        | Cloudinary file upload                   |
| `/api/disputes`       | Booking dispute management               |
| `/api/events`         | Cultural events (CRUD)                   |
| `/api/notifications`  | In-app notification system               |
| `/api/admin`          | Admin-only stats and controls            |
| `/api/ai`             | Gemini AI travel assistant               |

---

## 🗺 Client Routes

| Path             | Page                | Access        |
| ---------------- | ------------------- | ------------- |
| `/`              | Home                | Public        |
| `/tours`         | Discover Tours      | Public        |
| `/tours/:slug`   | Tour Details        | Public        |
| `/guides/:id`    | Guide Profile       | Public        |
| `/events`        | Cultural Events     | Public        |
| `/about`         | About               | Public        |
| `/login`         | Login               | Public        |
| `/signup`        | Sign Up             | Public        |
| `/help`          | Help Center         | Public        |
| `/dashboard`     | Tourist Dashboard   | Tourist       |
| `/local`         | Guide Dashboard     | Local Guide   |
| `/admin`         | Admin Dashboard     | Admin         |
| `/account`       | Account Settings    | Authenticated |

---

## 🗃 Database Schema Overview

Both schema files (`setup.sql` for PostgreSQL, `setup.mysql.sql` for MySQL) create the following tables:

| Table            | Description                                      |
| ---------------- | ------------------------------------------------ |
| `users`          | All users (tourists, guides, admins)             |
| `tours`          | Tour listings with itinerary and images (JSON)   |
| `bookings`       | Booking records linking tourists ↔ tours         |
| `reviews`        | Star ratings and comments per booking            |
| `messages`       | Direct messages between users                    |
| `badge_requests` | Guide verification document submissions          |
| `disputes`       | Booking dispute records with resolution tracking |
| `events`         | Cultural & local events                          |
| `notifications`  | In-app notification records per user             |

---

## 🔑 Environment Variables

### Server (`server/.env`)

| Variable                       | Required | Default | Description                           |
| ------------------------------ | :------: | ------- | ------------------------------------- |
| `PORT`                         | No       | `5000`  | HTTP server port                      |
| `JWT_SECRET`                   | ✅ Yes   | —       | Secret key for signing JWTs           |
| **MySQL**                      |          |         |                                       |
| `MYSQL_HOST`                   | ✅ Yes*  | `127.0.0.1` | MySQL host                        |
| `MYSQL_PORT`                   | No       | `3306`  | MySQL port                            |
| `MYSQL_USER`                   | ✅ Yes*  | `root`  | MySQL username                        |
| `MYSQL_PASSWORD`               | ✅ Yes*  | —       | MySQL password                        |
| `MYSQL_DATABASE`               | ✅ Yes*  | `ceylonconnect` | MySQL database name         |
| `MYSQL_URL`                    | No       | —       | Full MySQL connection URL (overrides individual fields) |
| **PostgreSQL**                 |          |         |                                       |
| `PG_HOST`                      | ✅ Yes** | `127.0.0.1` | PostgreSQL host                   |
| `PG_PORT`                      | No       | `5432`  | PostgreSQL port                       |
| `PG_USER`                      | ✅ Yes** | `postgres` | PostgreSQL username                |
| `PG_PASSWORD`                  | ✅ Yes** | —       | PostgreSQL password                   |
| `PG_DATABASE`                  | ✅ Yes** | `ceylonconnect` | PostgreSQL database name    |
| **Cloudinary**                 |          |         |                                       |
| `CLOUDINARY_CLOUD_NAME`        | ✅ Yes   | —       | Cloudinary cloud name                 |
| `CLOUDINARY_API_KEY`           | ✅ Yes   | —       | Cloudinary API key                    |
| `CLOUDINARY_API_SECRET`        | ✅ Yes   | —       | Cloudinary API secret                 |
| **Pusher**                     |          |         |                                       |
| `PUSHER_APP_ID`                | ✅ Yes   | —       | Pusher app ID                         |
| `NEXT_PUBLIC_PUSHER_KEY`       | ✅ Yes   | —       | Pusher key                            |
| `PUSHER_SECRET`                | ✅ Yes   | —       | Pusher secret                         |
| `NEXT_PUBLIC_PUSHER_CLUSTER`   | ✅ Yes   | `ap2`   | Pusher cluster region                 |
| **AI**                         |          |         |                                       |
| `GEMINI_API_KEY`               | ✅ Yes   | —       | Google Gemini API key                 |
| **Other**                      |          |         |                                       |
| `CLIENT_URL`                   | No       | —       | Frontend origin for CORS              |

> \* Required when using **MySQL**
> ** Required when using **PostgreSQL**

---

## 📦 Scripts

### Server

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start with nodemon (auto-reload)         |
| `npm start`     | Start in production mode                 |

### Client

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start Vite dev server                  |
| `npm run build`   | Build for production                   |
| `npm run preview` | Preview production build locally       |
| `npm run lint`    | Run ESLint                             |

---

## 🌐 Deployment

The `client/` includes a `vercel.json` configured to handle client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Deploy the client to **Vercel** and the server to any Node.js host (Railway, Render, Fly.io, etc.). Make sure to set all required environment variables on your hosting platform.

---

## 📄 License

Distributed under the **ISC License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">
  Built with ❤️ for Sri Lanka's tourism community
</div>
