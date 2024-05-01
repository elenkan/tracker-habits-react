import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import type { ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useEffect, useRef, useState } from 'react'
import { createGradient } from './lib/createGradient'
import './difficulty-chart.scss'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

interface Props {
  colorsValue: number[]
}

const DifficultyChart = ({ colorsValue }: Props) => {
  const chartRef = useRef<ChartJS<'line', number[], string>>(null)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })
  const labels = ['Сложно', 'Средне', 'Легко']
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        max: 100,
        offset: true,
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  }

  const lineChartData = {
    labels,
    datasets: [
      {
        data: colorsValue,
        lineTension: 0.5,
      },
    ],
  }

  useEffect(() => {
    const chart = chartRef.current

    if (!chart) {
      return
    }

    const chartData = {
      ...lineChartData,
      datasets: lineChartData.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    }

    setChartData(chartData)
  }, [])

  return (
    <div className="difficulty-chart-container">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  )
}

export default DifficultyChart
