import Datepicker, { StyledReactDatePicker } from '@/components/datepicker'

import { MenuList, MenuItem, TextField, type MenuItemProps } from '@mui/material'
import { cn } from '@/utils/cn'
import { Dayjs } from 'dayjs'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import { appDayJs } from '@/utils/appDayJs'
import LabelWrapper from '@/components/wrapper/LabelWrapper'

export type DateRangeType = {
  startDate: string
  endDate: string
}

type InputDateRangeFilterProps = {
  placeholder?: string
  className?: string
  label?: string
  disabled?: boolean

  setDateFilter: Dispatch<SetStateAction<DateRangeType>>
}

type PresetValue =
  | 'custom'
  | 'today'
  | 'yesterday'
  | 'this-week'
  | 'last-7-days'
  | 'last-30-days'
  | 'this-month'
  | 'last-month'

export const defaultDateRange: DateRangeType = {
  startDate: appDayJs(new Date()).startOf('month').format('YYYY-MM-DD'),
  endDate: appDayJs(new Date()).endOf('month').format('YYYY-MM-DD')
}

export default function InputDateRangeFilter({
  placeholder = 'Pencarian Tanggal..',
  className,
  label,
  disabled,
  setDateFilter
}: InputDateRangeFilterProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date(defaultDateRange.startDate))
  const [endDate, setEndDate] = useState<Date | null>(new Date(defaultDateRange.endDate))

  const [openCalendar, setOpenCalendar] = useState<boolean>(false)

  const dayjs = useCallback((date?: Date) => {
    return appDayJs(date ?? new Date())
  }, [])

  // Preset value
  const presetActive: PresetValue = useMemo(() => {
    const dateComparing = (start: Date, end: Dayjs) => {
      return end.isSame(start, 'date')
    }

    if (startDate && endDate && dateComparing(startDate, dayjs()) && dateComparing(endDate, dayjs())) {
      return 'today'
    }

    if (
      startDate &&
      endDate &&
      dateComparing(startDate, dayjs().subtract(1, 'day')) &&
      dateComparing(endDate, dayjs().subtract(1, 'day'))
    ) {
      return 'yesterday'
    }

    if (
      startDate &&
      endDate &&
      dateComparing(startDate, dayjs().startOf('isoWeek')) &&
      dateComparing(endDate, dayjs().endOf('isoWeek'))
    ) {
      return 'this-week'
    }

    if (
      startDate &&
      endDate &&
      dateComparing(startDate, dayjs().subtract(6, 'day')) &&
      dateComparing(endDate, dayjs())
    ) {
      return 'last-7-days'
    }

    if (
      startDate &&
      endDate &&
      dateComparing(startDate, dayjs().subtract(29, 'day')) &&
      dateComparing(endDate, dayjs())
    ) {
      return 'last-30-days'
    }

    if (
      startDate &&
      endDate &&
      dateComparing(startDate, dayjs().startOf('month')) &&
      dateComparing(endDate, dayjs().endOf('month'))
    ) {
      return 'this-month'
    }

    if (
      startDate &&
      endDate &&
      dateComparing(startDate, dayjs().subtract(1, 'month').startOf('month')) &&
      dateComparing(endDate, dayjs().subtract(1, 'month').endOf('month'))
    ) {
      return 'last-month'
    }

    return 'custom'
  }, [dayjs, endDate, startDate])

  const dateRangeValue = (
    start: Date,
    end: Date
  ): {
    startDate: string
    endDate: string
  } => ({
    startDate: dayjs(start).startOf('day').format('YYYY-MM-DD'),
    endDate: dayjs(end).endOf('day').format('YYYY-MM-DD')
  })

  const setPreset = (start: Date, end: Date) => {
    setStartDate(start)
    setEndDate(end)

    setOpenCalendar(false)
  }

  useEffect(() => {
    if (startDate && endDate) {
      setOpenCalendar(false)
    }
  }, [startDate, endDate])

  return (
    <LabelWrapper label={label || ''}>
      <Datepicker
        placeholderText={placeholder}
        startDate={startDate}
        endDate={endDate}
        name='filter-date-range'
        monthsShown={2}
        selectsRange
        disabled={disabled}
        onChange={date => {
          setStartDate(date[0])
          setEndDate(date[1])
          if (date[1] && startDate) {
            setDateFilter(dateRangeValue(startDate, date[1]))
          }
        }}
        open={openCalendar}
        onFocus={() => setOpenCalendar(true)}
        onCalendarOpen={() => setOpenCalendar(true)}
        portalId='mui-popover'
        popperClassName='z-[1400]'
        popperContainer={({ children }) => (
          <StyledReactDatePicker>
            <section>{children}</section>
          </StyledReactDatePicker>
        )}
        calendarContainer={({ children, className }) => (
          <section className={cn('flex overflow-hidden', className)}>
            {/** Preset Button Group */}
            <div className='flex w-28 flex-col gap-1 border-r px-[2px] py-3 sm:w-40 sm:px-2'>
              <MenuList dense>
                <StyledMenuItem
                  onClick={() => {
                    setStartDate(null)
                    setEndDate(null)
                  }}
                  selected={presetActive === 'custom'}
                >
                  Custom
                </StyledMenuItem>
                <StyledMenuItem onClick={() => setPreset(new Date(), new Date())} selected={presetActive === 'today'}>
                  Hari ini
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => {
                    setPreset(dayjs().subtract(1, 'day').toDate(), dayjs().subtract(1, 'day').toDate())
                  }}
                  selected={presetActive === 'yesterday'}
                >
                  Kemarin
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => {
                    setPreset(dayjs().startOf('isoWeek').toDate(), dayjs().endOf('isoWeek').toDate())
                  }}
                  selected={presetActive === 'this-week'}
                >
                  Minggu ini
                </StyledMenuItem>

                <StyledMenuItem
                  onClick={() => {
                    setPreset(dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate())
                  }}
                  selected={presetActive === 'this-month'}
                >
                  Bulan ini
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => {
                    setPreset(
                      dayjs().subtract(1, 'month').startOf('month').toDate(),
                      dayjs().subtract(1, 'month').endOf('month').toDate()
                    )
                  }}
                  selected={presetActive === 'last-month'}
                >
                  Bulan Kemarin
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => {
                    setPreset(dayjs().subtract(6, 'day').toDate(), new Date())
                  }}
                  selected={presetActive === 'last-7-days'}
                >
                  7 Hari terakhir
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => {
                    setPreset(dayjs().subtract(29, 'day').toDate(), new Date())
                  }}
                  selected={presetActive === 'last-30-days'}
                >
                  30 Hari Terakhir
                </StyledMenuItem>
              </MenuList>
            </div>

            {/** Calendar */}
            <div className='relative flex flex-col justify-center sm:flex-row'>{children}</div>
          </section>
        )}
        customInput={
          <TextField
            placeholder={placeholder}
            fullWidth
            size='small'
            InputProps={{
              endAdornment: <i className={`ri-calendar-line mr-[1.5px] ${(startDate || endDate) && 'hidden'}`} />
            }}
          />
        }
        className={className}
      />
    </LabelWrapper>
  )
}

export const StyledMenuItem = (props: MenuItemProps) => {
  return (
    <MenuItem className='overflow-hidden px-2 sm:px-4' {...props}>
      {props.children}
    </MenuItem>
  )
}
