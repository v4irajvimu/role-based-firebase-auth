# Feature: Header page title and profile drawer

## Summary

Persistent top header shows the current page name. A profile avatar sits at the top right; clicking it opens a temporary right-side profile drawer (sign out, role, contact info).

## Behaviour

- Header is visible on all breakpoints
- Page title comes from the active route via `getPageTitle(pathname)` (aligned with sidebar labels)
- Avatar shows initials from `displayName`
- Profile panel is drawer-only (not a permanent right column)
- Mobile also keeps the hamburger to open the left nav

## Key files

| Path | Role |
| --- | --- |
| `src/components/layout/AppShell.tsx` | AppBar, page title, avatar trigger |
| `src/components/layout/ProfilePanel.tsx` | Temporary right drawer |
| `src/config/navigation.ts` | `getPageTitle` helper |

## UX flow

1. User navigates → header title updates
2. User clicks avatar → profile drawer opens
3. User signs out from drawer → Auth session cleared → redirect to login
