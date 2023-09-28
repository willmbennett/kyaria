export default function JobDescription({
    jobData,
}: {
    jobData: any,
}) {
    return (

        <>
            <h1 className="text-center sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                {jobData.jobTitle}
            </h1>
            <div>
                {jobData.link && (
                    <p className="text-left font-medium text-lg mb-4">
                        <a href={jobData.link} target="_blank" rel="noopener noreferrer">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">
                                Apply to Job
                            </button>
                        </a>
                    </p>
                )}
                {jobData.company && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Company:</strong> {jobData.company}
                    </p>
                )}
                {jobData.location && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Location:</strong> {jobData.location}
                    </p>
                )}
                {jobData.employmentType && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Employment Type:</strong> {jobData.employmentType}
                    </p>
                )}
                {jobData.salaryRange && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Salary Range:</strong> {jobData.salaryRange}
                    </p>
                )}
                {jobData.remote && (
                    <p className="text-left font-medium text-lg mb-4">
                        <strong>Remote:</strong> {jobData.remote}
                    </p>
                )}
                {jobData.aboutCompany && (<>
                    <h2 className="text-left font-bold text-2xl mb-4">About the Company</h2>
                    <p className="text-left mb-8">
                        {jobData.aboutCompany}
                    </p>
                </>)}
                {jobData.jobDescription && (<>
                    <h2 className="text-left font-bold text-2xl mb-4">Job Description</h2>
                    <p className="text-left mb-8">
                        {jobData.jobDescription}
                    </p>
                </>)}
                {jobData.qualifications && (
                    <>
                        <h2 className="text-left font-bold text-2xl mb-4">Qualifications</h2>
                        <ul className="list-disc list-inside text-left mb-8">
                            {Array.isArray(jobData.qualifications) && jobData.qualifications.map((qualification: any, index: any) => (
                                <li key={index}>{qualification}</li>
                            ))}
                        </ul>
                    </>)}
                {jobData.responsibilities && (
                    <>
                        <h2 className="text-left font-bold text-2xl mb-4">Responsibilities</h2>
                        <ul className="list-disc list-inside text-left">
                            {Array.isArray(jobData.responsibilities) && jobData.responsibilities.map((responsibility: any, index: any) => (
                                <li key={index}>{responsibility}</li>
                            ))}
                        </ul>
                    </>)}
            </div>
        </>
    );
}
