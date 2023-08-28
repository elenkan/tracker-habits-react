import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ChartArea,
  ChartData
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {useEffect, useRef, useState} from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

type PropsType = {
  colorsValue: number[]
}

const MoodStatistics = ({colorsValue}: PropsType) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });
  const labels = ['Сложно','Средне', 'Легко']
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        max: 100,
        offset: true,
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = '#cc6699';
    const colorMid = '#08d9d6';
    const colorEnd = '#66ff66';

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0.2, colorStart);
    gradient.addColorStop(0.4, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
  }

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        data: colorsValue,
        lineTension: 0.5
      }
    ]
  }

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...lineChartData,
      datasets: lineChartData.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <Line
      ref={chartRef}
      data={chartData}
      options={options}
    />
  );
};

export default MoodStatistics;
