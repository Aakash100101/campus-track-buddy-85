# Campus Track

Build a modern, professional portfolio project called CampusTrack — Placement Application Tracker.

Project Goal

CampusTrack is a simple web application that helps college students manage and track their placement/job applications.

The application should solve one clear problem:

"Help students keep track of their placement applications and recruitment progress in one place."

This is a portfolio project for a software engineering student.

IMPORTANT:
Keep the project simple, practical, and easy to understand and explain during an interview.

Do not add unnecessary features.

TECHNOLOGY REQUIREMENTS

Use ONLY the following technologies.

Frontend

React.js

JavaScript

HTML

CSS / Tailwind CSS

React Router

Recharts

Backend — later phase

Python

FastAPI

Database — later phase

MySQL

SQLAlchemy ORM

Authentication — later phase

JWT

Tools

Git

GitHub

IMPORTANT:

Do NOT use:

TypeScript

Next.js

Redux

PostgreSQL

Prisma

Firebase

Supabase

GraphQL

Docker

Any unnecessary framework or library

Use plain JavaScript for React.

DEVELOPMENT APPROACH

For this phase, build ONLY the frontend.

Do NOT create the FastAPI backend yet.

Do NOT create the MySQL database yet.

Do NOT implement JWT yet.

However, structure the frontend so that the FastAPI backend can be connected later without rewriting the UI.

We will build the backend and database in later phases.

DESIGN DIRECTION

The UI must look like a modern professional productivity/SaaS application.

Design inspiration can come from products such as:

Linear

Notion

GitHub

But do NOT copy their designs.

The interface should look like a real developer-built product, not an AI-generated template.

Use

Clean light background

White content surfaces

Dark charcoal text

One restrained accent color

Thin borders

Minimal shadows

Clear typography hierarchy

Professional tables

Compact sidebar

Small status badges

Good whitespace

Subtle hover effects

Simple transitions

DO NOT USE

Purple/blue AI gradients

Neon colors

Glowing cards

Glassmorphism

Gradient text

Excessive rounded cards

Excessive shadows

AI illustrations

Robot/chatbot graphics

Excessive animations

Huge dashboard cards

Generic AI SaaS visual style

Keep the visual design clean, minimal, and professional.

APPLICATION ROUTES

Create these routes:

/login

/register

/dashboard

/applications

/applications/:id

1. LOGIN PAGE

Create a simple professional login page.

Fields:

Email

Password

Buttons:

Login

Register

Include:

Basic form validation

Error message area

Loading state

For now, authentication can use simple mock frontend behavior.

Keep authentication logic separated because JWT authentication will later be implemented through FastAPI.

2. REGISTER PAGE

Create a registration page.

Fields:

Full Name

Email

Password

Confirm Password

Include:

Basic validation

Password confirmation validation

Loading state

Error state

Add a link back to Login.

3. DASHBOARD

Create a clean placement dashboard.

Header:

Good morning, [Student Name]

Subtitle:

Here's an overview of your placement applications.

Create four compact statistic cards:

Total Applications

Number of all applications.

Assessments

Number of applications currently in Assessment stage.

Interviews

Number of applications currently in Interview stage.

Selected

Number of selected applications.

Do NOT make these cards oversized.

Application Status Chart

Create one simple Recharts chart.

Title:

Applications by Status

Show:

Applied

Assessment

Interview

Selected

Rejected

The chart should be based on application data.

Do not create complicated analytics.

Recent Applications

Create a clean table showing recent applications.

Columns:

Company

Role

Status

Application Date

Add a "View all" link/button that navigates to /applications.

4. APPLICATIONS PAGE

Create a professional application management page.

Header:

Applications

Subtitle:

Track and manage your placement applications.

Top-right button:

+ Add Application

Search

Add a search input:

Search companies...

Search should filter applications by company name.

Status Filter

Add a dropdown/filter:

All

Applied

Assessment

Interview

Selected

Rejected

Applications Table

Columns:

Company

Job Role

Status

Application Date

Location

Actions

Actions:

View

Edit

Delete

Use small professional status badges.

5. ADD APPLICATION

When the user clicks:

+ Add Application

open a clean modal/dialog.

Fields:

Company Name

Text input.

Job Role

Text input.

Status

Dropdown:

Applied

Assessment

Interview

Selected

Rejected

Application Date

Date input.

Location

Text input.

Notes

