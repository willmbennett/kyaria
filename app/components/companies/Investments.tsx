'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';
import InvestmentsOverTime from './InvestmentsOverTime';

// Define an interface for the formatted investment objects
export interface FormattedInvestment {
  date: {
    str: string;
    precision: number;
    timestamp: number;
  };
  isCurrent: boolean;
  series: string;
  investors: any[];
  amount?: {
    currency: string;
    value: number;
  };
  formattedDate: string;
  formattedAmount: string;
}

interface Investment {
  date: {
    str: string;
    precision: number;
    timestamp: number;
  };
  amount?: {
    currency: string;
    value: number;
  };
  isCurrent: boolean;
  series: string;
  investors: any[];
}

interface InvestmentsProps {
  investments: Investment[];
}

const Investments: React.FC<InvestmentsProps> = ({ investments }) => {
  const [showInvestments, setShowInvestments] = useState(false);

  // Preprocess the investments data and annotate the type
  const formattedInvestments: FormattedInvestment[] = investments.map((investment: any) => {
    const formattedDate = format(new Date(investment.date.timestamp), 'MMM d, yyyy');
    const formattedAmount = investment.amount
      ? `${investment.amount.currency} ${(investment.amount.value / 1000000).toFixed(0)}M`
      : '';
    return {
      ...investment,
      formattedDate,
      formattedAmount,
    };
  });

  return (
    <>
      {/* Investments Section */}
      <InvestmentsOverTime investments={formattedInvestments} />

      <button
        className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        onClick={() => setShowInvestments(!showInvestments)}
      >
        {showInvestments ? 'Hide Investments' : 'Show Investments'}
        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {formattedInvestments.length > 0 && showInvestments && (
        <div>
          {formattedInvestments.map((investment: any, index: number) => (
            <div key={index} className="bg-white p-4 rounded shadow-md mb-4">
              <h3 className="text-xl font-semibold">{investment.series}</h3>
              <p className="text-gray-600">Date: {investment.formattedDate}</p>
              {investment.amount && (
                <p className="text-gray-600">Amount: {investment.formattedAmount}</p>
              )}
              <h4 className="mt-2">Investors:</h4>
              <div className="flex flex-wrap">
                {investment.investors.map((investor: any, investorIndex: number) => (
                  <div key={investorIndex} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                    <div className="bg-white p-2 rounded shadow-md h-full flex flex-col">
                      <img
                        src={investor.image}
                        alt={`${investor.name} Image`}
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                      <p className="text-gray-700 text-center flex-grow">{investor.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Investments;
