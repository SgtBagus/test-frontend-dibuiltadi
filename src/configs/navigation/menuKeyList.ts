export const menuKeyAdmin = {
  dashboard: 'dashboard',
  customer: 'customer',
  transaction: 'transaction',
  user: 'user'
} as const

export type MenuKeyAdminListType = (typeof menuKeyAdmin)[keyof typeof menuKeyAdmin]
