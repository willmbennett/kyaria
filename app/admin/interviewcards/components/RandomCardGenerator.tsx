"use client"

import { useState } from "react";
import { CardImage } from "../../../components/mockinterviews/CardImageComponent"

const data = [
    {
        mockInterviewDate: "2024-06-01",
        interviewName: "Software Engineering Phone Screen, Google",
        overallScore: 8.5,
        feedback: "Your performance in the mock interview was exceptional. You provided thorough details and comprehensive points, addressing all key areas with outstanding examples. Your knowledge of algorithms and data structures is impressive, and you demonstrated strong problem-solving skills. Keep up the excellent work!"
    },
    {
        mockInterviewDate: "2024-06-15",
        interviewName: "Data Science Technical Interview, Facebook",
        overallScore: 6.8,
        feedback: "You have a solid understanding of statistical concepts and machine learning principles. Your answers were very good, with all points addressed and relevant examples provided. However, there is still room for improvement in coding efficiency and practical application of your knowledge. Continue practicing and refining your skills."
    },
    {
        mockInterviewDate: "2024-06-10",
        interviewName: "Frontend Developer Assessment, Amazon",
        overallScore: 7.3,
        feedback: "You did an excellent job on the frontend developer assessment. Your understanding of React and modern JavaScript is strong, and you provided comprehensive and relevant answers. Focus on performance optimization and enhancing the accessibility of your applications to further improve your skillset."
    },
    {
        mockInterviewDate: "2024-06-02",
        interviewName: "Backend Developer Technical Interview, Microsoft",
        overallScore: 9.1,
        feedback: "Outstanding performance in the mock interview. You demonstrated a deep understanding of backend development concepts and provided excellent examples. Your problem-solving skills and coding efficiency were top-notch. Keep pushing the boundaries of your knowledge!"
    },
    {
        mockInterviewDate: "2024-06-12",
        interviewName: "Full Stack Developer Interview, Netflix",
        overallScore: 7.9,
        feedback: "Very good job on the full stack developer interview. You covered all key points and provided relevant examples. There is still room for improvement in your front-end optimization techniques. Keep working on polishing your skills for even better results."
    },
    {
        mockInterviewDate: "2024-06-05",
        interviewName: "Machine Learning Engineer Interview, Apple",
        overallScore: 8.2,
        feedback: "Great job in the mock interview. You have a solid understanding of machine learning algorithms and their applications. Your examples were relevant and comprehensive. Focus on optimizing your models for better performance. Well done!"
    },
    {
        mockInterviewDate: "2024-06-15",
        interviewName: "DevOps Engineer Technical Screen, Spotify",
        overallScore: 7.5,
        feedback: "Excellent understanding of DevOps practices and tools. Your answers were detailed and covered all the necessary points. Continue to improve your practical implementation skills for better results. Great work!"
    },
    {
        mockInterviewDate: "2024-06-20",
        interviewName: "Cybersecurity Specialist Interview, Cisco",
        overallScore: 9.3,
        feedback: "Your performance was outstanding. You demonstrated extensive knowledge of cybersecurity principles and practices. Your answers were detailed and covered all key areas with exemplary examples. Keep up the exceptional work!"
    },
    {
        mockInterviewDate: "2024-06-01",
        interviewName: "Data Analyst Technical Interview, IBM",
        overallScore: 6.9,
        feedback: "Good job on the data analyst interview. You have a solid understanding of data analysis techniques and tools. There is room for improvement in your data visualization skills. Keep practicing to enhance your overall proficiency."
    },
    {
        mockInterviewDate: "2024-06-10",
        interviewName: "Product Manager Assessment, Adobe",
        overallScore: 7.8,
        feedback: "Very good performance in the mock interview. You covered all key areas of product management and provided relevant examples. Continue to improve your strategic planning and stakeholder communication skills for even better results."
    },
    {
        mockInterviewDate: "2024-06-14",
        interviewName: "Mobile App Developer Interview, Uber",
        overallScore: 4.5,
        feedback: "Your answers demonstrated a decent understanding of mobile app development concepts. However, there were some gaps in your knowledge and the examples provided were somewhat lacking. Focus on strengthening your understanding of core principles and providing more detailed examples."
    },
    {
        mockInterviewDate: "2024-06-20",
        interviewName: "Game Developer Technical Screen, Electronic Arts",
        overallScore: 5.8,
        feedback: "You showed a good grasp of game development basics. Some answers were strong, but others lacked depth and detail. Try to give more comprehensive answers and provide better examples to improve your score."
    },
    {
        mockInterviewDate: "2024-06-15",
        interviewName: "Cloud Solutions Architect Interview, AWS",
        overallScore: 6.3,
        feedback: "You have a good understanding of cloud architecture principles. However, there were areas where your answers could have been more thorough. Improve your examples and provide more detailed explanations to enhance your performance."
    },
    {
        mockInterviewDate: "2024-06-10",
        interviewName: "Business Analyst Technical Interview, Deloitte",
        overallScore: 4.8,
        feedback: "Your performance was average. You covered the main points but lacked depth in your responses. Providing more relevant examples and elaborating on your answers will help improve your score."
    },
    {
        mockInterviewDate: "2024-06-05",
        interviewName: "System Administrator Interview, IBM",
        overallScore: 5.2,
        feedback: "You have a basic understanding of system administration. Some answers were well-explained, while others were too brief. Focus on providing more detailed and comprehensive responses to improve your performance."
    },
    {
        mockInterviewDate: "2024-06-12",
        interviewName: "Network Engineer Technical Screen, Juniper Networks",
        overallScore: 5.6,
        feedback: "Your answers were good but not exceptional. There is a need to provide more in-depth explanations and better examples. Strengthen your understanding of networking concepts to improve your score."
    },
    {
        mockInterviewDate: "2024-06-20",
        interviewName: "Technical Writer Assessment, Google",
        overallScore: 6.1,
        feedback: "You demonstrated a solid understanding of technical writing. Some responses were well-structured, but others lacked detail. Focus on providing more comprehensive answers and examples to improve your score."
    },
    {
        mockInterviewDate: "2024-06-18",
        interviewName: "Quality Assurance Engineer Interview, Microsoft",
        overallScore: 4.3,
        feedback: "Your understanding of quality assurance principles is average. There were some gaps in your responses and the examples provided were insufficient. Work on providing more detailed and relevant examples to enhance your performance."
    },
    {
        mockInterviewDate: "2024-06-25",
        interviewName: "Database Administrator Technical Screen, Oracle",
        overallScore: 5.4,
        feedback: "You have a basic understanding of database administration. Some answers were strong, but others lacked detail and relevance. Focus on giving more comprehensive and detailed responses to improve your score."
    },
    {
        mockInterviewDate: "2024-06-30",
        interviewName: "IT Support Specialist Interview, HP",
        overallScore: 3.9,
        feedback: "Your performance was below average. While you covered some points, your answers lacked depth and detail. Providing more thorough explanations and better examples will help improve your performance."
    },
    {
        mockInterviewDate: "2024-06-05",
        interviewName: "Junior Developer Interview, StartupX",
        overallScore: 2.5,
        feedback: "Your answers were incomplete and lacked detail. You need to improve your understanding of basic concepts and provide relevant examples. Practice more and try to cover all key points in your responses."
    },
    {
        mockInterviewDate: "2024-06-10",
        interviewName: "Help Desk Support Interview, TechCorp",
        overallScore: 1.8,
        feedback: "Your performance was poor. Many important points were missing, and the examples given were not relevant. Focus on understanding the core responsibilities and improving your responses."
    },
    {
        mockInterviewDate: "2024-06-12",
        interviewName: "Internship Interview, InnovateLabs",
        overallScore: 3.0,
        feedback: "Your answers showed some basic understanding but lacked depth. Key points were missing and examples were insufficient. Work on providing more detailed and relevant answers."
    },
    {
        mockInterviewDate: "2024-06-18",
        interviewName: "Customer Service Interview, SupportHub",
        overallScore: 2.2,
        feedback: "Your responses were inadequate and lacked relevance. Important points were missed, and the examples provided did not support your answers well. Improve your knowledge and focus on providing more comprehensive responses."
    },
    {
        mockInterviewDate: "2024-06-22",
        interviewName: "Office Assistant Interview, CorpSolutions",
        overallScore: 1.5,
        feedback: "Your performance was very poor. Most points were missing, and the examples given were irrelevant. You need to understand the role better and provide more detailed and relevant responses."
    },
    {
        mockInterviewDate: "2024-06-27",
        interviewName: "Marketing Assistant Interview, AdAgency",
        overallScore: 2.8,
        feedback: "Your answers were below average. While you covered some points, they lacked depth and relevance. Focus on providing more detailed and well-supported responses to improve your performance."
    },
    {
        mockInterviewDate: "2024-06-23",
        interviewName: "Data Entry Clerk Interview, DataCorp",
        overallScore: 1.0,
        feedback: "Your answers were very poor. Few points were mentioned and most issues were missing. The examples provided were not relevant. Improve your understanding of the role and practice giving more detailed responses."
    },
    {
        mockInterviewDate: "2024-06-15",
        interviewName: "Warehouse Worker Interview, LogisticsInc",
        overallScore: 3.2,
        feedback: "Your performance was below average. You covered some points with relevant information but lacked depth. Provide more detailed and comprehensive answers to improve your performance."
    },
    {
        mockInterviewDate: "2024-06-20",
        interviewName: "Receptionist Interview, WelcomeServices",
        overallScore: 2.0,
        feedback: "Your answers were incomplete and lacked relevance. Important points were missed, and the examples provided were insufficient. Work on understanding the role better and provide more detailed responses."
    },
    {
        mockInterviewDate: "2024-06-10",
        interviewName: "Sales Associate Interview, RetailCo",
        overallScore: 3.1,
        feedback: "Your answers were somewhat relevant but lacked depth and detail. Important points were covered, but the examples were insufficient. Improve your responses by providing more detailed and relevant information."
    }
];


const ITEMS_PER_PAGE = 5;


export const RandomCardGenerator = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    return (
        <div className="flex flex-col max-w-xl">
            {selectedData.map(interview => (
                <CardImage
                    key={interview.interviewName}
                    mockInterviewDate={interview.mockInterviewDate}
                    interviewName={interview.interviewName}
                    overallScore={interview.overallScore}
                    feedback={interview.feedback}
                />
            ))}
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}