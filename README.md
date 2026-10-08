# Role-Based Admin Portal

Professional MUI admin portal with Firebase email/password authentication and role-based navigation.

Full product and engineering details: **[docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md)**.

## Quick start

```bash
npm install
cp .env.example .env
# Fill in VITE_FIREBASE_* values from your Firebase web app
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Firebase setup (short)

1. Create a Firebase project and a Web app.
2. Enable **Authentication → Email/Password**.
3. Create a **Firestore** database and apply [`firestore.rules`](firestore.rules).
4. Copy web config into `.env`.
5. Register in the app, then set `users/{uid}.role` to `"admin"` in Firestore to test the admin UI.

See [docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md) for roles, screens, layout, and data model.
