
// All the data for the JobContext
export interface UserContextType {
    userData: profileFormat;
    jobData: jobFormat;
    companyData: companyFormat;
    newResume: profileFormat;
    setNewResume: (newResume: profileFormat) => void;
    userCoverLetter: string | null;
    setCoverLetter: (newString: string | null) => void;
    story: string | null;
    setStory: (newString: string | null) => void;
    starStories: { [key: string]: string };
    setStarStories: (newObject: { [key: string]: string }) => void;
};