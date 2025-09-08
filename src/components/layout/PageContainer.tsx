'use client'

import NextLink from 'next/link'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { PropsWithChildren, ReactNode, useEffect } from 'react'
import { useMenuContext } from '@/context/menuContext'

import { MenuKeyAdminListType } from '@/configs/navigation/menuKeyList'
import useClientMetaData from '@/hooks/useClientMetaData'

export type BreadcrumbsItem = {
  href?: string
  label: string
}

type PageContainerProps = {
  title: string
  breadcrumbs?: BreadcrumbsItem[]
  additionalRightComponent?: ReactNode
  createdAt?: string
  updatedAt?: string
  activeMenuKey?: MenuKeyAdminListType
  AfterTitleComponent?: ReactNode
}

export default function PageContainer({
  children,
  title,
  breadcrumbs,
  additionalRightComponent,
  activeMenuKey,
  AfterTitleComponent
}: PropsWithChildren<PageContainerProps>) {
  useClientMetaData({ title: title })

  const { setActiveMenuKey } = useMenuContext()

  useEffect(() => {
    setActiveMenuKey(activeMenuKey ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenuKey])

  return (
    <div className='mt-2'>
      {/** Temporary disabled this feature */}
      {/* <NotificationAlert /> */}

      <div className='flex flex-col md:flex-row md:items-center'>
        <div>
          <Typography variant='h3' className='text-left'>
            {title}
            {AfterTitleComponent}
          </Typography>
          <Breadcrumbs aria-label='breadcrumb' separator='&rsaquo;'>
            {breadcrumbs?.map((d, i) => (
              <div key={i}>
                {d.href ? (
                  <Link component={NextLink} href={d.href} variant='body2' underline='hover'>
                    {d.label}
                  </Link>
                ) : (
                  <Typography variant='body2'>{d.label}</Typography>
                )}
              </div>
            ))}
          </Breadcrumbs>
        </div>

        {additionalRightComponent && (
          <div className='flex flex-col-reverse gap-1 max-md:mt-2 sm:flex-row sm:gap-1 md:ml-auto'>
            {additionalRightComponent}
          </div>
        )}
      </div>

      <div className='mt-8'>{children}</div>
    </div>
  )
}
