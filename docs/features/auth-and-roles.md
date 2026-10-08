# Feature: Authentication and roles

## Summary

Email/password sign-in and registration via Firebase Auth, with role stored on a Firestore `users/{uid}` document. UI navigation and dashboard actions depend on `admin` vs `user`.

## Behaviour

- **Register** creates Auth user + Firestore profile with `role: "user"` (no role picker)
- **Login** loads the Firestore profile after Auth session is ready
- Missing profile is auto-created for a signed-in user when possible (`ensureUserProfile`)
- **Admin** is assigned only by updating Firestore `role` to `"admin"`
- Client route guards: unauthenticated → `/login`; non-admin on `/users` → `/`

## Key files

| Path | Role |
| --- | --- |
| `src/config/firebase.ts` | Firebase init from `VITE_FIREBASE_*` |
| `src/features/auth/AuthContext.tsx` | Session, register/login/logout, profile ensure |
| `src/features/auth/LoginPage.tsx` | Login UI |
| `src/features/auth/RegisterPage.tsx` | Register UI |
| `src/components/common/ProtectedRoute.tsx` | Auth gate |
| `src/routes/RoleRoute.tsx` | Role gate |
| `firestore.rules` | Own-doc read/create; client cannot change `role` |

## Data model

`users/{uid}`: `displayName`, `email`, `role`, `createdAt`

## Setup notes

Publish `firestore.rules` in the Firebase console before register/login can write profiles. See [PROJECT_SPEC.md](../PROJECT_SPEC.md) for full Firebase setup.
