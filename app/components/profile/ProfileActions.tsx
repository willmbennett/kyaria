'use client'

import { deleteProfileAction } from '../../profile/_action';

export default function ProfileActions(
    {
        id,
        setFormView,
        hasProfile
    }: {
        id?: string,
        setFormView: any,
        hasProfile: boolean
    }) {

    async function deleteProfile() {
        if (id) {
            await deleteProfileAction({
                id: id,
                path: "/",
            });
        }
    }

    function showForm() {
        setFormView(true)
    }

    return (
        <div className='p-4'>
            {hasProfile && (<button
                className="px-2 py-1 ml-2 text-white rounded bg-red-500 "
                onClick={deleteProfile}>
                Delete
            </button>
            )}
            {!hasProfile && (<button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 "
                onClick={showForm}>
                Create Profile
            </button>
            )}
        </div>
    )
}