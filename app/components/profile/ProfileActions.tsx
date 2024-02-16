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
                    href='/board'
                    variant="solid"
                    size="md"
                    className="mt-2 mx-2"
                >
                    See your Jobs
                </Button>
            )}
            {id && !formView && (
                <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={showForm}
                    className="mt-2"
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
                    className="mt-2"
                >
                    Cancel
                </Button>
            )}
        </div>

    )
}