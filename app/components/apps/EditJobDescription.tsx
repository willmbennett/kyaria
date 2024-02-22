'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import { Button } from '../Button';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { updateJobAction } from '../../jobs/_action';

interface Props {
  label?: string;
  jobId: string;
  setKey: string;
  currentState: string;
  userCanEdit: boolean;
  stateStart?: boolean;
  toggleAdd?: any;
  index?: number;
  array?: string[]
  parentName?: string,
  deleatable?: boolean;
  useMarkdown?: boolean
}

type FormFields = {
  input: string;
};

export default function ProfileTextEdit({
  label,
  jobId,
  setKey,
  currentState,
  userCanEdit,
  stateStart = false,
  toggleAdd,
  index,
  array,
  parentName,
  deleatable = false,
  useMarkdown = false
}: Props) {
  const [edit, setEdit] = useState(stateStart)
  const router = useRouter()
  const path = usePathname()

  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    defaultValues: { input: currentState }
  });

  // Save the final message to the database
  const onSubmit: SubmitHandler<FormFields> = async (textinput) => {
    if (userCanEdit) {
      // Save the message to the database
      //console.log(`"${setKey}":"${textinput}"`)
      const data = JSON.parse(`{"${setKey}":""}`)
      data[setKey] = textinput.input
      //console.log(jobId, data)
      const update = await updateJobAction(jobId, data, "/")
      router.push(path, { scroll: false })
      setEdit(false)
      if (toggleAdd) {
        toggleAdd(false)
      }
    }
  };

  const toggleEdit = () => {
    setEdit(!edit)
  };

  const deleteItem = async () => {
    if (userCanEdit && deleatable && index !== undefined && parentName && array) {
      // Remove the item at the specified index
      const newArray = [
        ...array.slice(0, index),
        ...array.slice(index + 1)
      ];

      // Create a payload for the update
      const data = { [parentName]: newArray };

      //console.log(jobId, data);

      // Update the job with the new array
      await updateJobAction(jobId, data, "/");

      // Refresh the page or the component to reflect the changes
      router.push(path, { scroll: false });
    }
  };
  const markdownContent = currentState.replace(/\n/g, '\n\n');

  return (
    <div className="flex flex-wrap items-center w-full text-left items-start gap-2">
      {label && (<strong>{label}:</strong>)}
      {!edit && (
        <div className='items-center'>
          {useMarkdown ?
            <ReactMarkdown
              children={markdownContent}
              components={{
                p: ({ children }) => (
                  <p className="mb-2">{children}</p>
                  // Add your desired margin-bottom (padding) here, e.g., mb-4
                ),
              }}
            />
            :
            <p>{currentState}</p>
          }
        </div>)}
      {edit && userCanEdit && (
        <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-wrap items-center gap-2 w-full">
          <TextareaAutosize
            {...register('input', { required: true })}
            placeholder="Enter your text here..."
            className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full"
            minRows={1}  // Minimum number of rows
          />
          {errors.input && <p className="text-red-500 text-xs">Please check your name</p>}
          <div className='flex gap-2'>
            <Button
              type="submit"
              className="py-1 px-3"
              size="sm"
            >
              Save
            </Button>
            <Button
              type="button"
              className="py-1 px-3 border-none"
              size="sm"
              variant='ghost'
              onClick={toggleEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      {userCanEdit && !edit && (
        <div>
          <Button
            type="button"
            className="py-1 px-3 border-none text-slate-300"
            size="sm"
            variant='ghost'
            onClick={toggleEdit}
          >
            Edit
          </Button>
          {deleatable && (
            <Button
              type="button"
              className="py-1 px-3 border-none"
              size="sm"
              variant='secondary'
              onClick={deleteItem}
            >
              Delete
            </Button>
          )}
        </div>)}
    </div>
  );
}
