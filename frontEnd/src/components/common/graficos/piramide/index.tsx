import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import IEspecialidadeVendidas from 'src/interfaces/especialidadeTop'

interface PiramideChart {
  especialidade: IEspecialidadeVendidas[]
}

const PiramideChart: React.FC<PiramideChart> = ({ especialidade }) => {
  const [values, setValues] = useState<number[]>([])
  const [name, setNames] = useState<string[]>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newValues = especialidade.map(obj => obj.quantidade!)
      const newNames = especialidade.map(obj => obj.especialidade!.nome!)
      setNames(newNames)
      setValues(newValues)
      console.log(newNames)
      window.dispatchEvent(new Event('resize'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [especialidade])
  const data = {
    options: {
      xaxis: {
        categories: name,
      },
      stroke: {
        width: 1,
        colors: ['#000000'],
      },
      yaxis: {
        title: {
          text: 'valores',
        },
      },
      colors: ['#F44F5E', '#E55A89', '#8D95EB', '#62ACEA', '#4BC3E6'],
      tooltip: {
        theme: 'dark',
        x: {
          show: true,
        },
        y: {
          title: {
            formatter: function () {
              return ''
            },
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          distributed: true,
          horizontal: true,
          barHeight: '80%',
          isFunnel: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (
          val: number,
          opt: {
            w: { globals: { labels: { [x: string]: string } } }
            dataPointIndex: string | number
          }
        ) {
          return (
            opt.w.globals.labels[opt.dataPointIndex] +
            ':  ' +
            val.toLocaleString('pt-br', { minimumFractionDigits: 2 })
          )
        },
        dropShadow: {
          enabled: true,
        },
      },
      legend: {
        show: false,
      },
    },
  }
  const series = [
    {
      name: '',
      data: values,
    },
  ]
  return (
    <div className="donut">
      <Chart options={data.options} series={series} type="bar" width="380" />
    </div>
  )
}

export default PiramideChart

// export default function PiramideChart() {
//   const data = {
//     options: {
//       chart: {
//         id: 'basic-bar',
//       },
//       xaxis: {
//         categories: [1991, 1992, 1993, 1994, 1995],
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 0,
//           horizontal: true,
//           barHeight: '80%',
//           isFunnel: true,
//         },
//       },
//       legend: {
//         show: false,
//       },
//     },
//   }
//   const series = [
//     {
//       name: 'Funnel Series',
//       data: [1380, 1100, 990, 880, 740, 548, 330, 200],
//     },
//   ]
//   return (
//     <div className="donut">
//       <Chart options={data.options} series={series} type="bar" width="380" />
//     </div>
//   )
// }
