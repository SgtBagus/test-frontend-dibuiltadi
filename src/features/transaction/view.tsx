'use client'

import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  type Theme
} from '@mui/material'

import { useModalContext } from '@/context/toggleModalContext'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/api/apiFetch'
import { TransactionsViewType } from '@/types/transactionType'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/utils/getErrorMessage'
import LabelWrapper from '@/components/wrapper/LabelWrapper'
import { dateFormatId } from '@/utils/dateFormatId'
import { currencyId } from '@/utils/currencyId'

export const modalNameViewTransaction = 'viewTransaction'

export default function TransactionView() {
  const [data, setData] = useState<TransactionsViewType>()
  const [isLoading, setIsLoading] = useState(false)

  const { getModalState, setModalState } = useModalContext()
  const { open, data: dataModal } = getModalState(modalNameViewTransaction)

  const { code } = dataModal as unknown as { code: string }

  const fetchView = async () => {
    try {
      setIsLoading(true)
      const res: TransactionsViewType = await apiFetch(`/transactions/${code}`)
      setData(res)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchView()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const breakpointReached = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Dialog
      open={open}
      maxWidth='lg'
      fullWidth
      fullScreen={breakpointReached}
      onClose={() => setModalState(modalNameViewTransaction, false)}
    >
      <IconButton
        aria-label='close'
        onClick={() => setModalState(modalNameViewTransaction, false)}
        sx={theme => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500]
        })}
      >
        <i className='ri-close-line' />
      </IconButton>
      <DialogTitle>Detail Transaksi</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <CircularProgress />
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='No. Invoice'>{data?.referenceNo || '-'}</LabelWrapper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='Pelanggan'>{data?.customer?.name || '-'}</LabelWrapper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='Kode Customer'>{data?.customer?.code || '-'}</LabelWrapper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='Sales'>{data?.sales || '-'}</LabelWrapper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='Tanggal Order'>
                  {(() => {
                    const { date, month, year } = dateFormatId(data?.dateOrder || '')
                    return `${date} ${month} ${year}`
                  })()}
                </LabelWrapper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='Jatuh Tempo'>
                  {(() => {
                    const { date, month, year } = dateFormatId(data?.dateDue || '')
                    return `${date} ${month} ${year}`
                  })()}
                </LabelWrapper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='Tanggal Dibayar'>
                  {(() => {
                    const { date, month, year } = dateFormatId(data?.paidAt || '')
                    return `${date} ${month} ${year}`
                  })()}
                </LabelWrapper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <LabelWrapper label='Dibuat Pada'>
                  {(() => {
                    const { date, month, year } = dateFormatId(data?.createdAt || '')
                    return `${date} ${month} ${year}`
                  })()}
                </LabelWrapper>
              </Grid2>
            </Grid2>

            <Divider sx={{ my: 2 }} />

            <LabelWrapper label='List Barang'>
              <TableContainer className='rounded border' component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Produk</TableCell>
                      <TableCell align='right'>Qty</TableCell>
                      <TableCell align='right'>Harga</TableCell>
                      <TableCell align='right'>Subtotal</TableCell>
                      <TableCell align='right'>Diskon</TableCell>
                      <TableCell align='right'>Margin Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.items?.map(
                      ({ discount, marginSubtotal, price, priceSubtotal, productName, quantity }, idx) => (
                        <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>{productName}</TableCell>
                          <TableCell align='right'>{quantity}</TableCell>
                          <TableCell align='right'>{price}</TableCell>
                          <TableCell align='right'>{priceSubtotal}</TableCell>
                          <TableCell align='right'>{discount}</TableCell>
                          <TableCell align='right'>{marginSubtotal}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </LabelWrapper>

            <div className='my-2 flex flex-row-reverse gap-2'>
              <Stack gap={4} className='w-[300px]'>
                <LabelWrapper label='Subtotal' direction='horizontal' className='flex justify-between'>
                  {currencyId(data?.amountUntaxed || 0)}
                </LabelWrapper>
                <LabelWrapper label='Subtotal' direction='horizontal' className='flex justify-between'>
                  {currencyId(data?.amountTotal || 0)}
                </LabelWrapper>
                <Divider sx={{ my: 1 }} />
                <LabelWrapper
                  label='Sisa Tagihan'
                  direction='horizontal'
                  labelVariant='h5'
                  className='flex justify-between'
                >
                  <Typography variant='h5' className='font-semibold text-primary'>
                    {currencyId(data?.amountDue || 0)}
                  </Typography>
                </LabelWrapper>
              </Stack>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
