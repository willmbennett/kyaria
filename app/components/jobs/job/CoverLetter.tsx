'use client'

import ChatWithGPT from '../ChatWithGPT';

export default function CoverLetter({
    jobData,
    userProfile,
    coverLetter,
    setCoverLetter
}: {
    jobData: any,
    userProfile: any,
    coverLetter: any,
    setCoverLetter: any
}) {

    const message = [
        {
            "role": "system",
            "content": `You are a professional cover letter writer specialized in creating personalized, compelling cover letters tailored to specific job descriptions. The letter should showcase the individual's experience, skills, and education, and should be organized into an introductory paragraph, a body, and a closing.
            <div class="header">
                <h1>[Your Name]</h1>
                <p>[Your Address]</p>
                <p>Email: [Your Email]</p>
                <p>Phone: [Your Phone Number]</p>
            </div>

            <div class="content">
                <p>Date: September 10, 2023</p>
                <p>Google</p>
                <p>[Company Address]</p>
                <p>New York City, NY</p>
                <br />
                <p>Dear Hiring Manager,</p>
                <br />
                <p>I am writing to express my interest in the Senior Software Engineer position at Google's New York City office, as listed on your careers page. With a strong background in backend development and a passion for problem-solving, I am excited about the opportunity to contribute to Google's innovative environment.</p>
                <br />
                <p>As a graduate in Computer Science with over 6 years of software development experience, I meet all the mandatory requirements for this role. I have a proven track record in developing robust software solutions, primarily using Java and Python. In my current role at [Current Company], I have designed and maintained RESTful APIs, implemented microservices architecture, and managed relational databases like MySQL. This experience, combined with my solid understanding of data structures, algorithms, and system design, makes me confident that I can contribute effectively to your team.</p>
                <br />
                <p>Beyond technical skills, I pride myself on my excellent communication abilities, which have enabled me to work effectively with cross-functional teams. I am also familiar with Google Cloud Platform and front-end technologies like React, matching your 'nice-to-have' criteria.</p>
                <br />
                <p>Google's reputation for fostering an open and collaborative work environment resonates with me, and I am particularly attracted to your hybrid remote work model. I am enthusiastic about the chance to bring my unique blend of skills and experience to Google. Thank you for considering my application. I am looking forward to the opportunity to further discuss my suitability for this position in an interview.</p>
                <br />
                <p>Yours sincerely,</p>
                <p>[Your Name]</p>
            </div>
            `
        },
        {
            "role": "user",
            "content": `Please write me a tailored cover letter for the following job description:
            - Job description: ${JSON.stringify(jobData)}
            Include information from my profile ${JSON.stringify(userProfile)}
            
            Structure the cover letter into an introduction, body, and conclusion.`
        }
    ];



    return (
        <>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                Stand out with a cover letter
            </h1>
            <ChatWithGPT
                collection='jobs'
                documentID={jobData._id}
                setKey='userCoverLetter'
                message={message}
                currentState={coverLetter}
                updateState={setCoverLetter}
                temp={0.5}
            />
        </>
    );
}
