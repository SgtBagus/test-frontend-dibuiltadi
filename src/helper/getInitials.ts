export const getInitials = (name: string, number = 3) => {
  if (!name) return ''

  // split nama berdasarkan spasi, ambil huruf pertama tiap kata
  const initials = name
    .split(' ')
    .filter(word => word.length > 0) // buang spasi kosong
    .map(word => word[0].toUpperCase())
    .join('')

  // limit inisial max 3 huruf
  return initials.slice(0, number)
}
