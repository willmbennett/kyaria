'use client'

import { deleteProfileAction } from '../../profile/_action';

export default function ProfileActions(
    {
        id,
        formView,
        setFormView,
        formState,
        setFormState
    }: {
        id?: string,
        formView: boolean,
        setFormView: any,
        formState: string,
        setFormState: any
    }) {

    async function deleteProfile() {
        if (id) {
            await deleteProfileAction({
                id: id,
                path: "/",
            });
            setFormView(false)
        }
    }

    function showForm() {
        setFormView(true)
    }

    return (
        <div className='p-4'>
            {id && (<button
                className="bg-red-500 text-white px-4 py-2 rounded m-4"
                onClick={deleteProfile}>
                Delete
            </button>
            )}
            {!formView && (<button
                className="bg-blue-500 text-white px-4 py-2 rounded m-4 "
                onClick={showForm}>
                {formState == "Edit"? "Edit Profile": "Create Profile"}
            </button>
            )}
        </div>
    )
}