export interface TransactionsListType {
  referenceNo: string
  customer: {
    code: string
    name: string
  }
  sales: string
  amountDue: string
  amountUntaxed: string
  amountTotal: string
  dateOrder: string
  dateDue: string
  paidAt: string
  createdAt: string
}

export interface TransactionsViewType {
  responseCode: string
  responseMessage: string
  referenceNo: string
  customer: {
    code: string
    name: string
  }
  sales: string
  items: Item[]
  amountDue: string
  amountUntaxed: string
  amountTotal: string
  dateOrder: string
  dateDue: string
  paidAt: string
  createdAt: string
}

export interface Item {
  productName: string
  quantity: string
  price: string
  discount: string
  priceSubtotal: string
  marginSubtotal: string
}
