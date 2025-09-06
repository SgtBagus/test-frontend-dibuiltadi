export const menuKeyAdmin = {
  dashboard: 'dashboard',
  customer: 'customer',
  transaction: 'transaction',
  profile: 'profile'
} as const

export type MenuKeyAdminListType = (typeof menuKeyAdmin)[keyof typeof menuKeyAdmin]
