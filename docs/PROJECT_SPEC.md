# Role-Based Admin Portal — Project Spec

## Purpose

A simple, professional admin portal with Firebase email/password authentication and role-based UI. Signed-in users see a dashboard shell whose left navigation and dashboard actions change based on role (`admin` or `user`).

## Stack

| Layer | Choice |
| --- | --- |
| Build tool | Vite |
| UI library | React 19 + TypeScript |
| Design system | MUI (Material UI) |
| Routing | React Router |
| Auth | Firebase Authentication (Email/Password) |
| User profile / roles | Cloud Firestore |

## Roles

| Role | Description |
| --- | --- |
| `admin` | Full portal access, including Users management |
| `user` | Standard access; no Users page |

- Registration always creates a document with `role: "user"`.
- There is no role picker on the register form.
- Promote a user to admin by setting `role` to `"admin"` on their Firestore document (`users/{uid}`), then have them sign out and sign in again.

## Screens

| Route | Access | Description |
| --- | --- | --- |
| `/login` | Public | Email/password sign-in |
| `/register` | Public | Create account (always `user` role) |
| `/` (Dashboard) | Authenticated | Landing page with dummy stats and role-based action buttons |
| `/users` | Admin only | Users management (dummy content) |
| `/reports` | Authenticated | Reports (dummy content) |
| `/settings` | Authenticated | Settings (dummy content) |

Unauthenticated visitors are redirected to `/login`. Authenticated users who open `/users` without the admin role are redirected to the dashboard.

## Role-based UI

### Sidebar

| Role | Items (count) |
| --- | --- |
| Admin | Dashboard, Users, Reports, Settings (**4**) |
| User | Dashboard, Reports, Settings (**3**) |

### Dashboard action buttons

Buttons navigate to the matching page.

| Role | Buttons (count) |
| --- | --- |
| Admin | Manage Users, View Reports, Open Settings (**3**) |
| User | View Reports, Open Settings (**2**) |

## Layout

Industry-style three-panel admin shell:

- **Left** — App name and role-filtered navigation; active route highlighted.
- **Center** — Page content. Dashboard shows dummy stat cards (active users, open reports, tasks) plus role-specific action buttons.
- **Right** — Signed-in profile: avatar, display name, email, role chip, and sign out.

On narrow viewports, the profile panel collapses into a drawer opened from the top app bar.

### Theme (dark navy)

| Token | Value |
| --- | --- |
| Sidebar | `#0B1F3A` |
| Page background | `#0E1726` |
| Cards / surfaces | `#152238` |
| Accent | `#3B82F6` |
| Text | Light / high contrast on dark surfaces |

### Auth pages

Login and register use a split layout: illustration (undraw-style assets under `src/assets/illustrations/`) on one side and a form card on the other, over a navy gradient background.

## Authentication flow

1. App loads and listens to Firebase `onAuthStateChanged`.
2. If no session → show login/register.
3. If signed in → load `users/{uid}` from Firestore, then render the app shell.
4. Register creates the Auth user and a Firestore profile with `role: "user"`.
5. Route rendering waits until the profile is loaded so the sidebar does not flash the wrong items.

Client route guards improve UX. Firestore security rules enforce that a user can only read/create their own profile document and cannot change `role` from the client.

## Data model

### Collection: `users`

Document ID = Firebase Auth `uid`.

| Field | Type | Notes |
| --- | --- | --- |
| `displayName` | string | From registration |
| `email` | string | From registration |
| `role` | `"admin"` \| `"user"` | Defaults to `"user"` on register |
| `createdAt` | timestamp | Set on register |

## Project structure

```
src/
  app/                 # Providers and router
  assets/illustrations/
  components/
    common/            # StatCard, PageHeader, LoadingScreen, ProtectedRoute
    layout/            # AppShell, Sidebar, ProfilePanel
  config/              # firebase, theme, navigation
  features/
    auth/              # AuthContext, LoginPage, RegisterPage
    dashboard/
    users/
    reports/
    settings/
  routes/              # RoleRoute
  types/               # Role, UserProfile
```

Path alias: `@/` → `src/`.

## Environment variables

Copy `.env.example` to `.env` and fill in the Firebase web app config:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

If these are missing, the login page shows a clear setup message instead of crashing.

## Firebase setup (console)

1. Create a Firebase project and add a **Web** app; copy the config into `.env`.
2. **Authentication → Sign-in method** — enable **Email/Password**.
3. **Firestore Database** — create a database (production mode recommended).
4. Apply the rules in `firestore.rules` (Firebase console or CLI deploy).
5. Register in the app, then set that user’s `role` to `"admin"` in Firestore to test the admin UI.

## Local development

```bash
npm install
npm run dev
```

See the root [README](../README.md) for scripts and a short run guide.
