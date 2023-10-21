import React from 'react';
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FormattedInvestment } from './Investments';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

interface InvestmentsOverTimeProps {
    investments: FormattedInvestment[];
}

const InvestmentsOverTime: React.FC<InvestmentsOverTimeProps> = ({ investments }) => {

    const cumulativeData = investments.map((investment, index) => ({
        x: new Date(investment.date.timestamp),
        y: calculateCumulativeSum(investments, index) / 1000000, // Divide by 1,000,000 for millions
    }));

    function calculateCumulativeSum(data: any, index: number) {
        // Calculate the cumulative sum up to the current index
        let cumulativeSum = 0;
        for (let i = 0; i <= index; i++) {
            const currentInvestment = data[i];
            if (currentInvestment.amount) {
                cumulativeSum += currentInvestment.amount.value;
            }
        }
        return cumulativeSum;
    }


    // Configure your chart options
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Investments Over Time',
        },
    },
    scales: {
        x: {
            type: 'timeseries' as const, // Explicitly set the type to 'timeseries'
            title: {
                display: true,
                text: 'Date',
            },
        },
        y: {
            type: 'linear' as const, // Explicitly set the type to 'linear'
            display: true,
            position: 'left' as const,
            title: {
                display: true,
                text: 'Amount (Millions)',
            },
            ticks: {
                callback: (value: any) => {
                    return (value / 1000000).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                    }) + 'M';
                },
            },
        },
    },
};




    const data = {
        datasets: [
            {
                data: cumulativeData,
                label: 'Money Raised',
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: true,
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export default InvestmentsOverTime;