Textarea.

Buttons:

Cancel

Add Application

After adding an application, update the application list and dashboard statistics.

6. EDIT APPLICATION

Allow users to edit an existing application.

Use the same application form where practical.

The user should be able to update:

Company

Role

Status

Application Date

Location

Notes

After updating, the table and dashboard should update.

7. DELETE APPLICATION

Allow users to delete an application.

Before deletion, show a confirmation dialog:

Delete this application?

Message:

This action cannot be undone.

Buttons:

Cancel

Delete

After deletion, update the table and dashboard statistics.

8. APPLICATION DETAILS

Create:

/applications/:id

Show the complete application information:

Company

Role

Status

Application Date

Location

Notes

Provide buttons:

Edit Application

Delete Application

Back to Applications

Use a clean layout.

Desktop:

Use a simple two-column information layout where appropriate.

Mobile:

Use a single-column layout.

APPLICATION STATUS

Use ONLY these five statuses:

Applied

Assessment

Interview

Selected

Rejected

Do not add unnecessary workflow stages.

MOCK DATA

For this frontend phase, create a small realistic mock dataset.

Example companies:

Infosys

TCS

HCL

Capgemini

Accenture

Keep mock data separate from UI components.

Create:

src/data/applications.js

The mock data should contain fields such as:

id

company

role

status

applicationDate

location

notes

FRONTEND DATA STRUCTURE

Create a simple service layer:

src/services/applicationService.js

Create functions such as:

getApplications()

getApplicationById()

createApplication()

updateApplication()

deleteApplication()

For this phase these functions can work with mock/local data.

The important requirement is that page components should NOT directly contain all data-management logic.

Later, these service functions will make requests to FastAPI REST APIs.

COMPONENT STRUCTURE

Use reusable React components.

Suggested structure:

src/
components/
Sidebar.jsx
Header.jsx
StatCard.jsx
StatusBadge.jsx
ApplicationTable.jsx
ApplicationForm.jsx
ConfirmDialog.jsx
EmptyState.jsx

pages/
Login.jsx
Register.jsx
Dashboard.jsx
Applications.jsx
ApplicationDetails.jsx

services/
applicationService.js

data/
applications.js

App.jsx

Use JavaScript files.

Do NOT create TypeScript files.

Do not over-engineer the component architecture.

FRONTEND BEHAVIOR

The application should actually work in the browser.

Implement:

Navigation between pages

Add application

Edit application

Delete application

View application details

Search

Filter

Dashboard statistics

Status chart

Empty state when no applications exist

Basic loading states

Basic error states

When application data changes, dashboard statistics and charts should reflect the updated data.

RESPONSIVE DESIGN

The application must work properly on:

Desktop

Tablet

Mobile

Desktop:

Use a compact sidebar.

Mobile:

Use a responsive navigation menu/drawer.

Tables should remain usable on smaller screens.

CODE QUALITY

Keep the code easy for a beginner/intermediate React developer to understand.

Use:

React components

useState

useEffect where actually necessary

React Router

Simple JavaScript functions

Reusable components

Clear variable names

Simple state management

Do NOT introduce advanced state-management libraries.

Do NOT over-engineer the application.

Avoid huge components.

Avoid duplicated code where a simple reusable component makes sense.

IMPORTANT FUTURE ARCHITECTURE

The final project will eventually use:

React.js
↓
REST API
↓
FastAPI
↓
SQLAlchemy ORM
↓
MySQL

But ONLY build the React frontend in this phase.

Later we will add:

Phase 2

FastAPI backend and REST APIs.

Phase 3

MySQL database and SQLAlchemy ORM.

Phase 4

JWT authentication and protected routes.

Phase 5

Connect React frontend to FastAPI.

Phase 6

Testing, error handling, deployment, GitHub README, and resume preparation.

Do not implement these future phases now.

FINAL REQUIREMENT

The finished frontend should look polished enough to put in a portfolio while remaining simple enough that a student can explain every major component and feature during an interview.

The project should demonstrate:

React fundamentals

Component-based development

React Router

State management with hooks

CRUD UI

REST API-ready architecture

Responsive design

Basic data visualization

Do not add features just to make the project appear bigger.

At the end, provide:

Pages created

Components created

Folder structure

How application data is currently managed

Where FastAPI will later be connected

Any dependencies installed

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0a317c8-1490-4f78-b155-11688928d48d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
