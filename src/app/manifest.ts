import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bisajual.com',
    short_name: 'Bisajual',
    description: 'Jual apa aja pasti cuan!',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icons/icon-144x144.svg',
        sizes: '144x144'
      },
      {
        src: '/icons/icon-192x192.svg',
        sizes: '192x192'
      },
      {
        src: '/icons/icon-512x512.svg',
        sizes: '512x512'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Bisajual.com Desktop View'
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '430x932',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Bisajual.com Mobile View'
      }
    ]
  }
}
