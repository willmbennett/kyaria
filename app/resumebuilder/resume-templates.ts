import { ResumeClass } from "../../models/Resume";

type resumeTemplateType = {
    templateName: string;
    template: Partial<ResumeClass>
}

export const resumeTemplates: resumeTemplateType[] = [
    {
        "templateName": "Senior Product Manager",
        "template":
        {
            "name": "Alex Johnson",
            "title": "Senior Product Manager",
            "email": "alex.johnson@email.com",
            "phone": "123-456-7890",
            "location": "San Francisco, CA",
            "social_links": {
                "Github": "https://Github.example.com",
                "LinkedIn": "https://linkedIn.example.com",
            },
            "summary": "Dynamic and results-oriented Senior Product Manager with over 5 years of experience in the tech industry, Alex has led the development and launch of innovative products, achieving significant increases in customer engagement and market share. He excels in strategic planning, Agile methodologies, and cross-functional team collaboration, adept at translating customer needs into profitable solutions. His data-driven approach and expertise in product lifecycle management uniquely position him to drive continuous improvement and innovation, consistently exceeding business objectives.",
            "professional_experience": [
                {
                    "title": "Senior Product Manager",
                    "company": "Innovative Tech Solutions",
                    "location": "San Francisco, CA",
                    "start_date": "2020-08-01",
                    "end_date": "Present",
                    "summary": "Played a pivotal role in driving product strategy and execution for our flagship products. Focused on delivering customer-centric solutions while leading diverse cross-functional teams to achieve company goals.",
                    "responsibilities": [
                        {
                            "content": "Led the development and successful launch of a flagship product, driving a 40% increase in customer engagement."
                        },
                        {
                            "content": "Managed cross-functional teams, fostering collaboration between engineering, marketing, and sales departments."
                        },
                        {
                            "content": "Implemented Agile methodologies, improving product development efficiency by 25% and reducing time-to-market."
                        },
                        {
                            "content": "Oversaw market research and analysis to guide product features and roadmap, resulting in a 15% uplift in market competitiveness."
                        }
                    ]
                },
                {
                    "title": "Product Manager",
                    "company": "Tech Innovate Inc.",
                    "location": "New York, NY",
                    "start_date": "2016-07-01",
                    "end_date": "2018-05-31",
                    "summary": "Led the development and launch of a groundbreaking multi-platform application, significantly expanding the user base and market share. Played a key role in market analysis and strategic planning, contributing to a notable increase in the company's competitiveness and customer satisfaction.",
                    "responsibilities": [
                        {
                            "content": "Spearheaded the development of a multi-platform application, resulting in a 30% growth in user base within a year."
                        },
                        {
                            "content": "Conducted comprehensive market analysis to identify new opportunities, leading to a 20% increase in market share."
                        },
                        {
                            "content": "Collaborated with product designers to enhance application design, boosted customer satisfaction ratings by 35%."
                        }
                    ]
                },
                {
                    "title": "Associate Product Manager",
                    "company": "Digital Dynamics",
                    "location": "Boston, MA",
                    "start_date": "2014-08-01",
                    "end_date": "2016-06-30",
                    "summary": "Contributed to the development of a cloud-based storage solution and managed the lifecycle of key software products. This role involved enhancing B2B client acquisition and revenue growth, as well as leading educational initiatives for internal teams to bolster knowledge and performance.",
                    "responsibilities": [
                        {
                            "content": "Assisted in the development of a cloud-based storage solution, contributing to a 50% increase in B2B client acquisition."
                        },
                        {
                            "content": "Managed product lifecycle for three key software products, leading to a consistent yearly revenue growth of 15%."
                        },
                        {
                            "content": "Organized and led quarterly product training sessions for support teams, enhancing team knowledge and performance."
                        }
                    ]
                }

            ],
            "education": [
                {
                    "degree": "Master of Business Administration",
                    "institution": "University of California, Berkeley",
                    "location": "Berkeley, CA",
                    "start_date": "2018-09-01",
                    "end_date": "2020-05-31",
                    "gpa": {
                        "score": "3.9"
                    },
                    "details": [
                        {
                            "content": "Graduated with honors, ranking in the top 10% of the class."
                        },
                        {
                            "content": "Led a successful consulting project for a local startup, providing strategic recommendations that were fully implemented."
                        }
                    ]
                },
                {
                    "degree": "Bachelor of Science in Business Administration",
                    "institution": "University of Southern California",
                    "location": "Los Angeles, CA",
                    "start_date": "2010-08-01",
                    "end_date": "2014-05-31",
                    "gpa": {
                        "score": "3.75",
                        "scoringSystem": "4.0"
                    },
                    "details": [
                        {
                            "content": "Specialized in Digital Marketing and E-Commerce, completing a capstone project on digital consumer behavior."
                        },
                        {
                            "content": "Active member and leader in the Business Strategy Club, organizing multiple industry networking events."
                        }
                    ]
                }
            ],
            "skills": [
                "Product Lifecycle Management",
                "Market Research",
                "Cross-functional Team Leadership",
                "Agile & Scrum Methodologies",
                "Data Analysis",
                "Strategic Planning",
                "User Experience Design",
                "Project Management",
                "Stakeholder Communication",
                "Budgeting & Forecasting",
                "Product Roadmapping",
                "Customer Journey Mapping",
                "Problem Solving",
                "Innovative Thinking",
                "Negotiation"
            ],
            "volunteering": [
                {
                    "involvement": "Community Outreach Coordinator",
                    "organization": "Tech for Good",
                    "location": "San Francisco, CA",
                    "start_date": "2019-01-01",
                    "end_date": "Present",
                    "current": true,
                    "show": true,
                    "summary": "Leading initiatives to bridge the technology gap in underprivileged communities.",
                    "details": [
                        {
                            "content": "Organized monthly workshops for introducing basic computer skills to various age groups."
                        },
                        {
                            "content": "Collaborated with local schools to provide students with access to coding and STEM education."
                        }
                    ]
                },
                {
                    "involvement": "Volunteer Project Manager",
                    "organization": "Green Tech Innovations",
                    "location": "San Francisco, CA",
                    "start_date": "2017-06-01",
                    "end_date": "2018-12-31",
                    "current": false,
                    "show": true,
                    "summary": "Managed projects focused on integrating sustainable technologies in local businesses.",
                    "details": [
                        {
                            "content": "Led a team of volunteers in consulting small businesses on energy-efficient technologies."
                        },
                        {
                            "content": "Organized community events to raise awareness about sustainable practices in technology."
                        }
                    ]
                }
            ]

        }
    },
    {
        "templateName": "Software Bootcamp Graduate",
        "template":
        {
            "sectionOrder": [
                "skills",
                "projects",
                "professional_experience",
                "education",
                "awards",
                "publications",
                "certifications",
                "volunteering",
                "interests"
            ],
            "name": "Jordan Smith",
            "title": "Software Engineer",
            "email": "jordan.smith@email.com",
            "social_links": {
                "Github": "https://Github.example.com",
                "LinkedIn": "https://linkedIn.example.com",
                "Website": "https://mywebsite.example.com",
            },
            "phone": "987-654-3210",
            "location": "Austin, TX",
            "summary": "Software Engineer with a unique background in writing and intensive full-stack development training from a Computer Science Bootcamp. Jordan has developed key skills in web technologies, evidenced by achievements like a user-engaging social media dashboard and a responsive online marketplace platform. Proficient in JavaScript, React.js, Node.js, and responsive web design, he combines creative problem-solving with technical expertise to create intuitive, efficient software solutions.",
            "professional_experience": [
                {
                    "title": "Editor",
                    "company": "Innovative Publishing Inc.",
                    "location": "Austin, TX",
                    "start_date": "2019-06-01",
                    "end_date": "2020-09-01",
                    "summary": "Played a crucial role in enhancing the editorial quality and content management at Innovative Publishing Inc. Oversaw the editing process from manuscript review to final publication, ensuring adherence to publishing standards and timelines.",
                    "responsibilities": [
                        {
                            "content": "Streamlined monthly magazine editing workflow, increasing output by 30% without compromising quality."
                        },
                        {
                            "content": "Enhanced online article appeal, resulting in a 25% rise in reader engagement and interaction."
                        },
                        {
                            "content": "Led SEO and editorial standards training, improving online content ranking by 20%."
                        }
                    ]
                }
            ],
            "education": [
                {
                    "degree": "Computer Science Bootcamp",
                    "institution": "TechBootcamp Institute",
                    "location": "Online",
                    "start_date": "2020-09-01",
                    "end_date": "2021-03-31",
                    "details": [
                        {
                            "content": "Completed intensive full-stack development curriculum, covering JavaScript, React.js, Node.js, and database management, achieving a 95% score in practical projects."
                        },
                        {
                            "content": "Collaborated on a capstone project to develop a full-featured web application, selected as 'Top Project' in the cohort."
                        },
                        {
                            "content": "Participated in weekly coding challenges and hackathons, consistently placing in the top 10% of participants, honing problem-solving and quick thinking skills."
                        }
                    ]

                },
                {
                    "degree": "Bachelor of Arts in Writing",
                    "institution": "State University",
                    "location": "Anytown, USA",
                    "start_date": "2015-08-01",
                    "end_date": "2019-05-31"
                }
            ],
            "projects": [
                {
                    "name": "Social Media Dashboard",
                    "organization": "Personal Project",
                    "Link": "https://socialdashboard.example.com",
                    "LinkTitle": "Github",
                    "start_date": "2021-04-01",
                    "end_date": "2021-06-30",
                    "current": false,
                    "show": true,
                    "summary": "Developed a responsive social media dashboard using React and Node.js, featuring real-time data analytics and user engagement metrics.",
                    "details": [
                        {
                            "content": "Designed an interactive, user-friendly interface with Chart.js, increased user engagement by 20%."
                        },
                        {
                            "content": "Developed and deployed robust backend services in Node.js, aggregated 3M data points from social media platforms."
                        },
                        {
                            "content": "Optimized application for high scalability and performance, successfully handling a 30% surge in traffic."
                        }
                    ]
                },
                {
                    "name": "Online Marketplace Platform",
                    "organization": "Academic Project",
                    "Link": "https://marketplace.example.com",
                    "LinkTitle": "Github",
                    "start_date": "2020-09-01",
                    "end_date": "2021-01-31",
                    "current": false,
                    "show": true,
                    "summary": "Built a full-stack marketplace application with user authentication, payment integration, and an interactive UI for seamless buying and selling experiences.",
                    "details": [
                        {
                            "content": "Developed a secure authentication system and smooth login and profile management, boosted user sign-up rate by 25%."
                        },
                        {
                            "content": "Integrated Stripe for efficient payment processing, resulting in a 30% reduction in payment errors."
                        },
                        {
                            "content": "Utilized React to design an intuitive single-page application, enhancing user experience and increasing traffic by 40%."
                        }
                    ]
                },
                {
                    "name": "Personal Portfolio Website",
                    "organization": "Personal Project",
                    "Link": "https://myportfolio.example.com",
                    "LinkTitle": "View Portfolio",
                    "start_date": "2021-07-01",
                    "end_date": "2021-09-30",
                    "current": false,
                    "show": true,
                    "summary": "Created a personal portfolio website to display development projects and technical blogs, utilizing modern web design principles and SEO strategies.",
                    "details": [
                        {
                            "content": "Implemented modern design using CSS Grid and Flexbox, improved project showcase user engagement by 35%."
                        },
                        {
                            "content": "Optimized website for search engines, achieving a 50% increase in organic traffic and expanding audience reach."
                        },
                        {
                            "content": "Integrated a blog section with CMS support, improved content management and facilitating a 25% increase in frequency."
                        }
                    ]
                }
            ],
            "skills": [
                "JavaScript",
                "React.js",
                "Node.js",
                "HTML/CSS",
                "RESTful APIs",
                "Git and Version Control",
                "Responsive Web Design",
                "SQL and NoSQL Databases",
                "Problem Solving",
                "Team Collaboration"
            ],
            "volunteering": [
                {
                    "involvement": "Coding Mentor",
                    "organization": "Local Coding Club",
                    "location": "Anytown, USA",
                    "start_date": "2019-09-01",
                    "end_date": "2020-08-31",
                    "summary": "Mentored high school students in introductory programming and web development, fostering a passion for technology."
                }
            ],
            "interests": [
                "Coding Challenges",
                "Tech Blogging",
                "Hiking",
                "Gaming",
                "Creative Writing"
            ]
        }
    },
    {
        "templateName": "Senior Software Engineer",
        "template": {
            "sectionOrder": [
                "skills",
                "professional_experience",
                "projects",
                "education",
                "awards",
                "publications",
                "certifications",
                "volunteering",
                "interests"
            ],
            "name": "Morgan Bailey",
            "title": "Senior Software Engineer",
            "email": "morgan.bailey@email.com",
            "phone": "321-654-0987",
            "location": "Seattle, WA",
            "social_links": {
                "Github": "https://github.com/morganbailey",
                "LinkedIn": "https://linkedin.com/in/morganbailey"
            },
            "summary": "Seasoned Senior Software Engineer with over 10 years of experience in software development, specializing in scalable cloud solutions and microservices architecture. Expertise in leading development teams, architecting robust software, and driving projects from conception to deployment. Proven track record in enhancing system efficiency and performance, with a strong focus on continuous integration and deployment (CI/CD) processes.",
            "professional_experience": [
                {
                    "title": "Senior Software Engineer",
                    "company": "TechSolutions Inc.",
                    "location": "Seattle, WA",
                    "start_date": "2018-04-01",
                    "end_date": "Present",
                    "summary": "Lead developer in a team responsible for developing and maintaining high-traffic web applications. Specialized in optimizing cloud-based infrastructure and implementing microservices.",
                    "responsibilities": [
                        {
                            "content": "Architected and implemented scalable microservices resulting in a 40% reduction in server response times."
                        },
                        {
                            "content": "Led the transition to a CI/CD pipeline, decreasing deployment frequency from weeks to daily and ensured 99.9% uptime."
                        },
                        {
                            "content": "Mentored junior developers and conducted code reviews, improving team efficiency and code quality."
                        }
                    ]
                },
                {
                    "title": "Software Developer",
                    "company": "Innovative Dev Studios",
                    "location": "Seattle, WA",
                    "start_date": "2014-05-01",
                    "end_date": "2018-03-31",
                    "summary": "Developed and maintained various enterprise-level applications, contributing significantly to the core product suite. Focused on backend development and database optimization.",
                    "responsibilities": [
                        {
                            "content": "Played a key role in developing a critical internal application, enhancing operational efficiency by 30%."
                        },
                        {
                            "content": "Optimized database queries, reducing load times by 25% for high-usage applications."
                        },
                        {
                            "content": "Collaborated in a cross-functional team to design and implement new features based on customer feedback."
                        }
                    ]
                },
                {
                    "title": "Junior Software Developer",
                    "company": "Startup Tech Inc.",
                    "location": "Seattle, WA",
                    "start_date": "2012-06-01",
                    "end_date": "2014-04-30",
                    "summary": "Started the professional journey as a Junior Software Developer, focusing on learning core software development principles and contributing to small-scale projects. Gained foundational skills in coding, debugging, and collaborating in a tech team environment.",
                    "responsibilities": [
                        {
                            "content": "Assisted in developing and maintaining web applications, gaining hands-on experience with JavaScript and PHP."
                        },
                        {
                            "content": "Participated in regular code reviews, learning best practices and improving coding standards."
                        },
                        {
                            "content": "Contributed to debugging and troubleshooting application issues, enhancing application stability and user experience."
                        }
                    ]
                }

            ],
            "projects": [
                {
                    "name": "Cloud Infrastructure Optimization",
                    "organization": "TechSolutions Inc.",
                    "Link": "https://cloudproject.example.com",
                    "LinkTitle": "Project Details",
                    "location": "Seattle, WA",
                    "start_date": "2019-01-01",
                    "end_date": "2019-12-31",
                    "current": false,
                    "show": true,
                    "summary": "Led the optimization of cloud infrastructure for a SaaS product, resulting in improved scalability and a 30% reduction in operating costs.",
                    "details": [
                        {
                            "content": "Developed automation scripts using Terraform, significantly reducing deployment time."
                        },
                        {
                            "content": "Managed AWS services, including EC2 and RDS, for optimal resource utilization."
                        },
                        {
                            "content": "Collaborated with the DevOps team to implement Docker for consistent deployment environments."
                        }
                    ]
                },
                {
                    "name": "Real-time Data Analytics Platform",
                    "organization": "Innovative Dev Studios",
                    "Link": "https://analyticsplatform.example.com",
                    "LinkTitle": "Project Overview",
                    "location": "Seattle, WA",
                    "start_date": "2020-05-01",
                    "end_date": "2021-04-30",
                    "current": false,
                    "show": true,
                    "summary": "Developed a real-time data analytics platform using microservices architecture, which enhanced data processing speed by 40%.",
                    "details": [
                        {
                            "content": "Architected microservices using Node.js and Kafka for efficient real-time data processing."
                        },
                        {
                            "content": "Implemented MongoDB for high-volume data storage and quick retrieval."
                        },
                        {
                            "content": "Ensured robustness and scalability of the platform to handle growing data volumes."
                        }
                    ]
                }
            ],
            "education": [
                {
                    "degree": "Bachelor of Science in Computer Science",
                    "institution": "University of Washington",
                    "location": "Seattle, WA",
                    "start_date": "2008-09-01",
                    "end_date": "2012-06-30"
                }
            ],
            "skills": [
                "Microservices Architecture",
                "Cloud Computing (AWS, Azure)",
                "Continuous Integration & Deployment (CI/CD)",
                "Agile & Scrum Methodologies",
                "Full-Stack Development (React, Node.js)",
                "Database Management (SQL, NoSQL)",
                "Code Review & Mentorship",
                "Performance Optimization",
                "Security Best Practices",
                "Software Architecture & Design"
            ],
            "volunteering": [
                {
                    "involvement": "Coding Mentor",
                    "organization": "Local Code Camp",
                    "location": "Seattle, WA",
                    "start_date": "2018-01-01",
                    "end_date": "Present",
                    "summary": "Volunteer mentor for aspiring software developers, providing guidance and support in coding best practices and career development."
                }
            ],
            "interests": [
                "Open Source Contribution",
                "AI and Machine Learning",
                "Hiking",
                "Drone Photography",
                "Travel Blogging"
            ]
        }
    }

]
