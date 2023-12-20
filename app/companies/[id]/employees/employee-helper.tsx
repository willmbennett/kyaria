export class Employee {
    id: string;
    image: string;
    name: string;
    summary: string;
    description: string;
    crunchbaseUri: string;
    linkedInUri: string;
    emailAddresses: {contactString: string, type: string}[]
}

export interface ApiResponse {
    data: {
        entity: Employee;
    }[];
}

export interface getDataProps {
    companyId: string;
    limit: number;
    roleFilter: string
}

interface GetDataReturn {
    employeeData?: Employee[]; // Array of Employee objects when data is successfully fetched
    employeeCategories?: string[]; // Array of employee categories when data is successfully fetched
    newLimit?: number; // Possibly a modified limit, if relevant
    newFilter?: string; // Possibly a modified filter, if relevant
    error?: string; // Error message in case of an error
    company?: string;
  }

export async function getData({ companyId, limit, roleFilter }: getDataProps): Promise<GetDataReturn> {
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

        const employeeCategories = ['All', ...data[0].entity.employeeCategories.sort((a: any, b: any) => b.nbEmployees - a.nbEmployees).map((e: any) => e.category)];
        const company = data[0].entity.name

        //console.log(employeeCategories)


        // Then pull all the employees (capped to 100 to reduce API $$$)

        const roleFilterUrl = roleFilter != 'All' ? `+strict%3Acategories.name%3A+"${encodeURIComponent(roleFilter)}"` : ''
        const limitWithCap = limit>100? 100 : limit
        const apiUrl = `https://kg.diffbot.com/kg/v3/dql?type=query&token=${process.env.DIFFBOT_API_KEY}&query=type%3APerson+employments.%7BisCurrent%3A+true${roleFilterUrl}+employer.diffbotUri%3A"http%3A%2F%2Fdiffbot.com%2Fentity%2F${companyId}"%7D+revSortBy%3Aimportance&size=${limitWithCap}`

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
            id: item.entity.id,
            image: item.entity.image,
            name: item.entity.name,
            summary: item.entity.summary,
            description: item.entity.description,
            crunchbaseUri: item.entity.crunchbaseUri,
            linkedInUri: item.entity.linkedInUri,
            emailAddresses: item.entity.emailAddresses
        }))

        //console.log(employeeData.length)

        return { employeeData, employeeCategories, newLimit: limit, newFilter: roleFilter, company: company  }
    } catch (error) {
        //console.error(error);
        return { error: 'An error occurred while fetching data.' };
    }
}

export interface employeeProps {
    params: { name: string, id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}