'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function ChatWithGPT({ message, response } : { message: any, response : string }) {

  const { messages, append } = useChat();
  
  // Automatically send the API call to OpenAI when the component mounts
  useEffect(() => {
    // If we haven't already stored a response
    if (response == '') {
      // Send the messages to ChatGPT
      append(message)
    }
  }, []);

  const lastMessage = messages[messages.length - 1];
  const generatedBios = lastMessage?.role === "assistant" ? lastMessage.content : null;
  
  return (
    <div>
      <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      {(response != '') && (
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center">
          <div
            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
            onClick={() => {
              navigator.clipboard.writeText(response);
              toast('Summary copied to clipboard', {
                icon: '✂️',
              });
            }}
            key={response}
          >
          <p>{response}</p>
        </div>
      </div>
      )}
      {generatedBios && (
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center p-8">
          <div
            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
            onClick={() => {
              navigator.clipboard.writeText(lastMessage.content);
              toast('Summary copied to clipboard', {
                icon: '✂️',
              });
            }}
            key={lastMessage.id}
          >
          <p>{lastMessage.content}</p>
        </div>
      </div>
      )}
    </div>
  );
}