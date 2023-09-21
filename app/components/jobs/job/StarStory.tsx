'use client'

import ChatWithGPT from '../ChatWithGPT';
import { useState } from 'react';

export default function StarStory({
    documentID,
    setKey,
    message,
    currentState,
    updateState,
    parentIndex,
    childIndex
}: {
    documentID: string,
    setKey: string,
    message: any,
    currentState: string,
    updateState: any,
    parentIndex: number,
    childIndex: number
}) {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <>
            <div className="py-2">
                <button
                    className='inline-flex shadow-md rounded-xl w-full my-2 p-3 hover:bg-gray-100 rounded text-gray-600 ml-auto hover:text-gray-600 outline-none'
                    onClick={handleClick}
                > Show Star Story
                </button>
                <div className={`${active ? ' ' : 'hidden'}`}>
                <ChatWithGPT
                    collection='jobs'
                    documentID={documentID}
                    setKey={setKey}
                    message={message}
                    currentState={currentState}
                    updateState={updateState}
                    parentIndex={parentIndex}
                    childIndex={childIndex}
                />
                </div>
            </div>
        </>
    );
}
