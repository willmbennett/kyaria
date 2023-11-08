'use client';
import { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { Message } from 'ai'
import { ChatMessage } from './ChatMessage';
import { Button } from '../Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';

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
  jobKeyWords?: string[]
}

type FormFields = {
  input: string;
};

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
  jobKeyWords
}: Props) {
  const path = usePathname()
  const router = useRouter()
  const [finishedLoading, setFinishedLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const { messages, setMessages, reload, append, stop } = useChat({
    body: {
      temp: temp
    },
    initialMessages: [...message, { id: '1', role: 'assistant', content: currentState }],
    onFinish() {
      setFinishedLoading(true);
      setLoading(false);
    }
  });

  // Reload the last call
  const handleClick = () => {
    setFinishedLoading(false)
    setLoading(true)
    if (edit) {
      setEdit(false);
      append({
        role: "user",
        content: `Please help me refine this: ${watch("input")}`
      })
    } else if (currentState == '') {
      setMessages([])
      append(message);
    } else {
      reload()
    }
  };
  // Reload the last call
  const handleStop = () => {
    stop()
    setLoading(false);
  };

  // Reload the last call
  const handleReset = () => {
    setEdit(false);
    setLoading(true)
    setMessages([])
    append(message);
  };

  // cancel editing
  const handleCancel = () => {
    setEdit(false);
    setValues({ input: currentState })
  };

  // Save an edit
  const handleSave = async () => {
    setEdit(false);
    const messageSaved = watch("input")

    // Save the message to the database
    const id = documentID;
    //console.log(`"${setKey}":"${returnedMessage}"`)
    const data = JSON.parse(`{"${setKey}":""}`)
    data[setKey] = messageSaved
    lastmessage.content = messageSaved
    //console.log(id, data)
    const update = await saveToDatabase(id, data, "/")
    router.push(path, { scroll: false })
  };

  const saveMessage = async () => {
    const returnedMessage = lastmessage.content

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

  const [edit, setEdit] = useState(false)
  // Click to edit the document
  const handleEdit = () => {
    setValues({ input: lastmessage.content })
    setEdit(true);
  };
  const [values, setValues] = useState<FormFields>();
  const { register, watch, formState: { errors } } = useForm<FormFields>({
    defaultValues: { input: currentState },
    values
  });

  const lastmessage = messages[messages.length - 1]

  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <div className="flex-col flex items-center justify-center w-full">
      <div className='flex-col w-full'>
        <div className='flex flex-row justify-center'>
          {!loading && !edit && (
            <Button
              variant="solid"
              size="md"
              onClick={handleEdit}
              type="button"
              className="m-3"
            >
              Edit
            </Button>
          )}
          {!loading && edit && (<>
            <Button
              variant="secondary"
              size="md"
              onClick={handleCancel}
              type="button"
              className="m-3"
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              size="md"
              onClick={handleSave}
              type="button"
              className="m-3"
            >
              Save
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={handleReset}
              type="button"
              className="m-3"
            >
              Reset
            </Button>
          </>)}
          {!loading && (<>
            <Button
              variant="solid"
              size="md"
              onClick={handleClick}
              type="button"
              className="m-3"
            >
              {currentState == ''? 'Generate': 'Tailor'}
            </Button>
          </>)}
          {loading && (
            <Button
              variant="ghost"
              size="md"
              onClick={handleStop}
              type="button"
              className="my-3"
            >
              Stop
            </Button>
          )}
        </div>
        {edit && (<>
          <button
            className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            onClick={toggleActive}
          > See instructions
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {active && (<div className="sticky top-5 bg-gray-100 p-4 rounded shadow-md w-full">
            <p className='mt-2'>Below is the answer we generated for you.</p>
            <p className='mt-2'>If you don't like any portion, you can delete it. </p>
            <p className='mt-2'>You can also add additional details you want to incorporate into the answer</p>
            <p className='mt-2'><strong>Example:</strong> If you'd like the output to highlight your communication skills, append "I excel in communication".</p>
            <p className='mt-2'>Once you've made your changes, click "generate". We'll produce a polished revision.</p>
            <p className='mt-2'>If you want to reset the output, click reset and we'll provide a fresh version.</p>
            <strong>Demo:</strong>
            <img className='mt-2' src="/editing-demo.gif" alt="editing demo" />
          </div>
          )}
          <textarea {...register('input', { required: true })} rows={lastmessage.content.length / 50} className='w-full' defaultValue={lastmessage.content} />
          {errors.input && <p className="text-red-500 mt-2">Don't leave this blank</p>}
        </>)}
        {lastmessage && !edit && lastmessage.role == 'assistant' && (
          <ChatMessage message={lastmessage} jobKeyWords={jobKeyWords || ['']} />
        )}
      </div>
    </div>
  );
}
