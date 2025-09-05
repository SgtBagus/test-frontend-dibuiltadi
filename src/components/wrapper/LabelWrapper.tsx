import { HTMLProps, ReactNode } from 'react'
import { Tooltip, Typography, type TypographyVariant } from '@mui/material'

import { cn } from '@/utils/cn'

export default function LabelWrapper({
  label,
  labelVariant,
  tooltip,
  children,
  className,
  labelClassName,
  childrenClassName,
  direction = 'vertical',
  required = false,
  alwaysHorizontal,
  EndLabelComponent,
  labelAlign = 'center',
  labelValueRatio = '1/2'
}: {
  label: string
  labelVariant?: TypographyVariant
  tooltip?: string | ReactNode
  children: ReactNode
  className?: HTMLProps<HTMLElement>['className']
  labelClassName?: HTMLProps<HTMLElement>['className']
  childrenClassName?: HTMLProps<HTMLElement>['className']
  direction?: 'vertical' | 'horizontal'
  required?: boolean
  alwaysHorizontal?: boolean
  EndLabelComponent?: ReactNode
  labelAlign?: 'top' | 'center'

  /**
   * Defines the ratio of label to value in the layout.
   * - '1/2': Label takes 1/3 of the space, value takes 2/3.
   * - '2/3': Label takes 2/5 of the space, value takes 3/5.
   * - '1/1': Label and value take equal space.
   * @default '1/2'
   */
  labelValueRatio?: '1/2' | '2/3' | '1/1'
}) {
  return (
    <div
      className={cn(
        'grid gap-1',
        { 'grid-cols-3': labelValueRatio === '1/2' },
        { 'grid-cols-5': labelValueRatio === '2/3' },
        { 'grid-cols-2': labelValueRatio === '1/1' },
        !alwaysHorizontal && 'max-md:grid-cols-1',
        className
      )}
    >
      <div
        className={cn(
          'flex gap-1',
          labelAlign === 'top' ? 'mt-2 items-start' : 'items-center',
          {
            'col-span-1': direction === 'horizontal' && (labelValueRatio === '1/2' || labelValueRatio === '1/1'),
            'col-span-2': direction === 'horizontal' && labelValueRatio === '2/3'
          },
          {
            'col-span-3': direction === 'vertical' && labelValueRatio === '1/2',
            'col-span-5': direction === 'vertical' && labelValueRatio === '2/3',
            'col-span-2': direction === 'vertical' && labelValueRatio === '1/1'
          }
        )}
      >
        <Typography variant={labelVariant || 'h6'} className={cn('text-pretty font-semibold', labelClassName)}>
          {label}
          {required && <span className='text-red-500'> *</span>}
          {tooltip && (
            <Tooltip title={tooltip}>
              <i className={`ri-information-line relative top-[3px] ml-1 size-4`} />
            </Tooltip>
          )}
        </Typography>

        {EndLabelComponent && (
          <>
            <div className='mr-2 flex grow items-center justify-end'>{EndLabelComponent}</div>
          </>
        )}
      </div>
      <div
        className={cn(
          {
            'col-span-2': direction === 'horizontal' && labelValueRatio === '1/2',
            'col-span-1': direction === 'horizontal' && labelValueRatio === '1/1',
            'col-span-3': direction === 'horizontal' && labelValueRatio === '2/3'
          },
          {
            'col-span-3': direction === 'vertical' && labelValueRatio === '1/2',
            'col-span-5': direction === 'vertical' && labelValueRatio === '2/3',
            'col-span-2': direction === 'vertical' && labelValueRatio === '1/1'
          },
          childrenClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
