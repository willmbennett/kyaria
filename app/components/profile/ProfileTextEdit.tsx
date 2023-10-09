'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import { updateProfileAction } from '../../profile/_action';
import { Button } from '../Button';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  label?: string;
  profileId: string;
  setKey: string;
  currentState: string;
  stateStart?: boolean;
  toggleAdd?: any
}

type FormFields = {
  input: string;
};

export default function ProfileTextEdit({
  label,
  profileId,
  setKey,
  currentState,
  stateStart = false,
  toggleAdd
}: Props) {
  const [edit, setEdit] = useState(stateStart)
  const router = useRouter()
  const path = usePathname()

  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    defaultValues: { input: currentState }
  });

  // Save the final message to the database
  const onSubmit: SubmitHandler<FormFields> = async (textinput) => {
    // Save the message to the database
    console.log(`"${setKey}":"${textinput}"`)
    const data = JSON.parse(`{"${setKey}":""}`)
    data[setKey] = textinput.input
    console.log(profileId, data)
    const update = await updateProfileAction(profileId, data, "/")
    router.push(path, { scroll: false })
    setEdit(false)
    if(toggleAdd) {
      toggleAdd(false)
    }
  };

  const toggleEdit = () => {
    setEdit(!edit)
  };

  return (<div className="flex flex-row items-center text-left w-full">
    {label && (<div className='flex pr-2'>
      <strong>{label}:</strong>
    </div>
    )}
    <div className='flex w-full'>
      <div className='flex flex-row items-center space-x-4 w-full'>
        {!edit && currentState}
        {edit && (
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
        <Button
          type="button"
          className="py-1 px-3 border-none"
          size="md"
          variant='ghost'
          onClick={toggleEdit}
        >
          {edit ? "Cancel" : "Edit"}
        </Button>
      </div>
    </div>
  </div>
  );
}
