import { z } from 'zod'

export const customerFormSchema = z.object({
  name: z.string().min(1, { message: 'Harus di isi !' }),
  identityNo: z.string().optional().nullable(),
  npwp: z.string().optional().nullable(),
  email: z.string().email({ message: 'Format Email harus benar' }).optional().nullable().or(z.literal('')), // biar kosong juga lolos validasi
  phone: z.string().optional().nullable(),
  mobile_phone: z.string().optional().nullable(),
  provinceCode: z.string().min(1, { message: 'Harus di isi !' }),
  cityCode: z.string().min(1, { message: 'Harus di isi !' }),
  address: z.string().min(1, { message: 'Harus di isi !' }),
  companyType: z.string().min(1, { message: 'Harus di isi !' })
})

export type customerFormSchemaType = z.infer<typeof customerFormSchema>
