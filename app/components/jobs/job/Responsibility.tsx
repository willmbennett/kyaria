'use client'

import ChatWithGPT from '../ChatWithGPT';

export default function Responsibility({
    documentID,
    setKey,
    content,
    message,
    updateResumeExperienceResponsibilities,
    saveToDatabase,
    parentIndex,
    childIndex
}: {
    documentID: string,
    setKey: string,
    content: string,
    message: any,
    updateResumeExperienceResponsibilities: any,
    saveToDatabase: any,
    parentIndex: number,
    childIndex: number
}) {

    return (
        <>
            <div className="py-2">
                <ChatWithGPT
                    documentID={documentID}
                    setKey={setKey}
                    message={message}
                    currentState={content}
                    updateState={updateResumeExperienceResponsibilities}
                    parentIndex={parentIndex}
                    childIndex={childIndex}
                    saveToDatabase={saveToDatabase}
                />
            </div>
        </>
    );
}
