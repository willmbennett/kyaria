'use client'
import demoJob from '../../../examples/example_job.json'

export default function Page() {
    const jobData = demoJob;

  return (
    <div>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
            {jobData["Job Title"]}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <p className="text-left font-medium text-lg mb-4">
                <strong>Company:</strong> {jobData["Company"]}
            </p>
            <p className="text-left font-medium text-lg mb-4">
                <strong>Location:</strong> {jobData["Location"]}
            </p>
            <p className="text-left font-medium text-lg mb-4">
                <strong>Employment Type:</strong> {jobData["Employment Type"]}
            </p>
            <p className="text-left font-medium text-lg mb-4">
                <strong>Salary Range:</strong> {jobData["Salary Range"]}
            </p>
            <p className="text-left font-medium text-lg mb-4">
                <strong>Remote:</strong> {jobData["Remote"]}
            </p>
            <h2 className="text-left font-bold text-2xl mb-4">Job Description</h2>
            <p className="text-left mb-8">
                {jobData["Job Description"]}
            </p>
            <h2 className="text-left font-bold text-2xl mb-4">Mandatory Requirements</h2>
            <ul className="list-disc list-inside text-left mb-8">
                {jobData["Mandatory Requrements"].map((req, index) => (
                    <li key={index}>{req}</li>
                ))}
            </ul>
            <h2 className="text-left font-bold text-2xl mb-4">Nice to Have</h2>
            <ul className="list-disc list-inside text-left">
                {jobData["Nice to Have"].map((niceToHave, index) => (
                    <li key={index}>{niceToHave}</li>
                ))}
            </ul>
        </div>
    </div>
  );
}
