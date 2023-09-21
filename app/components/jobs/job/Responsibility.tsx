'use client'

import ChatWithGPT from '../ChatWithGPT';
import { useState } from 'react';

export default function Responsibility({
    documentID,
    setKey,
    content,
    message,
    updateResumeExperienceResponsibilities,
    parentIndex,
    childIndex
}: {
    documentID: string,
    setKey: string,
    content: string,
    message: any,
    updateResumeExperienceResponsibilities: any,
    parentIndex: number,
    childIndex: number
}) {

    return (
        <>
            <div className="py-2">
                <ChatWithGPT
                    collection='jobs'
                    documentID={documentID}
                    setKey={setKey}
                    message={message}
                    currentState={content}
                    updateState={updateResumeExperienceResponsibilities}
                    parentIndex={parentIndex}
                    childIndex={childIndex}
                />
            </div>
        </>
    );
}
