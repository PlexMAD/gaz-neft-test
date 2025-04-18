import { FC } from 'react';
import { Metric } from '../store/store';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MetricChartsProps extends Omit<Metric, 'metric_id' | 'datetime' | 'node_id'> {}

export const options: ChartOptions<'bar'> = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: {
      display: false, 
    },
    title: {
      display: false, 
    },
  },
  scales: {
    y: {
      ticks: {
        display: false, 
      },
      grid: {
        display: false, 
      },
    },
    x: {
      grid: {
        display: false, 
      },
      ticks: {
        display: false, 
      },
    },
  },
};

const MetricCharts: FC<MetricChartsProps> = ({ cpu_utilization, disk_utilization, memory_utilization }) => {
  const data = {
    labels: ['CPU', 'Disk', 'Memory'],
    datasets: [
      {
        data: [cpu_utilization, disk_utilization, memory_utilization],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderRadius: 1,
        barThickness: 10, 
      },
    ],
  };

  return (
    <div style={{ width: '150px', height: '50px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default MetricCharts;
