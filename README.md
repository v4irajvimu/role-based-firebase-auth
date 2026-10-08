# Role-Based Admin Portal

A React admin portal with Firebase email/password authentication and role-based UI. Navigation, routes, and dashboard actions change for `admin` vs `user`.

## Features

- Email/password authentication (Firebase Auth)
- Role-based access stored in Firestore (`admin` | `user`)
- Dark navy MUI shell with sidebar, header page title, and profile avatar drawer
- Dashboard with dummy metrics and role-filtered quick actions
- Protected routes (`/users` is admin-only)
- Firebase Hosting + Firestore rules deploy scripts

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | React 19, TypeScript |
| Build | Vite 8 |
| UI | MUI 9 |
| Routing | React Router 7 |
| Backend services | Firebase Auth, Cloud Firestore |
| Hosting | Firebase Hosting |

## Prerequisites

- Node.js 20+
- npm 10+
- A Firebase project with Email/Password auth and Firestore enabled

## Getting started

```bash
npm install
cp .env.example .env
```

Fill `.env` with your Firebase web app config:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## Project structure

```text
src/
  app/                 # Providers and router
  assets/              # Static assets and illustrations
  components/
    common/            # Shared UI (StatCard, PageHeader, guards)
    layout/            # AppShell, Sidebar, ProfilePanel
  config/              # Firebase, theme, navigation
  features/
    auth/              # Auth context, login, register
    dashboard/         # Dashboard page
    users/             # Admin users page
    reports/           # Reports page
    settings/          # Settings page
  routes/              # Role-based route guards
  types/               # Shared TypeScript types
docs/
  PROJECT_SPEC.md      # Product and engineering spec
  features/            # Per-feature development notes
```

Path alias: `@/` → `src/`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy:hosting` | Build and deploy Firebase Hosting |
| `npm run deploy:rules` | Deploy Firestore security rules |
| `npm run deploy` | Build and deploy Hosting + Firestore rules |

## Roles

| Role | Access |
| --- | --- |
| `user` | Dashboard, Reports, Settings (default on register) |
| `admin` | All of the above, plus Users |

Promote an admin by setting `users/{uid}.role` to `"admin"` in Firestore, then sign out and sign in again.

## Firebase setup

1. Create a Firebase project and register a **Web** app.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Create a **Firestore** database.
4. Publish rules from [`firestore.rules`](firestore.rules) (console or `npm run deploy:rules`).
5. Copy the web config into `.env`.
6. Register in the app, then optionally promote that user to `admin`.

## Deployment

```bash
npx firebase login
npm run deploy:hosting
```

After the first Hosting deploy, add your Hosting domains under **Authentication → Settings → Authorized domains** if they are missing.

## Documentation

| Document | Purpose |
| --- | --- |
| [docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md) | Full product spec, data model, theme, setup |
| [docs/features/](docs/features/README.md) | Feature development notes |

## License

Private project. All rights reserved.
