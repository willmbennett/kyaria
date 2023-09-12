// Job post data format
export interface jobFormat {
    jobTitle: string,
    company: string,
    location: string,
    employmentType: string,
    salaryRange: string,
    remote: string,
    aboutCompany: string,
    jobDescription: string,
    mandatoryRequirements: string[],
    niceToHave: string[]
}
// All the data for the JobContext
export interface UserContextType {
    jobData: jobFormat;
    profileData: profileFormat;
    companyData: companyFormat;
    summary: string | null;
    setSummary: (newString: string | null) => void;
    coverLetter: string | null;
    setCoverLetter: (newString: string | null) => void;
    story: string | null;
    setStory: (newString: string | null) => void;
    starStories: { [key: string]: string };
    setStarStories: (newObject: { [key: string]: string }) => void;
};