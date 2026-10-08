export type Role = 'admin' | 'user'

export interface UserProfile {
  uid: string
  displayName: string
  email: string
  role: Role
  createdAt?: Date
}
