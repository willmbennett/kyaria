export const fetchUserJobs = async (userId: string) => {

  //console.log(`User ID: ${userId}`)
  try {
    const response = await fetch(`/api/db/job/jobs/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    //console.log(`Resp: ${response}`)

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const fetchedJobs = await response.json();

    //console.log(`Resp: ${fetchedUserProfile[0]}`)

    if (fetchedJobs.length > 0) {
      return fetchedJobs;
    }
  } catch (error) {
    console.error('Failed to fetch user jobs:', error);
  }
};

export const createNewJob = async (
  {
      data,
      userId,
      userResume

  }: {
      data: FormFields
      userId: string
      userResume: profileFormat
  }) => {
  try {
      const response = await fetch('/api/db/job/new', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, "userResume": userResume, userId: userId }), // Sending form data
      });

      if (!response.ok) {
          throw new Error(response.statusText);
      }

      const createdJob = await response.json();

      if (createdJob.insertedId) {
          return { ...data, _id: createdJob.insertedId, userId: userId }
      }
  } catch (error) {
      console.error('Failed to create user profile:', error);
  }
};



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