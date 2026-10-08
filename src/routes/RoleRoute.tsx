import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import type { Role } from '@/types/user'

interface RoleRouteProps {
  roles: Role[]
  children: React.ReactNode
}

export function RoleRoute({ roles, children }: RoleRouteProps) {
  const { profile } = useAuth()

  if (!profile || !roles.includes(profile.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
