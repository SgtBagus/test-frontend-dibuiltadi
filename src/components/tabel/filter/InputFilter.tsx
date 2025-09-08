'use client'

import { TextField } from '@mui/material'
import { useTabelContext } from '../context/tabelContext'
import { useState, useEffect } from 'react'

export default function InputFilter({
  fieldKey = 'search',
  placeholder = 'Cari...',
  disabled
}: {
  fieldKey?: string
  placeholder?: string
  disabled?: boolean
}) {
  const {
    tabelFilter: { filter },
    setFilter
  } = useTabelContext()

  // local state untuk input
  const [localValue, setLocalValue] = useState(filter[fieldKey] || '')

  // sinkronisasi kalau filter berubah dari luar
  useEffect(() => {
    setLocalValue(filter[fieldKey] || '')
  }, [filter, fieldKey])

  // debounce update ke context
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(prev => ({ ...prev, [fieldKey]: localValue }))
    }, 1000) // 500ms debounce

    return () => clearTimeout(handler)
  }, [localValue, fieldKey, setFilter])

  return (
    <TextField
      value={localValue}
      onChange={({ target: { value } }) => setLocalValue(value)}
      placeholder={placeholder}
      size='small'
      fullWidth
      disabled={disabled}
    />
  )
}
