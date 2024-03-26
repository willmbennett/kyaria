
interface DetailsProps {
    location?: string;
    employmentType?: string;
    salaryRange?: string;
}

export const Details = ({ location, employmentType, salaryRange }: DetailsProps) => (
    <div className="flex flex-col bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4">
            <div className="text-sm text-gray-600">
                {location && (
                    <p>
                        <span className="font-medium">Location:</span> {location}
                    </p>
                )}
                {employmentType && (
                    <p>
                        <span className="font-medium">Employment Type:</span> {employmentType}
                    </p>
                )}
                {salaryRange && (
                    <p>
                        <span className="font-medium">Salary Range:</span> {salaryRange}
                    </p>
                )}
            </div>
        </div>
    </div>

)