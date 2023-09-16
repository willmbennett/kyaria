'use client'

import ChatWithGPT from '../../ChatWithGPT';
import { useState } from 'react';

export default function StarStory({
    documentID,
    searchKey,
    setKey,
    content,
    message
}: {
    documentID: string,
    searchKey?: string
    setKey: string,
    content: string,
    message: any
}) {
    const [itemState, setItemState] = useState(content)
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
                    currentState={itemState}
                    updateState={setItemState}
                />
                </div>
            </div>
        </>
    );
}
