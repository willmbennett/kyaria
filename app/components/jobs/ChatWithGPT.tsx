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
  updateState: any;
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
  updateState,
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
    updateState({ newContent, parentIndex, childIndex })
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
            className="bg-blue-300 hover:bg-blue-400 text-white mx-2 px-4 py-2 rounded mt-4"
            onClick={handleClick}
          >
            Generate
          </button>
        )}
        {loading && (
        <button
          className="bg-red-300 hover:bg-red-400 text-white mx-2 px-4 py-2 rounded mt-4"
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
