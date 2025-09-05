'use client'

import { useAuth } from '@/context/authContext'

const Page = () => {
  const { user } = useAuth()

  return (
    <div>
      {' '}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default Page
