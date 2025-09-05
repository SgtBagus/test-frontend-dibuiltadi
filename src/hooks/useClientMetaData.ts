'use client'

import { app } from '@/configs/app'
import { useEffect } from 'react'

type MetaDataProps = {
  title: string
  description?: string
}

const useClientMetaData = ({ title, description }: MetaDataProps) => {
  useEffect(() => {
    if (title) {
      if (title === '') {
        document.title = `${app.name}`
      } else {
        document.title = `${title} | ${app.name}`
      }
    }

    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [description, title])
}

export default useClientMetaData
