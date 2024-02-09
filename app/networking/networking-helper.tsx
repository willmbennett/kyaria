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