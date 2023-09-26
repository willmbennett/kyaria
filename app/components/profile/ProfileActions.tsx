'use client'

import { deleteProfileAction } from '../../profile/_action';

export default function ProfileActions(
    {
        id,
        formView,
        setFormView,
    }: {
        id?: any,
        formView: boolean,
        setFormView: any,
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

    function cancel() {
        setFormView(false)
    }



    return (
        <div className='p-4 w-full flex justify-end'>
            {id && !formView && (
                <button
                    className="bg-red-300 text-white px-4 py-2 rounded m-2 hover:bg-red-400"
                    onClick={deleteProfile}>
                    Delete
                </button>
            )}
            {id && !formView && (
                <button
                    className="bg-blue-300 text-white px-4 py-2 rounded m-2 hover:bg-blue-400"
                    onClick={showForm}>
                    Edit Profile
                </button>
            )}
            {(formView) && (
                <button
                    className="bg-red-300 text-white px-4 py-2 rounded m-2 hover:bg-red-400"
                    onClick={cancel}>
                    Cancel
                </button>
            )}
        </div>

    )
}