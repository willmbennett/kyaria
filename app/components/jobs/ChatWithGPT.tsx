'use client';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useChat } from 'ai/react';
import { updateJobAction } from '../../jobs/[id]/_action';

interface Props {
  collection: string,
  documentID: string,
  searchKey?: string,
  searchVal?: string,
  setKey: string,
  message: any;
  currentState: any;
  updateState: any;
  saveToDatabase: any;
  refresh?: boolean;
  temp?: number;
  copy?: boolean;
  parentIndex?: number;
  childIndex?: number;
}

export default function ChatWithGPT({
  collection,
  documentID,
  searchKey,
  searchVal,
  setKey,
  message,
  currentState,
  updateState,
  saveToDatabase,
  refresh = true,
  temp = 0.3,
  copy = true,
  parentIndex,
  childIndex,
}: Props) {
  const [finishedLoading, setFinishedLoading] = useState(false)

  const { messages, setMessages, append } = useChat({
    body: {
      temp: temp
    },
    onFinish() {
      setFinishedLoading(true)
    }
  });

  // Reload the last call
  const handleClick = () => {
    setFinishedLoading(false)
    setMessages([])
    if (['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '')) {
      setFinishedLoading(true)
    } else {
      append(message);
    }
  };

  const saveMessage = async () => {
    const returnedMessage = ['development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '')?
      `${documentID}-${setKey}-test`
      :
      messages[messages.length - 1].content.replace(/^"|"$/g, '')

    // Save the message to the database
    const id = documentID;
    //console.log(`"${setKey}":"${returnedMessage}"`)
    const data = JSON.parse(`{"${setKey}":""}`)
    data[setKey] = returnedMessage
    //console.log(id, data)
    const update = await saveToDatabase(id, data, "/")

    // Update the state
    console.log(finishedLoading)
    const newContent = returnedMessage;
    console.log(newContent, parentIndex, childIndex)
    updateState({ newContent, parentIndex, childIndex })
  };

  // Save the final message to context
  useEffect(() => {
    if (finishedLoading) {
      saveMessage()
    }
  }, [finishedLoading]);


  const lastmessage = (messages.length >= 1) && (messages[messages.length - 1].role == 'assistant') ? messages[messages.length - 1].content.replace(/^"|"$/g, '') : currentState;

  return (
    <>
      {copy && (<Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />)}
      {lastmessage && (
        <div className="flex flex-1 w-full flex-col items-center justify-center text-left">
          {copy ?
            <div
              className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
              onClick={() => {
                navigator.clipboard.writeText(lastmessage);
                toast('Summary copied to jobSection', {
                  icon: '✂️',
                });
              }}
              key={lastmessage}
            >
              <div className="product-des" dangerouslySetInnerHTML={{ __html: lastmessage }}></div>
            </div>
            :
            <div className="bg-white rounded-xl shadow-md p-4 transition border">
              <div className="product-des" dangerouslySetInnerHTML={{ __html: lastmessage }}></div>
            </div>
          }
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleClick}
      >
        Generate
      </button>
    </>
  );
}
