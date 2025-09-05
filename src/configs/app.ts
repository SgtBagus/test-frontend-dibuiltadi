export const app = {
  name: 'CMS (Comunity Management System)',
  description: 'Semua Data Kominutas dalam satu genggaman'
}

export const auth0Configuration = {
  issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL as string,
  clientId: process.env.AUTH0_CLIENT_ID as string
}

export const storage = {
  themeSettings: 'theme-settings'
}
