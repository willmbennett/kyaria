'use client'

import { deleteProfileAction } from '../../profile/_action';

export default function ProfileActions(
    {
        id,
        formView,
        setFormView,
        inputTextView,
        setInputTextView
    }: {
        id?: string,
        formView: boolean,
        setFormView: any,
        inputTextView: boolean,
        setInputTextView: any
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

    function showTextInput() {
        setInputTextView(true)
    }

    

    return (
        <div className='p-4'>
            {id && (<button
                className="bg-red-500 text-white px-4 py-2 rounded m-4"
                onClick={deleteProfile}>
                Delete
            </button>
            )}
            {id && !formView && (<button
                className="bg-blue-500 text-white px-4 py-2 rounded m-4 "
                onClick={showForm}>
                Edit Profile
            </button>
            )}
            {!id && !inputTextView && !formView && (<button
                className="bg-blue-500 text-white px-4 py-2 rounded m-4 "
                onClick={showTextInput}>
                Create Profile
            </button>
            )}
        </div>
    )
}