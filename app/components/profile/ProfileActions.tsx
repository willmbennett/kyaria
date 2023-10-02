'use client'

import { deleteProfileAction } from '../../profile/_action';
import { Button } from '../Button';

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

    function showForm() {
        setFormView(true)
    }

    function cancel() {
        setFormView(false)
    }



    return (
        <div className='p-4 w-full flex justify-end'>
            {id && !formView && (
                <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={showForm}
                    className="mt-10 sm:mt-12"
                >
                    Edit Profile
                </Button>
            )}
            {(formView) && (
                <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={cancel}
                    className="mt-10 sm:mt-12"
                >
                    Cancel
                </Button>
            )}
        </div>

    )
}