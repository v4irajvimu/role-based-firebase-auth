import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import type { ComponentType } from 'react'
import type { Role } from '@/types/user'

export type AppIcon = ComponentType<SvgIconProps>

export interface NavItem {
  label: string
  path: string
  icon: AppIcon
  roles: Role[]
}

export interface DashboardAction {
  label: string
  path: string
  roles: Role[]
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardOutlinedIcon,
    roles: ['admin', 'user'],
  },
  {
    label: 'Users',
    path: '/users',
    icon: PeopleOutlinedIcon,
    roles: ['admin'],
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: AssessmentOutlinedIcon,
    roles: ['admin', 'user'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: SettingsOutlinedIcon,
    roles: ['admin', 'user'],
  },
]

export const dashboardActions: DashboardAction[] = [
  { label: 'Manage Users', path: '/users', roles: ['admin'] },
  { label: 'View Reports', path: '/reports', roles: ['admin', 'user'] },
  { label: 'Open Settings', path: '/settings', roles: ['admin', 'user'] },
]

export function getNavItemsForRole(role: Role): NavItem[] {
  return navItems.filter((item) => item.roles.includes(role))
}

export function getDashboardActionsForRole(role: Role): DashboardAction[] {
  return dashboardActions.filter((action) => action.roles.includes(role))
}

export function getPageTitle(pathname: string): string {
  const match = navItems.find((item) =>
    item.path === '/'
      ? pathname === '/'
      : pathname === item.path || pathname.startsWith(`${item.path}/`),
  )
  return match?.label ?? 'Portal'
}
