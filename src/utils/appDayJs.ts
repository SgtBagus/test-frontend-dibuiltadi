import dayjs from 'dayjs'
import dayjsId from 'dayjs/locale/id'

import dayjsRelativeTime from 'dayjs/plugin/relativeTime'
import dayjsTimezone from 'dayjs/plugin/timezone'
import dayjsUtc from 'dayjs/plugin/utc'
import isoWeek from 'dayjs/plugin/isoWeek'
import updateLocale from 'dayjs/plugin/updateLocale'

export const parseDateTime = (dateTimeString: string) => {
  if (!dateTimeString || typeof dateTimeString !== 'string') {
    throw new Error('Invalid date string')
  }

  // Parse the date string directly
  const parsedDate = new Date(dateTimeString)

  // Check if parsing failed
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date string format')
  }

  return parsedDate
}

export const appDayJs = (value: Date | string) => {
  if (typeof value === 'string') {
    value = parseDateTime(value)
  }

  // prevent other locales from being used, always fallback to 'en'
  dayjs.locale(dayjsId)
  dayjs.extend(dayjsUtc)
  dayjs.extend(dayjsTimezone)
  dayjs.extend(dayjsRelativeTime)
  dayjs.extend(isoWeek)
  dayjs.extend(updateLocale)

  // Update label dalam locale 'id'
  dayjs.updateLocale('id', {
    relativeTime: {
      future: '%s lagi',
      past: '%s yang lalu',
      s: 'beberapa detik',
      m: 'semenit',
      mm: '%d menit',
      h: 'sejam',
      hh: '%d jam',
      d: 'sehari',
      dd: '%d hari',
      M: 'sebulan',
      MM: '%d bulan',
      y: 'setahun',
      yy: '%d tahun'
    }
  })

  const output = dayjs(value)

  // catch invalid timezone and returns original value
  try {
    return output
  } catch (e: unknown) {
    // console.error(`Unkown timezone: ${timezone}`)
    return output // fallback to original value
  }
}
