export default function JobDescription({
    jobData,
}: {
    jobData: any,
}) {


    return (
        <>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                {jobData["jobTitle"]}
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Company:</strong> {jobData["company"]}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Location:</strong> {jobData["location"]}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Employment Type:</strong> {jobData["employmentType"]}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Salary Range:</strong> {jobData["salaryRange"]}
                </p>
                <p className="text-left font-medium text-lg mb-4">
                    <strong>Remote:</strong> {jobData["remote"]}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">About the Company</h2>
                <p className="text-left mb-8">
                    {jobData["aboutCompany"]}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">Job Description</h2>
                <p className="text-left mb-8">
                    {jobData["jobDescription"]}
                </p>
                <h2 className="text-left font-bold text-2xl mb-4">Qualifications</h2>
                <ul className="list-disc list-inside text-left mb-8">
                    {jobData["qualifications"].map((qualification: any, index: any) => (
                        <li key={index}>{qualification}</li>
                    ))}
                </ul>
                <h2 className="text-left font-bold text-2xl mb-4">Responsibilities</h2>
                <ul className="list-disc list-inside text-left">
                    {jobData["responsibilities"].map((responsibility: any, index: any) => (
                        <li key={index}>{responsibility}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
