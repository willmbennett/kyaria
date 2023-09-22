export const questions = [
  {"question": "Can you describe a situation where you had to deal with a difficult coworker or team member?", "answer": ""},
  {"question": "Tell me about a time when you had to handle multiple tasks at once. How did you prioritize and manage your time?", "answer": ""},
  {"question": "Describe a situation in which you had to use your communication skills in order to explain a difficult concept to someone.", "answer": ""},
  {"question": "Tell me about a time when you took initiative to solve a problem at work. What was the outcome?", "answer": ""},
  {"question": "Can you provide an example of a time when you received constructive feedback? How did you react, and what changes did you make?", "answer": ""},
  {"question": "Describe a situation where you set a goal and were able to meet or exceed it.", "answer": ""},
  {"question": "Tell me about a time when you had to make a difficult decision at work. How did you come to that decision and what was the result?", "answer": ""},
  {"question": "How have you handled a situation in the past where you were under a lot of pressure?", "answer": ""},
  {"question": "Describe a project or task where you had to collaborate with a cross-functional team. How did you ensure effective communication and cooperation?", "answer": ""},
  {"question": "Tell me about a time when you had to adapt to significant changes at work. How did you handle it?", "answer": ""}
]


export type FormFields = {
  jobTitle: string;
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
  `
  `
export const demoJSON = {
  "jobTitle": "Product Analyst",
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