import { z } from 'zod'

export const passwordForm = z
  .object({
    currentPassword: z.string().min(1, { message: 'Harus di isi !' }),
    newPassword: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(/[a-z]/, 'Minimal ada 1 huruf kecil (a-z)')
      .regex(/[A-Z]/, 'Minimal ada 1 huruf besar (A-Z)')
      .regex(/[0-9]/, 'Minimal ada 1 angka (0-9)')
      .regex(/[^A-Za-z0-9]/, 'Minimal ada 1 simbol (contoh: !@#$%^&*)')
      .refine(val => !/\s/.test(val), 'Tidak boleh mengandung spasi'),
    newPasswordConfirmation: z.string().min(1, { message: 'Harus di isi !' })
  })
  .refine(data => data.newPassword === data.newPasswordConfirmation, {
    path: ['newPasswordConfirmation'], // error diarahkan ke field replayPassword
    message: 'Password tidak sama'
  })

export type passwordFormType = z.infer<typeof passwordForm>
