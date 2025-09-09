export const dateFormatId: (dateString: string) => {
  date: string
  month: string
  monthShort: string
  monthNumber: string
  year: number
  hour: string
  minute: string
  second: string
} = dateString => {
  const idMonths = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  const idMonthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

  const date = new Date(dateString)

  const dateReturn = date.getDate().toString().padStart(2, '0')
  const month = idMonths[date.getMonth()]
  const monthShort = idMonthsShort[date.getMonth()]
  const monthNumber = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')

  return {
    date: dateReturn,
    month,
    monthShort,
    monthNumber,
    year,
    hour,
    minute,
    second
  }
}
