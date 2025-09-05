import { z } from 'zod'

export const passwordRules = (password: string) => [
  { label: 'Minimal 8 karakter', valid: password.length >= 8 },
  { label: 'Ada huruf kecil (a-z)', valid: /[a-z]/.test(password) },
  { label: 'Ada huruf besar (A-Z)', valid: /[A-Z]/.test(password) },
  { label: 'Ada angka (0-9)', valid: /[0-9]/.test(password) },
  { label: 'Ada simbol (!@#$%^&*)', valid: /[^A-Za-z0-9]/.test(password) },
  { label: 'Tidak ada spasi', valid: !/\s/.test(password) }
]

export const registerForm = z.object({
  name: z.string().min(1, { message: 'Harus di isi' }),
  phone: z.string().min(1, { message: 'Harus di isi' }),
  address: z.string().optional(),
  email: z.string().email({ message: 'Format Email harus benar' }),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[a-z]/, 'Minimal ada 1 huruf kecil (a-z)')
    .regex(/[A-Z]/, 'Minimal ada 1 huruf besar (A-Z)')
    .regex(/[0-9]/, 'Minimal ada 1 angka (0-9)')
    .regex(/[^A-Za-z0-9]/, 'Minimal ada 1 simbol (contoh: !@#$%^&*)')
    .refine(val => !/\s/.test(val), 'Tidak boleh mengandung spasi')
})

export type registerFormType = z.infer<typeof registerForm>
