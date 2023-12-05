import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import CompanyProfile from "../../components/companies/Company";
import Await from "../../jobs/await";

async function getData(orgId: string) {
    try {
        if (!orgId || typeof orgId !== 'string') {
            return { error: 'Invalid URL provided.' }
        }

        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=diffbotUri%3Ahttp%3A%2F%2Fdiffbot.com%2Fentity%2F${orgId}`; // Replace 'YOUR_API_KEY' with your actual Diffbot API key
        //console.log(apiUrl)
        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        };

        const fetchResponse = await fetch(apiUrl, options);

        if (!fetchResponse.ok) {
            return { error: 'Failed to fetch data from the Diffbot API.' }
        }

        const { data } = await fetchResponse.json();
        //console.log('======= Fetrched Data (=======')
        //console.log(data[0])
        return { companyData: data[0].entity }
    } catch (error) {
        //console.error(error);
        return error
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    //console.log(session)

    if (!session) {
        redirect('/auth/signin')
    }

    //console.log(org)


    const orgPromise = getData(params.id)

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <div className="flex flex-1 w-full flex-col items-center text-center lg:px-4">
                {/* @ts-expect-error Server Component */}
                <Await promise={orgPromise}>
                    {({ companyData }: { companyData: any }) => (<>
                        {companyData ? (
                            <CompanyProfile companyData={companyData} />
                        ) : (
                            // Render a fallback or loading message when companyData is undefined
                            <div>We're sorry, The company could not be found</div>
                        )}
                    </>)}
                </Await>
            </div>
        </div>
    )
}