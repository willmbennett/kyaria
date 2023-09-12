// User profile data format
interface profileFormat {
    name: string;
    title: string;
    email: string;
    phone: string;
    social_links: Record<string, string>;
    location: string;
    summary: string;
    skills: string[];
    professional_experience: {
        title: string;
        company: string;
        location: string;
        start_date: string;
        end_date: string;
        responsibilities: string[];
    }[];
    education: {
        degree: string;
        institution: string;
        location: string;
        details: string[];
    }[];
};

interface companyFormat {
    name: string,
    details: {
        size: string,
        overview: string,
        mission: string,
        culture: string,
        coreProduct: string,
        corperatePriorities: string,
    }
}