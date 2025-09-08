import { FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material'

import { useEffect, useState } from 'react'
import { useTabelContext } from '../context/tabelContext'
import { apiFetch } from '@/api/apiFetch'
import toast from '@/helper/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'

type values = { code: string; name: string }

const InputSelectFilter = ({
  filterKey,
  label = 'Pencarian SelectBox',
  disabled,
  options: { endpoint, params }
}: {
  filterKey: string
  label?: string
  disabled?: boolean
  options: { endpoint: string; params?: Record<string, any> }
}) => {
  const {
    tabelFilter: { filter },
    setFilter
  } = useTabelContext()

  const [value, setValue] = useState<string | string[] | null>(null)
  const [data, setData] = useState<values[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setValue(filter[filterKey] || '')
  }, [filterKey, filter])

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await apiFetch(endpoint, {
        body: params
      })
      setData(res.items)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <FormControl fullWidth>
      <InputLabel size='small'>{label}</InputLabel>
      <Select
        size='small'
        disabled={disabled}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        key={filterKey}
        value={value || ''}
        label={label}
        onChange={({ target: { value } }) => {
          setValue(value)
          setFilter({ ...filter, [filterKey]: value })
        }}
        renderValue={() => {
          return data.find(({ code }) => code === value)?.name
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              overflowX: 'auto'
            }
          },
          MenuListProps: {
            sx: {
              paddingTop: 0
            }
          }
        }}
        IconComponent={() =>
          value ? (
            <i
              className='ri-close-line cursor-pointer'
              style={{ pointerEvents: 'auto' }}
              onClick={e => {
                e.stopPropagation()
                setValue(null)
                const newFilter = { ...filter }
                delete newFilter[filterKey]
                setFilter(newFilter)
              }}
            />
          ) : (
            <i className='ri-arrow-down-s-line' />
          )
        }
      >
        <div className='max-h-72'>
          {isLoading ? (
            <MenuItem disabled aria-label='loading'>
              <Skeleton width='100%' />
            </MenuItem>
          ) : (
            data.map(({ code, name }, idx) => {
              return (
                <MenuItem key={idx} value={code}>
                  {name}
                </MenuItem>
              )
            })
          )}
        </div>
      </Select>
    </FormControl>
  )
}

export default InputSelectFilter
