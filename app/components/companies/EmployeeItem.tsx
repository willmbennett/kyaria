import Link from "next/link";
import { Employee } from "../../companies/[name]/employees/[id]/employee-helper";

// Define the props for the component
interface EmployeeItemProps {
    employee: Employee;
}

export default function EmployeeItem(
    {
        employee
    }: EmployeeItemProps
) {
    const {
        image,
        name,
        summary,
        description,
        crunchbaseUri,
        linkedInUri
    } = employee

    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            {/* Image container with responsive image and circular style */}
            <div className="flex justify-center mt-5">
                {image ? (
                    <img className="rounded-full w-32 h-32 object-cover" src={image} alt={`${name}'s profile picture`} />
                ) : (
                    <div className="w-32 h-32 rounded-full flex items-center justify-center border">
                        <svg className="svg-icon w-1/2 h-auto" viewBox="0 0 20 20">
                            <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                        </svg>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">{name}</h5>
                <p className="text-gray-700 dark:text-gray-400 mt-2 text-center">{summary}</p>
                {/*<p className="line-clamp-3 text-xs">
                    {description}
                </p> */}
                <div className="flex justify-around mt-4">
                    <Link href={`https://www.${crunchbaseUri}`} target="_blank">
                        <span className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 transition duration-300" aria-label="Crunchbase profile">
                            Crunchbase Profile
                        </span>
                    </Link>
                    <Link href={`https://www.${linkedInUri}`} target="_blank">
                        <span className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 transition duration-300" aria-label="LinkedIn profile">
                            LinkedIn Profile
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
