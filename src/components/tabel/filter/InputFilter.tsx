'use client'

import { TextField } from '@mui/material'
import { useTabelContext } from '../context/tabelContext'
import { useState, useEffect } from 'react'
import LabelWrapper from '@/components/wrapper/LabelWrapper'

export default function InputFilter({
  filterKey = 'search',
  placeholder,
  label = 'Cari',
  disabled
}: {
  filterKey?: string
  placeholder?: string
  label?: string
  disabled?: boolean
}) {
  const {
    tabelFilter: { filter },
    setFilter,
    isLoading
  } = useTabelContext()

  // local state untuk input
  const [localValue, setLocalValue] = useState(filter[filterKey] || '')

  // sinkronisasi kalau filter berubah dari luar
  useEffect(() => {
    setLocalValue(filter[filterKey] || '')
  }, [filter, filterKey])

  // debounce update ke context
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(prev => ({ ...prev, [filterKey]: localValue }))
    }, 1000) // 500ms debounce

    return () => clearTimeout(handler)
  }, [localValue, filterKey, setFilter])

  return (
    <LabelWrapper label={label}>
      <TextField
        value={localValue}
        onChange={({ target: { value } }) => setLocalValue(value)}
        placeholder={placeholder}
        size='small'
        fullWidth
        disabled={disabled || isLoading}
      />
    </LabelWrapper>
  )
}
