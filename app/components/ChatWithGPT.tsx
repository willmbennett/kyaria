'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';
const [updatedSummary, setUpdatedSummary] = useState('');

export default function ChatWithGPT({ message }) {
  const [updatedSummary, setUpdatedSummary] = useState('');
  const { messages, append } = useChat({
  });
  
  // If you want to automatically send the pre-generated message when the component mounts
  useEffect(() => {
    if (messages == '') {
      append(message);
    }
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const lastMessage = messages?.length ? messages[messages.length - 1] : null;
  
  return (
    <div>
      {lastMessage && (
        <div key={lastMessage.id}>
          {lastMessage.role === 'user' ? 'User: ' : 'AI: '}
          {lastMessage.content}
        </div>
      )}
    </div>
  );
}