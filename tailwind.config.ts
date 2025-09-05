import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      keyframes: {
        vibrate: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-2deg)' },
          '10%': { transform: 'rotate(2deg)' },
          '15%': { transform: 'rotate(-2deg)' },
          '20%': { transform: 'rotate(2deg)' },
          '25%': { transform: 'rotate(-1deg)' },
          '30%': { transform: 'rotate(1deg)' },
          '35%, 50%': { transform: 'rotate(0deg)' },
          '51%, 100%': { transform: 'rotate(0deg)' }
        }
      },
      animation: {
        vibrate: 'vibrate 2s ease-in-out infinite'
      }
    }
  }
}

export default config
