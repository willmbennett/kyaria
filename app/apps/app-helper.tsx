import { AppClass } from "../../models/App";
import { JobClass } from "../../models/Job";
import { ProfileClass } from "../../models/Profile";
import { ResumeClass } from "../../models/Resume";
import { JobStateType } from "../board/job-helper";

export interface getJobAppInterface {
  app: AppClass
}

export interface JobAppPageProps {
  params: { id: string }
  searchParams: { section: string, progress: string }
}

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

export const getProgress = (state: JobStateType) => {
  switch (state) {
    case 'Wishlist':
      return 'Research';
    case 'Phone Screen':
      return 'Phone Screen';
    case 'First Round':
    case 'Second Round':
    case 'Third Round':
    case 'Final Round':
      return 'Interviewing';
    case 'Job Offer':
    case 'Accepted':
      return 'Post-Offer';
    default:
      return 'Research';
  }
};

export const pageList = [
  { label: "Job Description", section: 'jobdescription' },
  { label: "Resume", section: 'resume' },
  { label: "Cover Letter", section: 'coverletter' },
  { label: "Elevator Pitch", section: 'story' },
  { label: "Networking", section: 'networking' },
  { label: "Interview Stories", section: `experience` },
  { label: "Mock Interview", section: 'mockinterview' },
  { label: "Emails", section: 'emails' },
  { label: "Notes", section: 'notes' },
  { label: "Files", section: 'files' }
]

const profileKeys = [
  "name",
  "title",
  "summary",
  "areas_of_expertise",
  "skills",
  "education",
  "professional_experience",
  'details',
  'responsibilities',
  'content',
  'start_date',
  'end_date',
  'degree',
  'company',
  'institution'
];

const jobKeys = ["jobTitle", 'company', "aboutCompany", "jobDescription", "qualifications", "responsibilities"];

export const stripObojects = (resume: ResumeClass, job: JobClass) => {
  const userResumeStripped: Partial<ResumeClass> = resume ? stripObject(resume, profileKeys) : {}
  const jobStripped: Partial<JobClass> = stripObject(job, jobKeys)

  return { userResumeStripped, jobStripped }
}

export const extractAppObjects = (app: AppClass) => {
  const jobAppId = app._id.toString()

  const resume = app.userResume as ResumeClass
  const resumeId = resume._id.toString()

  const job = (app.job as JobClass)
  const jobId = (app.job as JobClass)._id.toString()

  const profile = (app.profile as ProfileClass)
  const profileId = profile._id.toString()

  const chatId = app.chatId?.toString()
  return { jobAppId, resumeId, resume, jobId, job, profileId, profile, chatId }
}