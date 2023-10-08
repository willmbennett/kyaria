'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '../../../lib/utils'
import { ChatList } from './ChatList'
import { ChatPanel } from './ChatPanel'
import { EmptyScreen } from './EmptyScreen'
import { ChatScrollAnchor } from './ChatScrollAnchor'
import { useLocalStorage } from '../../../lib/hooks/use-local-storage'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from 'react-hot-toast'
import React from 'react'


export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
    const chatDivRef = React.useRef(null);

    const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
        'ai-token',
        null
    )
    const { messages, append, reload, stop, isLoading, input, setInput } =
        useChat({
            initialMessages,
            id,
            body: {
                id,
                previewToken
            },
            onResponse(response) {
                if (response.status === 401) {
                    toast.error(response.statusText)
                }
            }
        })
    return (
        <div className='h-screen'>
            <div ref={chatDivRef} className={cn('pb-[200px] pt-4 md:pt-10 overflow-y-scroll h-1/2 border rounded-xl', className)}>
                {messages.length ? (
                    <>
                        <ChatList messages={messages.filter(e => e.role != 'system')} />
                        <ChatScrollAnchor trackVisibility={isLoading} divRef={chatDivRef}/>
                    </>
                ) : (
                    <EmptyScreen setInput={setInput} />
                )}
            </div>
            <ChatPanel
                id={id}
                isLoading={isLoading}
                stop={stop}
                append={append}
                reload={reload}
                messages={messages}
                input={input}
                setInput={setInput}
            />
        </div>
    )
}