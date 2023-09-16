'use client'

import ChatWithGPT from '../../ChatWithGPT';
import { useState } from 'react';

export default function NestedItem({
    documentID,
    jobData,
    parentName,
    parentIndex,
    childName,
    childContent,
    childIndex
}: {
    documentID: string,
    jobData: jobFormat,
    parentName: string,
    parentIndex: number
    childName: string,
    childContent: string,
    childIndex: number
}) {
    const [itemState, setItemState] = useState(childContent)

    const message = [
        {
            "role": "system",
            "content":
                `You are an advanced career coach specialized in writing resume professional experience bullet points. 
                        Examples:
                        1. Maintained a 97% customer satisfaction rating as a customer care representative.
                        2. Exceeded department sales goals by an average of 15% quarter-on-quarter in 2016.
                        3. Cut page loading time by 50% by building a new cloud infrastructure, leading to a better customer experience.
                        `
        },
        {
            "role": "user",
            "content":
                `I'm applying for this job: ${JSON.stringify(jobData)}. Help me improve this resume bullet point ${itemState}. Keep the output under 132 characters.`
        }
    ]



    return (
        <>
            <ChatWithGPT
                documentID={documentID}
                updateRef={`${parentName}[${parentIndex}].${childName}[${childIndex}]`}
                message={message}
                currentState={itemState}
                updateState={setItemState}
            />
        </>
    );
}
