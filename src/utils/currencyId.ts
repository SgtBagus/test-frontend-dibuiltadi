export const currencyId = (value: string | number): string => {
  // pastikan value jadi number
  const number = typeof value === 'string' ? parseFloat(value) : value

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

export const currencyCompactId = (value: string | number): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value

  return `Rp ${new Intl.NumberFormat('id-ID', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 0
  }).format(number)}`
}
