# Feature: Admin portal shell and pages

## Summary

Dark navy MUI shell with left navigation filtered by role, main content area, and role-aware dashboard landing page with dummy data.

## Behaviour

### Sidebar

| Role | Items |
| --- | --- |
| Admin | Dashboard, Users, Reports, Settings (4) |
| User | Dashboard, Reports, Settings (3) |

### Dashboard quick actions

| Role | Buttons |
| --- | --- |
| Admin | Manage Users, View Reports, Open Settings (3) |
| User | View Reports, Open Settings (2) |

### Pages

- **Dashboard** — dummy stats + role-filtered action buttons
- **Users** — admin-only dummy table
- **Reports** — dummy report list
- **Settings** — read-only profile fields + placeholder toggle

## Key files

| Path | Role |
| --- | --- |
| `src/components/layout/AppShell.tsx` | Shell layout + header |
| `src/components/layout/Sidebar.tsx` | Role-filtered nav |
| `src/config/navigation.ts` | Nav items, actions, page titles |
| `src/features/dashboard/DashboardPage.tsx` | Landing dashboard |
| `src/features/users/UsersPage.tsx` | Admin users page |
| `src/features/reports/ReportsPage.tsx` | Reports page |
| `src/features/settings/SettingsPage.tsx` | Settings page |
| `src/app/router.tsx` | Route map |

## Theme

Sidebar `#0B1F3A`, page `#0E1726`, cards `#152238`, accent `#3B82F6` — see `src/config/theme.ts`.
