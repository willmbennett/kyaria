import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import Await from "../../../jobs/await";
import { Suspense } from 'react'
import Trigger from "../../../components/companies/trigger";
import EmployeeList from "../../../components/companies/EmployeeList";
import EmployeeDropdown from "../../../components/companies/EmployeeDropdown";
import EmployeesSkeleton from "../../../components/companies/EmployeesSkeleton";
import { Employee, employeeProps, getData } from "./employee-helper";

export default async function Page({ params, searchParams }: employeeProps) {
    //console.log('Server-side Page rendering with searchParams:', searchParams);

    // Ensure the session handling is correct and redirect is working as intended
    const session = await getServerSession(authOptions);
    if (!session) {
        // Make sure to log if the session is not found
        console.error('Session not found, redirecting to signin');
        redirect('/auth/signin');
        return; // Don't forget to return after a redirect
    }

    const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit, 10) : 30;
    const roleFilter = typeof searchParams.roleFilter === 'string' ? decodeURIComponent(searchParams.roleFilter.replace(/\+/g, ' ')) : 'All';

    // Logging the computed limit and roleFilter for debugging
    //console.log(`Computed Limit: ${limit}, RoleFilter: ${roleFilter}`);

    const companyId = params.id;

    // You can add more logging inside getData if needed
    const orgPromise = getData({ companyId, limit, roleFilter });

    // The return should be JSX or a component, not raw JSON

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <div className="flex flex-1 w-full flex-col items-center text-center lg:px-4">
                <Suspense fallback={<EmployeesSkeleton />}>
                    {/* @ts-expect-error Server Component */}
                    <Await promise={orgPromise}>
                        {({
                            employeeData,
                            employeeCategories,
                            newLimit,
                            newFilter,
                            company
                        }: {
                            employeeData: Employee[],
                            employeeCategories: string[],
                            newLimit: number,
                            newFilter: string,
                            company: string
                        }) => (<>
                            {employeeData ? (
                                <>
                                    <h1 className="text-3xl font-bold text-center my-3">{company} Employees</h1>
                                    <EmployeeDropdown employeeCategories={employeeCategories} roleFilter={roleFilter} limit={limit} />
                                    <EmployeeList employeeData={employeeData} company={company} />
                                    {employeeData.length >= newLimit && (
                                        <Trigger length={employeeData.length} newLimit={newLimit} newFilter={newFilter}></Trigger>
                                    )}
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