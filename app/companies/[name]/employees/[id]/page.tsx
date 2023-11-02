import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";
import Await from "../../../../jobs/await";
import { Suspense } from 'react'
import Trigger from "../../../../components/companies/trigger";
import EmployeeList from "../../../../components/companies/EmployeeList";
import EmployeeDropdown from "../../../../components/companies/EmployeeDropdown";
import EmployeesSkeleton from "../../../../components/companies/EmployeesSkeleton";

export class Employee {
    image: string;
    name: string;
    summary: string;
    description: string;
    crunchbaseUri: string;
    linkedInUri: string;
}

interface ApiResponse {
    data: {
        entity: Employee;
    }[];
}

interface getDataProps {
    companyId: string;
    limit: number;
    roleFilter: string
}

async function getData({ companyId, limit, roleFilter }: getDataProps) {
    try {
        if (!companyId || typeof companyId !== 'string') {
            return { error: 'Invalid URL provided.' }
        }

        // First get the organization (yes I know again but we need categories)
        const companyApiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=diffbotUri%3Ahttp%3A%2F%2Fdiffbot.com%2Fentity%2F${companyId}`; // Replace 'YOUR_API_KEY' with your actual Diffbot API key
        //console.log(companyApiUrl)
        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        };

        const companyFetchResponse = await fetch(companyApiUrl, options);

        if (!companyFetchResponse.ok) {
            return { error: 'Failed to fetch data from the Diffbot API.' }
        }

        const { data } = await companyFetchResponse.json();

        const employeeCategories = data[0].entity.employeeCategories.sort((a: any,b: any) => b.nbEmployees - a.nbEmployees).map((e: any) => e.category);

        //console.log(employeeCategories)
        

        // Then pull all the employees

        const roleFilterUrl = roleFilter != '' ? `+strict%3Acategories.name%3A+"${roleFilter}"` : ''
        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=type%3APerson+employments.%7BisCurrent%3A+true${roleFilterUrl}+employer.diffbotUri%3A"http%3A%2F%2Fdiffbot.com%2Fentity%2F${companyId}"%7D+revSortBy%3Aimportance&size=${limit}`

        //console.log(apiUrl)

        const fetchResponse = await fetch(apiUrl, options);

        if (!fetchResponse.ok) {
            return { error: 'Failed to fetch data from the Diffbot API.' }
        }

        const jsonResponse = await fetchResponse.json();

        // We'll cast the json response to the ApiResponse type
        const apiResponse: ApiResponse = jsonResponse;

        //console.log(data)

        // Now we use TypeScript's map function with a typed parameter
        const employeeData = apiResponse.data.map((item) => ({
            image: item.entity.image,
            name: item.entity.name,
            summary: item.entity.summary,
            description: item.entity.description,
            crunchbaseUri: item.entity.crunchbaseUri,
            linkedInUri: item.entity.linkedInUri,
        }))

        return { employeeData, employeeCategories }
    } catch (error) {
        //console.error(error);
        return error
    }
}

interface employeeProps {
    params: { name: string, id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: employeeProps) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/auth/signin')
    }

    const limit =
        typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 30
    const roleFilter =
        typeof searchParams.roleFilter === 'string' ? decodeURIComponent(searchParams.roleFilter.replace(/\+/g, ' ')) : ''

    const company = params.name
    const companyId = params.id

    const orgPromise = getData({ companyId, limit, roleFilter })

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <div className="flex flex-1 w-full flex-col items-center text-center lg:px-4">
                <h1 className="text-3xl font-bold text-center my-3">{company} Employees</h1>
                <Suspense fallback={<EmployeesSkeleton />}>
                    {/* @ts-expect-error Server Component */}
                    <Await promise={orgPromise}>
                        {({ employeeData, employeeCategories }: { employeeData: Employee[], employeeCategories: string[] }) => (<>
                            {employeeData ? (
                                <>
                                    <EmployeeDropdown employeeCategories={employeeCategories} roleFilter={roleFilter} limit={limit}/>
                                    <EmployeeList employeeData={employeeData} company={company} />
                                    <Trigger limit={limit} length={employeeData.length} roleFilter={roleFilter}></Trigger>
                                </>
                            ) : (
                                // Render a fallback or loading message when companyData is undefined
                                <div>We're sorry, {decodeURIComponent(company)} employees could not be found</div>
                            )}
                        </>)}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}