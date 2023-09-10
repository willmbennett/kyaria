'use client';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useChat } from 'ai/react';

interface Props {
  message: any;
  currentState: any;
  updateState: any;
  refresh?: boolean;
  temp?: number;
  copy?: boolean;
}

export default function ChatWithGPT({
  message,
  currentState,
  updateState,
  refresh = true,
  temp = 0.3,
  copy = true
}: Props) {
  const [finishedLoading, setFinishedLoading] = useState(false)
  const [usingSaved, setUsingSaved] = useState(false)

  const { messages, reload, append } = useChat({
    body: {
      temp: temp
    },
    onFinish() {
      setFinishedLoading(true)
    }
  });

  // Make a call to chatGPT
  const chatGPT = async (message: any) => {
    setFinishedLoading(false)
    append(message);
  };

  // Reload the last call
  const handleReload = () => {
    setFinishedLoading(false)
    if (usingSaved) {
      chatGPT(message)
    } else {
      reload();
    }
  };

  // Initiate the API call on page load
  useEffect(() => {
    if (!currentState) {
      //callOpenAI(message);
      chatGPT(message)
    } else {
      setUsingSaved(true)
    }
  }, []);

  // Save the final message to context
  useEffect(() => {
    if (finishedLoading) {
      updateState(messages[messages.length - 1].content.replace(/^"|"$/g, ''));
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
        {refresh && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleReload}
          >
            Refresh Output
          </button>
        )}
      </div>
      )}
    </>
  );
}
