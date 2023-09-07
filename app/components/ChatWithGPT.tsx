'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function ChatWithGPT({ message, response }) {

  const { messages, append } = useChat();
  
  // If you want to automatically send the pre-generated message when the component mounts
  useEffect(() => {
    if (response == '') {
      append(message)
    }
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

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