'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import { updateProfileAction } from '../../profile/_action';
import { Button } from '../Button';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

interface Props {
  label?: string;
  profileId: string;
  setKey: string;
  currentState: string;
  userCanEdit: boolean;
  stateStart?: boolean;
  toggleAdd?: any;
  deleatable?: boolean;
}

type FormFields = {
  input: string;
};

export default function ProfileTextEdit({
  label,
  profileId,
  setKey,
  currentState,
  userCanEdit,
  stateStart = false,
  toggleAdd,
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
      console.log(profileId, data)
      const update = await updateProfileAction(profileId, data, "/")
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
    if (userCanEdit && deleatable) {
      // Split the property path into segments
      const segments = setKey.split(".");

      // Modify the last segment to the new property name
      segments[segments.length - 1] = "show";

      // Reconstruct the updated property path
      const deleteSetKey = segments.join(".");
      console.log(deleteSetKey)

      const data = JSON.parse(`{"${deleteSetKey}":false}`)
      console.log(profileId, data)
      await updateProfileAction(profileId, data, "/")
      router.push(path, { scroll: false })
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
