import CompanyProfile from "../../components/companies/Company";
import Await from "../../jobs/await";
import { checkSubscription } from "../../../lib/hooks/check-subscription";

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
    const session = await checkSubscription(true)
    //console.log(org)


    const orgPromise = getData(params.id)

    return (
        <div className="max-w-5xl">
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
    )
}