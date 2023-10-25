export const emails = [
  { "type": "Resume Submission", "content": "" },
  { "type": "Cover Letter Submission", "content": "" },
  { "type": "Job Inquiry", "content": "" },
  { "type": "Networking Outreach", "content": "" },
  { "type": "Thank You After Interview", "content": "" },
  { "type": "Follow-Up After Interview", "content": "" },
  { "type": "Job Offer Acceptance", "content": "" },
  { "type": "Job Offer Clarification", "content": "" },
  { "type": "Job Offer Decline", "content": "" },
  { "type": "Salary Negotiation", "content": "" },
  { "type": "Reference Request", "content": "" }
]


export type FormFields = {
  jobTitle: string;
  link: string;
  company: string;
  location: string;
  employmentType: string,
  salaryRange: string;
  remote: string;
  aboutCompany: string;
  jobDescription: string;
  qualifications: {
    content: string;
  }[];
  responsibilities: {
    content: string;
  }[];
};

export const expectedJson = {
  "jobTitle": "",
  "link": "",
  "company": "",
  "location": "",
  "employmentType": "",
  "salaryRange": "",
  "remote": "",
  "aboutCompany": "",
  "jobDescription": "",
  "qualifications": [""],
  "responsibilities": [""]
}

export const defaultTextInput =
  `Product Analyst
    
    23andMe
    Sunnyvale, CA

    Full-time

    Qualifications
    •
    Good SQL and R skills are a must for this role
    •
    2+ years of industry work experience in an analyst or equivalent role
    •
    B.S. in statistics, mathematics, business or a related field
    •
    Excellent communication skills; this role requires regular interaction with partners from each part of the product
    •
    An analytical mindset; as a product analyst you will champion data-driven decision making and help the product team identify areas of opportunity
    •
    Strong data visualization skills
    •
    An online sample of your analytical and/or data visualization abilities is greatly appreciated
    Responsibilities
    •
    In this role you will work closely with the Product team and Analytics Business Partners to measure product performance and inform strategy using analytics and data
    •
    Our team culture is respectful and collaborative; we place a lot of emphasis on mentorship and growth both within the Analytics team and with our business partners
    •
    Your focus is 23andMe's consumer experience; you will support Product Managers and be a trusted partner for performance measurement and data visualization
    •
    Leverage Google Analytics and internal data to provide key insights by analyzing customer behavior
    •
    Implement and measure experiments around feature and product development
    •
    Collaborate with the larger Analytics organization to identify and develop long-term solutions to common data needs throughout the product organization
    Job description
    23andMe is seeking a Product Analyst to join our Analytics team. We're looking for someone with excellent analytical and critical thinking skills who can apply them to help improve the consumer experience. In this role you will work closely with the Product team and Analytics Business Partners to measure product performance and inform strategy using analytics and data.
    
    Our team culture is respectful and collaborative; we place a lot of emphasis on mentorship and growth both within the Analytics team and with our business partners. Good SQL and R skills are a must for this role. If you think you would be a good fit we'd love to hear from you!
    
    Who We Are
    
    Since 2006, 23andMe’s mission has been to help people access, understand, and benefit from the human genome. We are a group of passionate individuals pushing the boundaries of what’s possible to help turn genetic insight into better health and personal understanding.
    
    What You'll Do
    • Your focus is 23andMe's consumer experience; you will support Product Managers and be a trusted partner for performance measurement and data visualization.
    • Leverage Google Analytics and internal data to provide key insights by analyzing customer behavior.
    • Implement and measure experiments around feature and product development.
    • Collaborate with the larger Analytics organization to identify and develop long-term solutions to common data needs throughout the product organization.
    
    What You’ll Bring
    • 2+ years of industry work experience in an analyst or equivalent role
    • B.S. in statistics, mathematics, business or a related field.
    • Skilled in SQL and R. Google Analytics, tidyverse, Git, Python and AWS are a plus.
    • Excellent communication skills; this role requires regular interaction with partners from each part of the product.
    • An analytical mindset; as a product analyst you will champion data-driven decision making and help the product team identify areas of opportunity.
    • Strong data visualization skills.
    • An online sample of your analytical and/or data visualization abilities is greatly appreciated.
    • Note: For this position, we are looking for Bay Area local candidates only
  
  `
