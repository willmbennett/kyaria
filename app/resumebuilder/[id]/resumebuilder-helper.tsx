import { Dispatch, SetStateAction } from "react";
import { updateResumeAction } from "../_action";
import { JobClass } from "../../../models/Job";
import { Award, Certification, Education, ProfessionalExperience, Project, Publication, ResumeClass, Volunteering } from "../../../models/Resume";
import { FieldConfig } from "../resumetest-helper";

interface UpdateDataType {
    [key: string]: any;
}

interface SaveResumeToDatabaseProps {
    resumeId: string;
    setKey: string;
    value: any;
    path: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
}

const logging = false

export const saveResumeToDatabase = async ({
    resumeId,
    setKey,
    value,
    path,
    setSaveStatus
}: SaveResumeToDatabaseProps) => {
    setSaveStatus('saving');
    // Construct update data
    const updateData: UpdateDataType = {};
    updateData[setKey] = value;
    if (logging) console.log("Data to update: " + JSON.stringify(updateData));
    const { error } = await updateResumeAction(resumeId, { ...updateData }, path);
    setTimeout(() => setSaveStatus('up to date'), 1000);
    if (error) {
        console.log(error)
        setSaveStatus('error');
    }
}

export type SectionFieldNames = "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'volunteering';
export type ListFieldNames = "skills" | 'interests'
export type ListFieldType = { id: string, label: string; value: string }
export type ResumeSectionType = ProfessionalExperience | Education | Project | Award | Publication | Certification | Volunteering;
export type ResumeSectionFormType = { section: ResumeSectionType }
export type SectionItemType = {
    id: string;
    [key: string]: any; // Additional fields as needed
};
export interface FieldGroups {
    [key: string]: FieldConfig[];
}


export type FieldConfigType = {
    name: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'date' | 'gpa' | 'bulletPoints' | 'check';
    group?: string; // Optional grouping key
};
const skillsUpdatePrompt = `You are a professional resume writer experienced in curating and refining skill sets for job seekers. Skills should be 1-2 words long. If the resume is technical only include technical skills.
Soft skills examples:
Listening
Writing
Empathy
Giving constructive feedback
Self-confidence
Respect
Nonverbal communication
Self-organization
Self-motivation
Self-management
Curiosity
Positivity
Calmness in stressful situations
Quick decision-making
Open-mindedness
Delegation
Negotiation
Mediation
Listening
Coordination
Conflict management
Cooperation
Collaboration
Introspection
Critical thinking and observation
Memory
Self-organization
Perception
Perception
Persistence
Decision-making
Lateral thinking
Initiative
Negotiation
Brainstorming
Discipline
Integrity
Dependability
Commitment
Critical thinking
Professionalism
Initiative
Time-management
Self-motivation
Inspiration
Innovative ideas
Reframing ideas
Divergent thinking
Questioning
Insightfulness
Mind mapping
Prioritization
Organization
Setting goals
Stress management
Delegation
Decision making
Self-starting
Coping
Empathy
Diplomacy
Sensitivity
Public speaking
Tolerance
Mentoring
Sense of humor
Networking
Patience
Humility
Empathy
Versatility
Trust
Discipline
Active listening
Authenticity

Technical skills examples:
Word processing software
Spreadsheet software
Presentation software
Email management
Data entry
Digital calendars
Video conferencing
Social media management
Instant messaging
HTML
Java
Operating systems
UI/UX
Python
JavaScript
CSS
Illustration software
Photoshop
Design software
Desktop publishing
Video creation software
Instant messaging
Video conferencing
Email management applications
Spreadsheets
SQL
MySQL
Oracle RDBMS
Toad
Data analytics
Accounts payable
Billings
Accounts receivable
Fixed assets
Inventory
Payroll
Microsoft Excel
OnlyOffice
LibreOffice
Microsoft Word
Google Drive
Microsoft Powerpoint
Adobe Persuasion
Adobe Creative Suite
iMovie
Hootsuite
WordPress
GanttPRO
Zoho Projects
`

interface UpdateSkillsProps {
    job?: Partial<JobClass>
    resume: ResumeClass;
}

export const updateSkills = async ({ job, resume }: UpdateSkillsProps) => {
    const title = resume.title
    const tailorRoleString = job ? `to this job post ${JSON.stringify(job)}` : (title ? `to this role ${JSON.stringify(title)}` : '')

    const messages = [
        {
            role: "system", content: skillsUpdatePrompt
        },
        {
            role: "user", content: `Please tailor the skills section of my resume: ${JSON.stringify(resume)} ${tailorRoleString}. Return the list of the top 10-15 skills in this json format: {"skills": string[]}`
        }
    ]

    try {
        //console.log('about to optimize resume section', data)
        const response = await fetch('/api/openai/optimizeResume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages
            }),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }

        const skillsRaw = await response.json();

        const newSkills = skillsRaw.skills as string[]

        return { newSkills }
    } catch (error: any) {
        console.error(`Failed to optimize resume section: skills`, error);
        throw new Error(error)
    }
}