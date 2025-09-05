import NextTopLoader from 'nextjs-toploader'

export default function NextProgress() {
  return (
    <NextTopLoader
      initialPosition={0.7}
      showSpinner={false}
      crawlSpeed={100}
      speed={100}
      color='var(--primary-color)'
    />
  )
}
