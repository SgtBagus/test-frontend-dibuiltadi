import { CityType, ProvinceType } from './locations'

export type CustomerListType = {
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

export interface CustomerDetailType {
  responseCode: string
  responseMessage: string
  code: string
  name: string
  type: string
  companyType: string
  identityNo: string
  npwp: string
  email: string
  phone: string
  mobilePhone: string
  area: string
  province: ProvinceType
  city: CityType
  address: string
  group: {
    code: string
    name: string
  }
  status: string
  target: string
  achievement: string
  percentage: string
  createdAt: string
}