export const demoJSON = {
  "jobTitle": "Product Analyst",
  "link": "https://jobs.girlboss.com/product-analyst-4379213c93cd",
  "company": "23andMe",
  "location": "Sunnyvale, CA",
  "employmentType": "Full-time",
  "salaryRange": "",
  "remote": "",
  "aboutCompany": "Since 2006, 23andMe’s mission has been to help people access, understand, and benefit from the human genome. We are a group of passionate individuals pushing the boundaries of what’s possible to help turn genetic insight into better health and personal understanding.",
  "jobDescription": "23andMe is seeking a Product Analyst to join our Analytics team. We're looking for someone with excellent analytical and critical thinking skills who can apply them to help improve the consumer experience. In this role you will work closely with the Product team and Analytics Business Partners to measure product performance and inform strategy using analytics and data.",
  "qualifications": [
    "Good SQL and R skills are a must for this role",
    "2+ years of industry work experience in an analyst or equivalent role",
    "B.S. in statistics, mathematics, business or a related field",
    "Excellent communication skills; this role requires regular interaction with partners from each part of the product",
    "An analytical mindset; as a product analyst you will champion data-driven decision making and help the product team identify areas of opportunity",
    "Strong data visualization skills",
    "An online sample of your analytical and/or data visualization abilities is greatly appreciated"
  ],
  "responsibilities": [
    "In this role you will work closely with the Product team and Analytics Business Partners to measure product performance and inform strategy using analytics and data",
    "Our team culture is respectful and collaborative; we place a lot of emphasis on mentorship and growth both within the Analytics team and with our business partners",
    "Your focus is 23andMe's consumer experience; you will support Product Managers and be a trusted partner for performance measurement and data visualization",
    "Leverage Google Analytics and internal data to provide key insights by analyzing customer behavior",
    "Implement and measure experiments around feature and product development",
    "Collaborate with the larger Analytics organization to identify and develop long-term solutions to common data needs throughout the product organization"
  ]
}

export const defaultFormInput = {
  "jobTitle": "",
  "company": "",
  "location": "",
  "employmentType": "",
  "salaryRange": "",
  "remote": "",
  "aboutCompany": "",
  "jobDescription": "",
  "qualifications": [],
  "responsibilities": []
}

// Define a simplified Job interface for the transformed object
export interface Job {
  link: string; // Required field
  jobTitle: string;
  diffbotUri: string,
  company?: string;
  companyDiffbotUri?: string,
  location?: string;
  remote?: string;
  aboutCompany?: string;
  jobDescription?: string;
  qualifications?: string[];
  responsibilities?: string[];
  skills?: Skill[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Define a simplified Skill interface for skills within the Job
interface Skill {
  skill: string;
  salience?: number;
  confidence?: number;
  diffbotUri?: string;
}

// Function to transform the API response to a simplified Job object
export function transformDiffBotApiResponse(apiResponse: any): Job {
  const jobData = apiResponse.objects[0]; // Assuming there's only one job object in the response

  const transformedJob: Job = {
    jobTitle: jobData.title,
    link: jobData.pageUrl,
    diffbotUri: jobData.diffbotUri,
    company: jobData.employer?.name,
    companyDiffbotUri: jobData.employer?.diffbotUri,
    location: jobData.locations?.address,
    remote: jobData.remote,
    aboutCompany: jobData.aboutCompany,
    jobDescription: jobData.text,
    qualifications: jobData.requirements,
    responsibilities: jobData.tasks,
    createdAt: new Date(jobData.datePosted),
    updatedAt: new Date(jobData.datePosted),
    skills: [],
  };


  if (jobData.skills && Array.isArray(jobData.skills)) {
    transformedJob.skills = jobData.skills.map((skillData: any) => ({
      skill: skillData.skill,
      salience: skillData.salience,
      confidence: skillData.confidence,
      diffbotUri: skillData.diffbotUri,
    }));
  }

  return transformedJob;
}
