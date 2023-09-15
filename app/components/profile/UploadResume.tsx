import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useChat } from 'ai/react';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    resume: string;
};


const expectedJson = {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "social_links": { "": "" },
    "location": "",
    "summary": "",
    "areas_of_expertise": ["", ""],
    "skills": ["", ""],
    "professional_experience": [
        {
            "title": "",
            "company": "",
            "location": "",
            "start_date": "",
            "end_date": "",
            "responsibilities": ["", ""]
        }
    ],
    "education": [
        {
            "degree": "",
            "institution": "",
            "location": "",
            "details": ["", ""]
        }
    ]
}

const defaultFormValue =
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

export default function UploadResume({ setDefaultValue }: { setDefaultValue: any }) {
    const [loading, setLoading] = useState(false)
    const [finishedLoading, setFinishedLoading] = useState(false)
    const [jsonString, setJsonString] = useState('')
    const { register, handleSubmit, control } = useForm<FormFields>({
        defaultValues: { resume: defaultFormValue }
    });

    const { messages, reload, append } = useChat({
        body: {
            temp: 0.1
        },
        onFinish() {
            setFinishedLoading(true)
        }
    });

    // Make a call to chatGPT
    const chatGPT = async (message: any) => {
        setLoading(true)
        append(message);
    };

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            setJsonString(messages[messages.length - 1].content);
            console.log(messages[messages.length - 1].content)
            setDefaultValue(JSON.parse(messages[messages.length - 1].content));
            setLoading(false)
        }
    }, [finishedLoading]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const message = [
            {
                "role": "system",
                "content": `You will be provided with unstructured data, and your task is to extract data from it. Return the data in the following format: ${JSON.stringify(expectedJson)}. If fields are empy simply return them as such.`
            },
            {
                "role": "user",
                "content": `Extract the resume details from this ${data.resume} text and return it in json format following this format: ${JSON.stringify(expectedJson)}`
            }
        ]
        console.log(message)
        chatGPT(message)
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">Create Your Profile</h1>
                <div className={BASIC_FIELD_STYLE}>
                    <p>Paste your resume text here</p>
                    <textarea {...register('resume')} placeholder="Resume Text" rows={15} cols={50}></textarea>
                </div>

                <div className={BASIC_FIELD_STYLE}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Submit</button>
                </div>
                {loading && (
                    <div>
                        <p>Insert Pretty Loading GIF Here</p>
                    </div>
                )}
            </form>
        </>
    );
}
