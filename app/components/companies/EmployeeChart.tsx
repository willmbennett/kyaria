'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

type EmployeeCategory = {
  firstHireDate: {
    str: string;
    precision: number;
    timestamp: number;
  };
  category: string;
  nbEmployees: number;
};

type EmployeeChartProps = {
  employeeCategories: EmployeeCategory[];
};

const EmployeeChart: React.FC<EmployeeChartProps> = ({ employeeCategories }) => {
  // Check if employeeCategories is an array
  if (!Array.isArray(employeeCategories)) {
    return <div>Invalid data</div>; // Return some fallback content or an error message
  }

  const sortedFilteredData = employeeCategories
    .filter((e) => typeof e.category === 'string')
    .sort((a, b) => b.nbEmployees - a.nbEmployees)
    .slice(0, 9);

  // Extract labels and data from sortedFilteredData
  const labels = sortedFilteredData.map((e) => e.category);
  const data = sortedFilteredData.map((e) => e.nbEmployees);

  const chartData = {
    labels,
    datasets: [
      {
        label: '# of employees',
        data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 5,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true,
        text: 'Top 10 Categories of Employees',
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} className='w-full flex' options={options} />
    </div>
  );
};

export default EmployeeChart;
