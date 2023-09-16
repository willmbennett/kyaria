'use client'

import ChatWithGPT from '../../ChatWithGPT';
import { useState } from 'react';

export default function Responsibility({
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
                <ChatWithGPT
                    collection='jobs'
                    documentID={documentID}
                    setKey={setKey}
                    message={message}
                    currentState={itemState}
                    updateState={setItemState}
                />
            </div>
        </>
    );
}
