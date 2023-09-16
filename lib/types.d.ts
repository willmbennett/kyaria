declare module mongodb {
    export = ObjectID;
  }

// User profile data format
interface profileFormat {
    _id: ObjectID;
    name: string;
    title: string;
    email: string;
    phone: string;
    social_links: Record<string, string>;
    location: string;
    summary: string;
    areas_of_expertise: string[];
    skills: string[];
    professional_experience: {
        title: string;
        company: string;
        location: string;
        start_date: string;
        end_date: string;
        responsibilities: {
            content: string;
            starStory: strong
        }[];
    }[];
    education: {
        degree: string;
        institution: string;
        location: string;
        details: {
            content: string;
            starStory: strong
        }[];
    }[];
    userId: ObjectID;
};

interface jobFormat {
    _id: ObjectID,
    jobTitle: string;
    company: string;
    location: string;
    employmentType: string;
    salaryRange: string;
    remote: string;
    aboutCompany: string;
    jobDescription: string;
    qualifications: string[];
    responsibilities: string[];
    userId: ObjectID;
    userCoverLetter: string;
    userStory: string;
    userResume: profileFormat;
    userQuestions: {
        question: string;
        answer: string;
    }[]
}

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