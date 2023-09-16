'use client'

import { useContext } from 'react';
import { JobContext } from '../../../components/jobs/JobContext';

export default function Page() {
    let { companyData } = useContext(JobContext);

    return (
        <div className='w-full'>
            <h1 className="text-4xl sm:text-6xl text-4xlmax-w-[708px] font-bold text-slate-900 mb-8">
                {companyData.name}
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Size:</strong> {companyData.details.size}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">Overview</h2>
                <p className="text-left mb-8">
                    {companyData.details.overview}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">Mission</h2>
                <p className="text-left mb-8">
                {companyData.details.mission}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">Culture</h2>
                <p className="text-left mb-8">
                {companyData.details.culture}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">Core Product</h2>
                <p className="text-left mb-8">
                {companyData.details.coreProduct}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">Corperate Priorities</h2>
                <p className="text-left mb-8">
                {companyData.details.corperatePriorities}
                </p>
            </div>
        </div>
    );
}
