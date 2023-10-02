'use client';
import { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { Message } from 'ai'
import { ChatMessage } from './ChatMessage';

interface Props {
  documentID: string,
  setKey: string,
  message: any;
  currentState: any;
  saveToDatabase: any;
  temp?: number;
  copy?: boolean;
  parentIndex?: number;
  childIndex?: number;
}

export default function ChatWithGPT({
  documentID,
  setKey,
  message,
  currentState,
  saveToDatabase,
  temp = 0.3,
  copy = true,
  parentIndex,
  childIndex,
}: Props) {
  const [finishedLoading, setFinishedLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const { messages, setMessages, append, stop } = useChat({
    body: {
      temp: temp
    },
    initialMessages: [{ id: '1', role: 'assistant', content: currentState }],
    onFinish() {
      setFinishedLoading(true);
      setLoading(false);
    }
  });

  // Reload the last call
  const handleClick = () => {
    setFinishedLoading(false)
    setLoading(true)
    setMessages([])
    append(message);
  };
  // Reload the last call
  const handleStop = () => {
    stop()
    setLoading(false);
  };

  const saveMessage = async () => {
    const returnedMessage = messages[messages.length - 1].content

    // Save the message to the database
    const id = documentID;
    //console.log(`"${setKey}":"${returnedMessage}"`)
    const data = JSON.parse(`{"${setKey}":""}`)
    data[setKey] = returnedMessage
    //console.log(id, data)
    const update = await saveToDatabase(id, data, "/")

    // Update the state
    //console.log(finishedLoading)
    const newContent = returnedMessage;
    //console.log(newContent, parentIndex, childIndex)
    //updateState({ newContent, parentIndex, childIndex })
  };

  // Save the final message to context
  useEffect(() => {
    if (finishedLoading) {
      saveMessage()
    }
  }, [finishedLoading]);

  const lastmessage = messages[messages.length - 1]

  return (
    <div className="flex-col flex items-center justify-center w-full">
      <div className='flex-col w-full'>
        <div className='flex w-full justify-center'>
          {!loading && (
            <button
              className="inline-block bg-dartmouth-green rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleClick}
            >
              Generate
            </button>
          )}
          {loading && (
            <button
              className="inline-block bg-red-200 rounded px-6 pb-2 pt-2.5 text-xs hover:opacity-80 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleStop}
            >
              Stop
            </button>

          )}
        </div>
        {lastmessage && lastmessage.role == 'assistant' && (
          <ChatMessage message={lastmessage} />
        )}
      </div>
    </div>
  );
}
