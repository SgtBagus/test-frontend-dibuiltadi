import { Navigation } from '@/types/navigation'
import { menuKeyAdmin } from './menuKeyList'
import { routes } from '../routes'

export const MenuList: Navigation = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: 'ri-home-smile-line',
    menukey: menuKeyAdmin['dashboard']
  },
  {
    name: 'customer',
    label: 'Pelanggan',
    href: routes.customer.index,
    icon: 'ri-group-line',
    menukey: menuKeyAdmin['customer']
  },
  {
    name: 'transaction',
    label: 'Transaksi',
    href: routes.transaction.index,
    icon: 'ri-shopping-cart-line',
    menukey: menuKeyAdmin['transaction']
  }
] as const
