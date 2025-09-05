import Link from 'next/link'

export default function NotFound() {
  return (
    <section className='h-full bg-white dark:bg-gray-900'>
      <div className='mx-auto h-full max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto flex h-full max-w-screen-sm flex-col items-center justify-center text-center'>
          <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white'>
            Maaf, halamanya gak ada ini !
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            Kembali ke halaman awal aja, soalnya gak ada apa apa disini.
          </p>
          <Link
            href='/'
            className='bg-primary-600 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4'
          >
            Kembali ke halaman awal
          </Link>
        </div>
      </div>
    </section>
  )
}
