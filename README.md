# CampusTrack

> A placement application tracker that helps students manage job applications and monitor recruitment progress in one place.

CampusTrack is a full-stack web application designed for college students to organize and track their placement and job applications. The application provides authentication, application management, search and filtering, recruitment status tracking, and a dashboard with placement statistics.

---

## 🎯 Project Goal

CampusTrack solves one clear problem:

> **Help students keep track of their placement applications and recruitment progress in one place.**

Students can maintain their placement applications, update recruitment stages, search and filter applications, and view an overview of their placement progress through the dashboard.

The project is intentionally kept practical and focused so that the major features and technical decisions can be understood and explained during technical interviews.

---

## ✨ Features

### 🔐 Authentication

- Email and password registration
- Email and password login
- Google OAuth login
- Persistent authentication sessions
- Logout functionality
- Protected application routes
- Authentication error handling
- Password security validation

### 📋 Application Management

Users can:

- Add new placement applications
- View application details
- Edit existing applications
- Delete applications
- Search applications
- Filter applications by status

Each application contains:

- Company
- Job Role
- Status
- Application Date
- Location
- Notes

### 📊 Dashboard

The dashboard provides an overview of placement activity:

- Total Applications
- Assessments
- Interviews
- Selected applications
- Applications by status
- Recent applications

A Recharts visualization displays applications across the different recruitment stages.

### 🔎 Search & Filtering

Users can:

- Search applications by company
- Filter applications by recruitment status
- Combine application management with status tracking

### 📱 Responsive UI

The interface is designed to work across:

- Desktop
- Tablet
- Mobile

---

## 🏷️ Application Status

CampusTrack uses five recruitment statuses:

| Status | Description |
|---|---|
| Applied | Application has been submitted |
| Assessment | Candidate is in an assessment stage |
| Interview | Candidate is in an interview stage |
| Selected | Candidate has been selected |
| Rejected | Application was rejected |

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- TanStack Router
- Recharts
- Vite

### Backend / Cloud

- Supabase
- Lovable Cloud

### Database

- PostgreSQL

### Authentication

- Supabase Authentication
- Email & Password
- Google OAuth

### Development Tools

- Git
- GitHub
- npm
- VS Code

---

## 🏗️ Architecture

```text
                    CampusTrack
                         │
                         ▼
               React + TypeScript
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
        Supabase Auth       Supabase Database
              │                     │
              │                     ▼
              │                 PostgreSQL
              │
              ├── Email / Password
              │
              └── Google OAuth



---

## 🔄 Application Flow

```text
User
 │
 ▼
Login / Register
 │
 ├── Email & Password
 │
 └── Google OAuth
 │
 ▼
Authenticated Session
 │
 ▼
Dashboard
 │
 ├── View Statistics
 ├── View Recent Applications
 └── Track Recruitment Progress
 │
 ▼
Applications
 │
 ├── Add
 ├── Search
 ├── Filter
 ├── View
 ├── Edit
 └── Delete
 │
 ▼
Supabase
 │
 ▼
PostgreSQL

---

## 🔐 Authentication

CampusTrack uses Supabase Authentication for managing user accounts and sessions.

### Email & Password

Users can:

- Create an account
- Sign in
- Sign out
- Maintain a persistent session

The registration flow also handles:

- Duplicate email accounts
- Weak or breached passwords
- Password security errors
- Authentication failures

### Google OAuth

Users can also sign in using Google.

Google authentication is handled through the managed OAuth integration, keeping sensitive OAuth credentials out of frontend code.

The OAuth callback is handled through the login flow and the authenticated session is persisted.

---

## 📊 Dashboard

The dashboard provides a quick overview of the user's placement progress.

### Statistics

The dashboard displays:

- Total Applications
- Assessments
- Interviews
- Selected Applications

Applications can also be grouped by their recruitment status.

### Application Status Chart

A Recharts visualization displays:

- Applied
- Assessment
- Interview
- Selected
- Rejected

The chart is generated from application data.

### Recent Applications

The dashboard displays recent applications with information such as:

- Company
- Role
- Status
- Application Date

Users can navigate to the complete applications page from the dashboard.

---

## 📋 Application Management

### Add Application

Users can add a new placement application.

The application form contains:

- Company Name
- Job Role
- Status
- Application Date
- Location
- Notes

Example:

```text
Company: Infosys
Role: Systems Engineer
Status: Applied
Application Date: 2026-09-20
Location: Pune
Notes: Campus placement application

---

## 🔎 Search

The applications page provides a search field for finding applications by company name.

```text
Search companies...

---

## 📄 Application Details

Each application can be opened through:

```text
/applications/:id

---

## 🗄️ Database

CampusTrack uses PostgreSQL through Supabase.

### Profiles

The `profiles` table stores basic user information.

| Column | Description |
|---|---|
| `id` | User identifier |
| `name` | User name |
| `email` | User email |
| `created_at` | Profile creation timestamp |

### Applications

The `applications` table stores placement application information.

| Column | Description |
|---|---|
| `id` | Application identifier |
| `user_id` | User who owns the application |
| `company` | Company name |
| `role` | Job role |
| `status` | Recruitment status |
| `application_date` | Application date |
| `location` | Job location |
| `notes` | Additional information |
| `created_at` | Creation timestamp |
| `updated_at` | Last update timestamp |

Authentication users are managed through Supabase Authentication.

---

## 🔒 Row Level Security

CampusTrack uses PostgreSQL Row Level Security (RLS) to protect user-specific application data.

Every application is associated with its owner through:

```text
user_id

---

## 📁 Project Structure

```text
campus-track-buddy-85/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │
│   ├── integrations/
│   │   ├── lovable/
│   │   └── supabase/
│   │
│   ├── lib/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Applications.jsx
│   │   └── ApplicationDetails.jsx
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── applicationService.js
│   │
│   ├── main.tsx
│   └── routeTree.gen.ts
│
├── .env.example
├── .gitignore
├── package.json
├── vite.config.ts
└── README.md

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

```bash
git clone https://github.com/Aakash100101/campus-track-buddy-85.git
cd campus-track-buddy-85
npm install


### 11. Live Demo & GitHub

Iske neeche:

```markdown
---

## 🌐 Live Demo

[CampusTrack](https://campus-track-buddy-85.lovable.app)

## 💻 GitHub Repository

[View Source Code](https://github.com/Aakash100101/campus-track-buddy-85)

---

## 👨‍💻 Author

### Aakash Pandey

B.Tech — Computer Science & Engineering (Data Science)

ABES Engineering College

[GitHub](https://github.com/Aakash100101)