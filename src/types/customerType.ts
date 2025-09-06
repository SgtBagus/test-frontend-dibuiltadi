import { CityType, ProvinceType } from './locations'

export type CustomerType = {
  address: string
  areaCode: string
  city: CityType
  code: string
  companyType: string
  name: string
  province: ProvinceType
  subdistrict: string | null
  type: string
}
