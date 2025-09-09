import { appDayJs } from '@/utils/appDayJs'
import { currencyCompactId, currencyId } from '@/utils/currencyId'
import { dateFormatId } from '@/utils/dateFormatId'
import Chart from 'react-apexcharts'

type ChartTooltipContext = {
  series: number[][]
  seriesIndex: number
  dataPointIndex: number
  w: any
}

export type ChartDataTooltipProps = {
  title: string
  lines: string[]
}

export default function Charts({
  data
}: {
  data: {
    date: string
    amount: string | number
  }[]
}) {
  const renderTooltip = (dataSeries: number, index: number) => {
    return `<div style="
      background-color: var(--mui-palette-background-paper);
      overflow: hidden;
      color: var(--mui-palette-text-primary);
      padding: 12px;
      font-size: 12px;
      border-radius: var(--mui-shape-borderRadius);
      border: 1px solid var(--mui-palette-divider);
    ">
    <div style="font-weight: 600; margin-bottom: 4px;">${data[index].date}</div>
    ${currencyId(dataSeries)}
    </div>
    `
  }

  const options: ApexCharts.ApexOptions = {
    responsive: [
      {
        options: {
          chart: {
            width: '100%'
          }
        }
      }
    ],
    grid: {
      borderColor: 'var(--mui-palette-divider)',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      theme: 'custom',
      style: {
        fontSize: '14px',
        fontFamily: 'var(--mui-typography-fontFamily)'
      },
      custom: (context: ChartTooltipContext) => {
        return renderTooltip(
          context.series[context['seriesIndex']][context['dataPointIndex']],
          context['dataPointIndex']
        )
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    yaxis: {
      labels: {
        style: {
          colors: 'var(--mui-palette-text-primary)',
          fontSize: '14px'
        },
        formatter: value => {
          return currencyCompactId(value || 0)
        }
      }
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6, // jumlah label yang ditampilkan
      tickPlacement: 'on',
      axisBorder: {
        color: 'var(--mui-palette-divider)'
      },
      axisTicks: {
        color: 'var(--mui-palette-divider)'
      },
      labels: {
        showDuplicates: false,
        style: {
          colors: 'var(--mui-palette-text-primary)',
          fontSize: '14px'
        },
        formatter: value => {
          const { date, monthShort, year } = dateFormatId(value)
          return `${date} ${monthShort} ${year}`
        }
      },
      tooltip: {
        enabled: false
      }
    },
    legend: {
      fontSize: '14px',
      labels: {
        colors: 'var(--mui-palette-text-primary)'
      }
    }
  }

  return (
    <Chart
      type='area'
      height={280}
      options={options}
      series={[
        {
          name: 'Daily Sales',
          data: data.map(x => ({
            x: appDayJs(x.date).toISOString(),
            y: x.amount
          }))
        }
      ]}
    />
  )
}
