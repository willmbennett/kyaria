import { jobStateType } from "../../board/job-helper";

// Define the ApplicationState type based on the keys you have provided
export type ApplicationState = 'Research' | 'Phone Screen' | 'Interviewing' | 'Post-Offer';

export function stripObject<T extends Record<string, any>>(obj: T, desiredKeys: string[]): Partial<T> {
  return desiredKeys.reduce((acc, key) => {
    if (key in obj) {
      if (Array.isArray(obj[key])) {
        // If the current property is an array, map over it and apply stripObject on each element
        (acc as any)[key] = obj[key].map((item: any) => {
          if (typeof item === 'object' && item !== null) {
            return stripObject(item, desiredKeys);
          }
          return item;
        });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If the current property is an object (but not an array), recurse into it
        (acc as any)[key] = stripObject(obj[key], desiredKeys);
      } else {
        (acc as any)[key] = obj[key];
      }
    }
    return acc;
  }, {} as Partial<T>);
}

export const progressStates = [
  { label: "Research", section: 'research' },
  { label: "Phone Screen", section: 'phonescreen' },
  { label: "Interviewing", section: 'interviewing' },
  { label: "Post-Offer", section: `postoffer` },
]

export const getProgress = (state: jobStateType) => {
  switch (state) {
    case 'WISHLIST':
      return 'Research';
    case 'PHONE SCREEN':
      return 'Phone Screen';
    case 'FIRST ROUND':
    case 'SECOND ROUND':
    case 'THIRD ROUND':
    case 'FINAL ROUND':
      return 'Interviewing';
    case 'JOB OFFER':
    case 'ACCEPTED':
      return 'Post-Offer';
    default:
      return 'Research';
  }
};

export const pageList = [
  { label: "Job Description", section: 'jobdescription' },
  { label: "Elevator Pitch", section: 'story' },
  { label: "Networking", section: 'networking' },
  { label: "Interview Stories", section: `experience` },
  { label: "Mock Interview", section: 'mockinterview' },
  { label: "Emails", section: 'emails' },
  { label: "Cover Letter", section: 'coverletter' },
  { label: "Resume", section: 'resume' },
]