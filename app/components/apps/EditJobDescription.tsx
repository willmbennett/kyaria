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
  deleatable = false
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
      console.log(`"${setKey}":"${textinput}"`)
      const data = JSON.parse(`{"${setKey}":""}`)
      data[setKey] = textinput.input
      console.log(jobId, data)
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

      console.log(jobId, data);

      // Update the job with the new array
      await updateJobAction(jobId, data, "/");

      // Refresh the page or the component to reflect the changes
      router.push(path, { scroll: false });
    }
  };


  return (<div className="flex flex-row items-center text-left w-full">
    <div className='flex w-full'>
      <div className='flex flex-row items-center space-x-4 w-full'>
        {label && (<strong>{label}:</strong>)}
        {!edit && (
          <div className='items-center'>
            <ReactMarkdown
              children={currentState}
              components={{
                p: ({ children }) => (
                  <p className="mb-1 mt-1">{children}</p>
                  // Add your desired margin-bottom (padding) here, e.g., mb-4
                ),
              }}
            />
          </div>)}
        {edit && userCanEdit && (
          <form onSubmit={handleSubmit(onSubmit)} action="" className="flex items-center space-x-2 w-full">
            <TextareaAutosize
              {...register('input', { required: true })}
              placeholder="Enter your text here..."
              className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full"
              minRows={1}  // Minimum number of rows
            />
            {errors.input && <p className="text-red-500 text-xs">Please check your name</p>}
            <Button
              type="submit"
              className="py-1 px-3"
              size="md"
            >
              Save
            </Button>
          </form>
        )}
        {userCanEdit && (<>
          <Button
            type="button"
            className="py-1 px-3 border-none"
            size="md"
            variant='ghost'
            onClick={toggleEdit}
          >
            {edit ? "Cancel" : "Edit"}
          </Button>
          {deleatable && (
            <Button
              type="button"
              className="py-1 px-3 border-none"
              size="md"
              variant='secondary'
              onClick={deleteItem}
            >
              Delete
            </Button>
          )}
        </>)}
      </div>
    </div>
  </div>
  );
}
