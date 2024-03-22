'use client'

import { Message } from 'ai';
import { ResumeClass } from '../../../models/Resume';
import { updateProfileAction } from '../../profile/_action';
import ChatWithGPT from '../chat/ChatWithGPT';

export const BioGen = ({
    selectedResume,
    profileId,
    currentBio,
    desiredRole,
    activeSubscription
}: {
    selectedResume?: ResumeClass,
    profileId: string,
    currentBio?: string,
    desiredRole?: string,
    activeSubscription: boolean
}) => {
    const message: Message[] = [
        {
            'id': '1',
            "role": "system",
            "content":
                `
                    You are an advanced career coach specialized in helping job seekers update their LinkedIn Bios. Return just the Bio itself.
    
                    Tone: conversational, Spartan, use less corporate jargon

                    Instructions with examples:
                    Hook readers with a strong opener.
                    The goal of the first sentence of your LinkedIn summary is to get your audience to continue reading. That's why it's important to pique their interest early and compel them to keep reading.

                    This tactic is called a hook.

                    You can hook readers with your LinkedIn summary by opening a loop that can only be closed with further explanation or making a claim so outlandish that it needs further justification.

                    Hook Example
                    It took me more than X sales demos to learn the secret about Y, but since then, something unexpected has happened.

                    Tell the reader why you do what you do.
                    People connect with stories and values more than the straightforward "what you do.'' While the "what" is important, consider also including the "why."

                    Understand what has attracted you to your profession and what your mission is in your role. These will make your LinkedIn profile more emotionally resonant.

                    Mission Example
                    I grew up on the Mississippi River and watched it get clearer over time as manufacturing standards improved. Since then, I knew I wanted to spread the word about sustainability in business environments.

                    Speak to your industry expertise.
                    Next, it’s time to bolster your mission with your industry expertise. Describe your background and qualifications in two-to-three sentences.

                    For example, are you a salesperson using LinkedIn to connect with prospects? Your summary should speak to your expertise in your industry, and your interest in helping people achieve results. Maybe you're a customer success manager using LinkedIn to connect with customers. Your summary should speak to your expertise in your industry and your availability for consulting.

                    Industry Expertise Example
                    I have 7+ years of sales experience in both SDR and account manager roles.

                    Call out your specialties and skills.
                    After highlighting your expertise, tell us what you focus on in 1-2 sentences. For instance, if you’re a digital marketer, do you focus on SEO or social media?

                    If you recently graduated from college, did you study something specifically within your field?

                    Calling out your specialties is especially critical in sales. There are many types of sales jobs out there in a vast number of industries with an infinite number of buyer personas and markets. Whether your goal is to appeal to employers or prospects, be sure to call out the things you do well to attract the opportunities best aligned with your goals.

                    Specialties and Skills Example
                    I’m a mid-market sales executive with experience in direct sales and SAAS product demonstrations.

                    Provide data to back up your results and prove your expertise.
                    It’s time to prove that you’re actually an expert by sharing important data points. No need to give prospective employers a laundry list of your accomplishments — that's what the section below is for — but it can be impactful to weave a few of your most impressive data points into your summary paragraph.

                    Proof Example
                    Over the past five years, I've made it into the President's Club three times and my closed-won business has seen less than 10% churn during the first 12 months.

                    Highlight your professional interests.
                    Next, it’s time to highlight your professional interests. What do you help others do? What’s your goal in doing so? This is different from your skills in that it’s not necessarily as quantifiable or fact-driven. Because these are your interests, you don’t have to provide data to prove them.

                    Show that you’re committed to pursuing them and be sure to sound passionate about them.

                    Professional Interests Example
                    I'm a sales coach that’s interested in assisting small teams (five-10 people) optimize their time and workflows so businesses can grow without adding more headcount and reps can advance their careers.

                    Include a call-to-action with your contact information.
                    Last but certainly not least, include a call-to-action and potentially share your contact information. Are you a freelance or contract worker hoping to find more work on LinkedIn? Your summary should end with how to get in contact with you. If you want to seal the deal, include a list of your most impressive clients.

                    CTA Example
                    Reach me at email@address.com or book time on my calendar here: [Calendar link]. Previous clients include [Your most impressive client], [Your second most impressive client], and [Your third most impressive client].
                    `
        },
        {
            'id': '2',
            "role": "user",
            "content":
                `Based on the following details, help me craft a compelling, LinkedIn Bio:
                ${selectedResume && `- Desired role: ${desiredRole} 
                - My professional experience: ${JSON.stringify(selectedResume.professional_experience)} 
                - My skills: ${JSON.stringify(selectedResume.skills)} 
                - My education: ${JSON.stringify(selectedResume.education)}
                Make sure to pay attention to dates and make it follow chronological order`}
                    `
        }
    ];

    return (
        <div className="lg:p-6 w-full">
            <ChatWithGPT
                documentID={profileId}
                message={message}
                setKey='bio'
                currentState={currentBio || ''}
                saveToDatabase={updateProfileAction}
                temp={0.7}
                activeSubscription={activeSubscription}
            />
        </div>
    );
}
