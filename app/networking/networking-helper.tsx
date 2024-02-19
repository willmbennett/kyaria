import { PersonClass } from "../../models/Person";

export const networkingMessages = [
    {
        id: 1,
        participants: ["John Doe", "You"],
        subject: "Meeting Request",
        messages: [
            {
                sender: "John Doe",
                content: "I would like to discuss potential collaboration opportunities between our companies. Are you available for a meeting next week?",
                received: "Today",
            },
            {
                sender: "You",
                content: "Thank you for reaching out. I am available next week and look forward to discussing the collaboration opportunities. Please let me know a suitable time for you.",
                received: "Today",
            },
        ],
    },
    {
        id: 2,
        participants: ["Jane Smith", "You"],
        subject: "Follow-up Discussion",
        messages: [
            {
                sender: "Jane Smith",
                content: "Following our last meeting, I've drafted a proposal based on our discussion. Please find attached the document for your review. Looking forward to your feedback!",
                received: "Yesterday",
            },
            {
                sender: "You",
                content: "I received the proposal and will review it by the end of this week. I will get back to you with my feedback soon. Thank you!",
                received: "Yesterday",
            },
        ],
    },
    // Additional conversations can be added here
];

export function extractPersonTextForEmbedding(person: PersonClass): string {
    let textComponents: string[] = [];

    // Add basic fields
    if (person.name) {
        textComponents.push(person.name);
    }

    if (person.summary) {
        textComponents.push(person.summary);
    }

    if (person.allDescriptions) {
        textComponents.push(person.allDescriptions.join(''));
    }


    // Add description from employments if present
    if (person.employments) {
        person.employments.forEach(employment => {
            if (employment.description) {
                textComponents.push(employment.description);
            }
        });
    }

    // Add education majors and institutions
    if (person.educations) {
        person.educations.forEach(education => {
            if (education.institution?.name) {
                textComponents.push(education.institution.name);
            }
            if (education.major?.name) {
                textComponents.push(education.major.name);
            }
        });
    }

    // Articles
    if (person.articles) {
        person.articles.forEach(article => {
            if (article.summary) {
                textComponents.push(article.summary);
            }
            if (article.name) {
                textComponents.push(article.name);
            }
        });
    }

    // Awards
    if (person.awards) {
        person.awards.forEach(award => {
            if (award.title) {
                textComponents.push(award.title);
            }
        });
    }

    // Interests
    if (person.interests) {
        person.interests.forEach(interest => {
            if (interest.name) {
                textComponents.push(interest.name);
            }
        });
    }

    // Skills
    if (person.skills) {
        person.skills.forEach(skill => {
            if (skill.name) {
                textComponents.push(skill.name);
            }
        });
    }

    // Combine all text components into a single string
    return textComponents.join(" ");
}



export function extractResumeText(obj: any, parentKey = '') {
    let text = '';

    // Define keys to exclude from text extraction
    const includeKeys = [
        'location',
        'education',
        'volunteering',
        'professional_experience',
        'projects',
        'volunteering',
        'company',
        'institution',
        'organization',
        'title'
    ];

    // Check if the current object is directly a string and in the included keys
    if (typeof obj === 'string' && includeKeys.includes(parentKey)) {
        return obj + ' ';
    }

    // If the object is an array, iterate over it
    if (Array.isArray(obj)) {
        obj.forEach(item => {
            text += extractResumeText(item);
        });
    }
    // If the object is an object, iterate over its keys
    else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
            // Only include included keys
            if (includeKeys.includes(key)) {
                // Special handling for the location to include it
                if (key === 'location') {
                    text += obj[key] + ' ';
                } else {
                    // Recursively process the current key
                    text += extractResumeText(obj[key], key);
                }
            }
        });
    }

    return text;
}