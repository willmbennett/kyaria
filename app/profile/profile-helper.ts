
export type FormFields = {
    name: string;
    title: string;
    email: string;
    phone: string;
    social_links: { [key: string]: string };
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
          starStory: string;
        }[];
    }[];
    education: {
        degree: string;
        institution: string;
        location: string;
        details: {
          content: string;
          starStory: string;
        }[];
    }[];
};

export const fetchUserProfile = async (userId: string) => {

    //console.log(`User ID: ${userId}`)
    try {
      const response = await fetch(`/api/db/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      //console.log(`Resp: ${response}`)

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const fetchedUserProfile = await response.json();

      //console.log(`Resp: ${fetchedUserProfile[0]}`)

      if (fetchedUserProfile.length > 0) {
        return fetchedUserProfile[0];
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

export const createUserProfile = async (
    {
        data,
        userId

    }: {
        data: FormFields
        userId: string
    }) => {
    try {
        const response = await fetch('/api/db/profile/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, userId: userId }), // Sending form data
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const createdUserProfile = await response.json();

        //console.log("Created User Profile")
        //console.log(createdUserProfile.insertedId)

        if (createdUserProfile.insertedId) {
            return { ...data, _id: createdUserProfile.insertedId, userId: userId }
        }
    } catch (error) {
        console.error('Failed to create user profile:', error);
    }
};


export const expectedJson = {
  "name": "",
  "title": "",
  "email": "",
  "phone": "",
  "social_links": { "": "" },
  "location": "",
  "summary": "",
  "areas_of_expertise": [""],
  "skills": [""],
  "professional_experience": [
      {
          "title": "",
          "company": "",
          "location": "",
          "start_date": "",
          "end_date": "",
          "responsibilities": [{"content": "", "starStory": ""}]
      }
  ],
  "education": [
      {
          "degree": "",
          "institution": "",
          "location": "",
          "details": [{"content": "", "starStory": ""}]
      }
  ]
}

export const defaultTextInput =
  `Will Bennett
Product Manager Profile




wbennett711@gmail.com • 207-239-0234
Github • LinkedIn • Cupertino, CA
Profile
Adaptable and growth-oriented Product Manager specializing in B2B SaaS and Technical Product Management. With a strong grasp of web development fundamentals, I effortlessly converse with engineers and excel at diving into technical issues. Known for creative problem-solving and a track record of driving sustainable growth at Doximity, Will I thrive in dynamic, small-team environments. Committed to rolling up my sleeves and overcoming roadblocks, I'm passionate about building structured systems and processes for long-term success.
Areas of Expertise
Technical Product Management
B2B SaaS Expertise
Project Scope Planning
Engineering Coordination
Customer-Driven Roadmapping
Web Development Fundamentals
SalesForce Platform Integration
Technical Problem-Solving
Startup Growth Strategies
Process and System Building
Agile Project Management
Skills
Product Management
Jira, Roadmapping, Agile Development, Wireframing, Scrum, Salesforce.

Data Science
SQL, Looker, Colab, Mixpanel, Tableau, Snowflake, BigQuery, Excel, Python, TensorFlow, Keras, Object Oriented Programming, scikit-learn, Spark, pandas, numpy.

Web Development
React.js, Node.js, JavaScript, HTML, CSS, Markup.




Professional Experience
Technical Product Manager, B2B SaaS	01/2022 to 03/2023
Doximity - San Francisco, CA
Collaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp B2B SaaS ad targeting product for pharma clients.
Launched a novel high-priority tool for sales team with data and engineering within 10 days, enabling over $5M in sales in first 3 months.
Reduced Salesforce pricing errors by $200K by working with engineers to fix issues with auto-generated pricing.
Improved client ROIs by designing and implementing framework with data scientist  to target users with ad inventory.
Business Analyst	02/2020 to 01/2022
Doximity - San Francisco, CA
Analyzed business impact with SQL and worked with pricing director to offer Telemedicine product ad-free during COVID-19.
Optimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Salesforce, Excel, and Looker analytics.
Generated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL.
Associate Product Manager	01/2018 to 02/2020
Doximity - San Francisco, CA
Provided robust support for the rollout of a major user flow change impacting 300k monthly active users (MAU).
Improved marketing email CTR by 3% with an AB test working with design team that is now  current email gold standard.
Worked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and executed switch to Looker.
Education
Data Science Immersive (Student)	03/2023 to 07/2023
Flatiron - Remote
Applied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score).
Built ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Netflix competition winner 0.8567 RMSE).
Predicted h1n1 vaccination status of 26k survey respondents using machine learning.
Online Learning with Certificates of Completion	12/2019 to 03/2021
Udemy - Online
Business Analysis, Advanced Web Development, Algorithms, Data Structures
AB in Engineering Science, BE in Electrical Engineering	08/2013 to 06/2017
Dartmouth College - Hanover, NH

`
export const demoJSON = {
  "name": "Will Bennett",
  "title": "Product Manager",
  "email": "wbennett71sdf1@gmail.com",
  "phone": "207-239-0234",
  "social_links": {
    "Github": "https://github.com/willmbennett",
    "LinkedIn": "https://linkedin.com/in/willmbennett/"
  },
  "location": "Cupertino, CA",
  "summary": "Adaptable and growth-oriented Product Manager specializing in B2B SaaS and Technical Product Management. With a strong grasp of web development fundamentals, I effortlessly converse with engineers and excel at diving into technical issues. Known for creative problem-solving and a track record of driving sustainable growth at Doximity, Will I thrive in dynamic, small-team environments. Committed to rolling up my sleeves and overcoming roadblocks, I'm passionate about building structured systems and processes for long-term success.",
  "areas_of_expertise": [
    "Technical Product Management",
    "B2B SaaS Expertise",
    "Project Scope Planning",
    "Engineering Coordination",
    "Customer-Driven Roadmapping",
    "Web Development Fundamentals",
    "SalesForce Platform Integration",
    "Technical Problem-Solving",
    "Startup Growth Strategies",
    "Process and System Building",
    "Agile Project Management"
  ],
  "skills": [
    "Product Management",
    "Jira, Roadmapping", "Agile Development", "Wireframing", "Scrum", "Salesforce",
    "Data Science",
    "SQL", "Looker", "Colab", "Mixpanel", "Tableau", "Snowflake", "BigQuery", "Excel", "Python", "TensorFlow", "Keras", "Object Oriented Programming", "scikit-learn", "Spark", "pandas", "numpy",
    "Web Development",
    "React.js", "Node.js", "JavaScript", "HTML", "CSS", "Markup"
  ],
  "professional_experience": [
    {
      "title": "Technical Product Manager, B2B SaaS",
      "company": "Doximity",
      "location": "San Francisco, CA",
      "start_date": "01/2022",
      "end_date": "03/2023",
      "responsibilities": [{
        "content": "Collaborated cross-functionally with engineering, data, design, sales, and marketing teams to revamp B2B SaaS ad targeting product for pharma clients",
        "starStory": ""
      },
      {
        "content": "Launched a novel high-priority tool for sales team with data and engineering within 10 days, enabling over $5M in sales in first 3 months",
        "starStory": ""
      },
      {
        "content": "Reduced Salesforce pricing errors by $200K by working with engineers to fix issues with auto-generated pricing",
        "starStory": ""
      },
      {
        "content": "Improved client ROIs by designing and implementing framework with data scientist  to target users with ad inventory",
        "starStory": ""
      }
      ]
    },
    {
      "title": "Business Analyst",
      "company": "Doximity",
      "location": "San Francisco, CA",
      "start_date": "02/2020",
      "end_date": "01/2022",
      "responsibilities": [{
        "content": "Analyzed business impact with SQL and worked with pricing director to offer Telemedicine product ad-free during COVID-19",
        "starStory": ""
      },{
        "content": "Optimized ad performance reviews, elevating goal attainment from 95% to 99% by leveraging Salesforce, Excel, and Looker analytics",
        "starStory": ""
      },{
        "content": "Generated $60M+ in revenue working with pricing director and BizOps SVP on price changes by analyzing user activity in SQL",
        "starStory": ""
      }
      ]
    },
    {
      "title": "Associate Product Manager",
      "company": "Doximity",
      "location": "San Francisco, CA",
      "start_date": "01/2018",
      "end_date": "02/2020",
      "responsibilities": [{
        "content": "Provided robust support for the rollout of a major user flow change impacting 300k monthly active users (MAU)",
        "starStory": ""
      },{
        "content": "Improved marketing email CTR by 3% with an AB test working with design team that is now  current email gold standard",
        "starStory": ""
      },{
        "content": "Worked with data scientists to build dimensional models, built BI dashboard for goals and KPI monitoring, planned and executed switch to Looker",
        "starStory": ""
      }
      ]
    }
  ],
  "education": [
    {
      "degree": "Data Science Immersive",
      "institution": "Flatiron",
      "location": "Remote",
      "details": [{
        "content": "Applied machine learning methodologies to end stage liver disease to improve outcome prediction (0.86 C-statistic vs. 0.78 gold standard MELD score)",
        "starStory": ""
      },{
        "content": "Built ALS Spark recommendation systems in python using the MovieLens dataset (0.87 RMSE vs Netflix competition winner 0.8567 RMSE)",
        "starStory": ""
      },{
        "content": "Predicted h1n1 vaccination status of 26k survey respondents using machine learning",
        "starStory": ""
      }
      ]
    },
    {
      "degree": "Online Learning with Certificates of Completion",
      "institution": "Udemy",
      "location": "Online",
      "details": [{
        "content": "Predicted h1n1 vaccination status of 26k survey respondents using machine learning",
        "starStory": "Business Analysis, Advanced Web Development, Algorithms, Data Structures"
      }
      ]
    },
    {
      "degree": "AB in Engineering Science, BE in Electrical Engineering",
      "institution": "Dartmouth College",
      "location": "Hanover, NH",
      "details": [{
        "content": "N/A",
        "starStory": ""
      }
      ]
    }
  ]
}