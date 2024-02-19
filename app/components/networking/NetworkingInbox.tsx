'use client'
// Import necessary components and hooks
import { useState } from 'react';
import { Button } from '../Button';
import { networkingMessages } from '../../networking/networking-helper';
import ReactTextareaAutosize from 'react-textarea-autosize';

export function NetworkingInbox() {
  const [selectedConversationId, setSelectedConversationId] = useState(networkingMessages[0].id);

  // Find the selected conversation based on the selectedConversationId
  const selectedConversation = networkingMessages.find(conversation => conversation.id === selectedConversationId) || networkingMessages[0];


  return (
    <div className="flex flex-row h-full">
      {/* Sidebar: Message List */}
      <div className="w-1/3 space-y-4 pr-4 overflow-y-auto h-full" style={{ maxHeight: '80vh' }}>
        <div className='flex flex-row justify-between '>
          <h2 className="text-2xl font-semibold leading-tight text-slate-900">Conversations</h2>
          <Button size='sm'>New</Button>
        </div>
        {networkingMessages.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 rounded-lg cursor-pointer ${selectedConversationId === conversation.id ? 'bg-slate-200' : 'bg-white hover:bg-slate-50'}`}
            onClick={() => setSelectedConversationId(conversation.id)}
          >
            <h3 className="text-lg font-medium text-slate-900">{conversation.subject}</h3>
            <p className="text-sm text-slate-700">With {conversation.participants.filter(participant => participant !== "You").join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Main Content: Selected Conversation Messages */}
      <div className="w-2/3 bg-white p-6 rounded-lg shadow overflow-y-auto h-full flex flex-col justify-between" style={{ maxHeight: '80vh' }}>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">{selectedConversation.subject}</h1>
          {/* Message Display */}
          {selectedConversation.messages.map((message, index) => (
            <div key={index} className={`mb-4 p-4 ${message.sender == 'You' ? 'bg-slate-200' : 'bg-slate-50'} rounded-lg`}>
              <div className={`${message.sender == 'You' ? 'text-end' : ''}`}>
                <p className="text-sm text-slate-500 mb-2">{message.sender} - {message.received}</p>
              </div>
              <p className="text-slate-700">{message.content}</p>
            </div>
          ))}
        </div>
        {/* Message Sending Form */}
        <form onSubmit={(e) => {
          console.log(e)
        }}>
          <ReactTextareaAutosize
            name="messageContent"
            rows={1}
            className="w-full p-2 text-sm text-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your message here..."
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
