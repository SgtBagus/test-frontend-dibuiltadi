'use client'

import ModeDropdown from '@/components/layout/ModeDropdown'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex h-screen w-screen overflow-hidden'>
      {/* Left image */}
      <div className='relative hidden h-full w-full max-md:hidden md:flex'>
        <img
          src='https://images.pexels.com/photos/1000444/pexels-photo-1000444.jpeg?cs=srgb&dl=pexels-belle-co-99483-1000444.jpg&fm=jpg'
          alt='character-illustration'
          className='h-full w-full object-cover'
        />
      </div>

      {/* Right panel */}
      <div className='flex h-full w-full max-w-[480px] flex-col justify-center bg-backgroundPaper p-6 md:p-12'>
        <div className='absolute right-0 top-0 mr-7 space-x-1 p-3.5 max-sm:mr-1'>
          <ModeDropdown />
        </div>
        <div className='flex flex-col gap-2'>{children}</div>
      </div>
    </div>
  )
}
