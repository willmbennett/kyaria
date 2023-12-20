import { useEffect, useState } from "react";
import { JobClass } from "../../../../models/Job";
import { ResumeClass } from "../../../../models/Resume";
import { updateJobAppAction } from "../../../board/_action";
import { Employee } from "../../../companies/[id]/employees/employee-helper";
import ChatWithGPT from "../../board/ChatWithGPT";
import EmployeeItem from "../../companies/EmployeeItem";
import Carousel from "../ui/Carousel";

interface NetworkingProps {
    companyDiffbotUri: string
    company: string,
    userResumeStripped: Partial<ResumeClass>,
    jobStripped: Partial<JobClass>,
    activeSubscription: boolean
}

export default function Networking(
    {
        companyDiffbotUri,
        company,
        userResumeStripped,
        jobStripped,
        activeSubscription
    }: NetworkingProps
) {
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);

    useEffect(() => {
        // Using an async function inside useEffect
        const fetchData = async () => {
            //console.log(companyDiffbotUri)
            const response = await fetch(`/api/diffbot/employees/${encodeURIComponent(companyDiffbotUri)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json()
            //console.log(data)
            const employees = data.map((d: any) => d.entity).filter((a: Employee) => a.summary.includes(company))
            setEmployeeData(employees);
        };

        fetchData();
    }, [companyDiffbotUri]);

    const renderEmployee = (employee: Employee) => {
        const message = [
            {
                "role": "system",
                "content": "Craft a concise, professional LinkedIn outreach message to a recruiter, focusing on a specific job interest. The message should be engaging, personalized, and under 300 characters. Include key elements like a brief introduction, mention of the job of interest, a highlight from the resume, and an invitation for further discussion."
            },
            {
                "role": "user",
                "content": `I'm applying for this job ${JSON.stringify(jobStripped)}. Write a LinkedIn message to the recruiter ${JSON.stringify(employee.name)}. Use details from my resume ${JSON.stringify(userResumeStripped)}, focusing on skills and experiences relevant to the job. Ensure the message is under 300 characters.`
            }
        ];

        return (
            <div className="flex flex-col justify-center items-center w-full" key={employee.id}>
                <EmployeeItem employee={employee} />
                <p className="mt-3"> Customize your LinkedIn request: </p>
                <ChatWithGPT
                    documentID=''
                    message={message}
                    setKey=''
                    currentState=''
                    saveToDatabase={updateJobAppAction}
                    temp={0.7}
                    activeSubscription={activeSubscription}
                />
            </div>
        )
    }


    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center sm:text-6xl text-4xl font-bold text-slate-900 mb-8">
                Let's Network
            </h1>
            <Carousel items={employeeData} renderItem={renderEmployee} />
        </div>
    );
}
