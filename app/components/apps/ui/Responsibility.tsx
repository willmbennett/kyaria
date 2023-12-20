'use client'

import ChatWithGPT from '../../board/ChatWithGPT';

export default function Responsibility({
    documentID,
    setKey,
    content,
    message,
    saveToDatabase,
    parentIndex,
    childIndex,
    jobKeyWords
}: {
    documentID: string,
    setKey: string,
    content: string,
    message: any,
    saveToDatabase: any,
    parentIndex: number,
    childIndex: number,
    jobKeyWords: string[]
}) {

    return (
        <>
            <div className="py-2">
                <ChatWithGPT
                    documentID={documentID}
                    setKey={setKey}
                    message={message}
                    currentState={content}
                    parentIndex={parentIndex}
                    childIndex={childIndex}
                    saveToDatabase={saveToDatabase}
                    jobKeyWords={jobKeyWords}
                    activeSubscription={true}
                />
            </div>
        </>
    );
}
