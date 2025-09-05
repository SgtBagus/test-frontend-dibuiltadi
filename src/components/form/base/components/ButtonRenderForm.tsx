import { ZodSchema } from 'zod'

import { Button } from '@mui/material'

import { ButtonCustomType, CustomButtonSubmitParamTypes, FormTypeScript } from '../type/DefaultFormType'

type DefaultButtonRenderForm<T extends ZodSchema> = {
  params: CustomButtonSubmitParamTypes<T>

  isLoading: boolean
  hideButtonCancel: boolean

  onClickButtonCancel: () => void
}

export default function ButtonRenderForm<T extends ZodSchema>({
  params,
  customButtons,

  isLoading = false,
  hideButtonCancel = false,

  buttonSubmit,
  onClickButtonCancel
}: DefaultButtonRenderForm<T> & ButtonCustomType<T> & FormTypeScript) {
  return (
    <>
      {customButtons ? (
        customButtons(params)
      ) : (
        <div className='flex items-center gap-2'>
          <Button
            onClick={params.onSubmit}
            variant={buttonSubmit?.variant || 'contained'}
            color={buttonSubmit?.color || 'primary'}
            loading={isLoading}
            disabled={buttonSubmit?.disabled}
            {...(buttonSubmit?.icon && {
              startIcon: <i className={buttonSubmit.icon} />
            })}
          >
            {buttonSubmit?.label || 'Kirim'}
          </Button>

          {!hideButtonCancel && (
            <Button
              type='button'
              variant='contained'
              color='secondary'
              onClick={onClickButtonCancel}
              loading={isLoading}
              className='m-0'
            >
              Kembali
            </Button>
          )}
        </div>
      )}
    </>
  )
}
