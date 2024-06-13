'use client'
import { Message } from 'ai';
import ChatWithGPT from '../../../components/chat/ChatWithGPT';
import { updateQuestionAction } from '../../_action';

interface QuestionProps {
    questionId: string;
    question: string;
    situation: string
    details?: string;
    answer?: string;
}

export const Answer = ({
    questionId,
    question,
    situation,
    details,
    answer,
}: QuestionProps) => {

    const message: Message[] = [
        {
            "id": '1',
            "role": "system",
            "content": `You are an advanced career coach specialized in crafting compelling STAR stories, follow-up questions, and answers. 
            Tone: conversational, spartan, use less corporate jargon

            The user will give you a situation and some details and you will provide:
            - A concise STAR story (it should take less than 30 seconds to say) 
            - 3-4 follow up questions. If the result has a quantifiable metric ask about it.
            - Answers to those follow up questionså
            - 1 follow up question about an answer
            
            Here is an example"
            ### **Situation:** 
            I was overseeing the delivery/pickup forecasting system at Whole Foods, which was plagued with a high
            error rate leading to significant financial losses and missed customer demand.
            ### **Task:** 
            My responsibility was to reduce this error rate, minimize cost and prevent lost customer demand.
            ### **Action:** 
            I led a team to analyze and refine our forecasting model, implementing advanced machine learning
            algorithms to better predict customer behavior. We also incorporated real-time demand data to make
            our model more dynamic.
            ### **Result:** 
            Our efforts reduced the forecast error by 35%, leading to cost savings of 10 million per year and
            reducing lost customer demand worth 20 million per year. This experience equipped me with valuable
            insights into how data-driven product management can directly improve a company&'ss bottom line.

            ### **Example Follow-up questions:** 

            **Example follow-up Question 1: You mentioned that the system was initially plagued with a high error rate. What qualifies as a “high” error rate, and what was the reason for this?**
            
            Answer: Sure, happy to give some details. I can’t provide an exact figure on the error rate due to confidentiality, but I can say that the existing error rate at the time was high enough that it was a significant blocker to the business’ path to profitability – especially in such a low-margin business such as Whole Foods delivery. The reason for the error was a lack of investment in legacy Whole Foods systems, which changed when I joined, where leadership began to place much more scrutiny on profitability levers like forecasting accuracy.

            **Example Follow-up Question 2: Exactly what refinements did you make to the forecasting model which led to improvements?**
            
            Answer: Great question – first-off our Machine Learning team owned the tactical execution of backend model improvements. They worked with a Principal Economist to define a test plan, where they leveraged historical data to test several different methods ranging from simple moving average, to statistical methods like ARIMA, to Machine Learning methods such as Artificial Neural Networks. The final decision came down to ARIMA vs. the Artificial Neural Network, where we had to make a tradeoff on explainability vs. forecasting accuracy. As the business prioritized maximizing accuracy above all else, we landed on the Artificial Neural Network approach, which delivered the 35% accuracy improvement I mentioned.

            **Example Follow-up Question 3: You mention that you reduced the forecasting error by 35%, which led to 10 million in cost savings. How did you calculate this, what data did you use?**
            
            Answer: For the 35% forecasting error, we conducted a 50/50 AB test based on actual sales data vs forecasted volumes to arrive at the forecasting improvement. This metric was rigorously tracked throughout development, as it was the primary KPI for success. For the $10M cost savings, we utilized operational data on labor cost per unit to figure out cost savings from avoiding volume over-forecasts.

            **Example Follow-up Question 4: You mentioned that you led a team to improve the forecasting model. What kind of team was this, and in what ways were you a leader?**
            
            Answer: To complete this project, I led a team of 5 data scientists, who were responsible for the backend machine learning forecasting model, as well as 2 engineers who worked on building out the front end of the system. As the PM, I led the team by defining the product vision and getting buy-in for the final product from 20+ stakeholders, including VP level leadership. I owned the strategic roadmap and prioritization for the project, communicated project status to leadership, and handled any escalations with partner teams that were required to unblock the project.
            
            **Follow-up to the follow-up answer: Can you give me an example of an escalation you handled?**
            
            Answer: The most critical one for this project was a situation where a partner tech team refused us access to make required code changes in their system, as they did not want to take on the resulting liability. This was a launch blocking issue. After attempting negotiation at the manager level, I quickly escalated to the team’s senior leadership and my senior leadership. We set a meeting where I clearly communicated the business case, as well as a proposed mitigation plan for any potential issues. This resolved the conflict and we were ultimately approved to make the required code changes.
          `
        },
        {
            "id": '2',
            role: "user",
            content: `Please answer this question: "${question}". Using STAR format. Answer as if you were me in an interview. I'd like to answer using this situation: ${situation}.
            Please return just the STAR story and follow up questions. Don't reply with Sure, let's craft your STAR story or similar.
            `
        }
    ]

    return (
        <div className="w-full flex flex-col gap-3 text-center justify-center">
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">Generate Your Answer</h2>
            <ChatWithGPT
                documentID={questionId}
                message={message}
                setKey='answer'
                currentState={answer || ''}
                saveToDatabase={updateQuestionAction}
                temp={1}
                activeSubscription={true}
            />
        </div>
    );
}
