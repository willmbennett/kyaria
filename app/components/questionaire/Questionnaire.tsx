'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import { Button } from '../Button';
import { roleOptions } from '../../profile/profile-helper';
import { updateProfileAction } from '../../profile/_action';
import { Questionnaire } from '../../../models/Profile';
import { usePathname, useRouter } from 'next/navigation';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'
const H2_STYLE = 'text-left font-bold text-2xl py-4 mb-4'

export default function UserQuestionnaire(
    {
        userId,
        profileId,
        currentState,
        updateDisplay,
    }: {
        userId: string
        profileId: string,
        currentState?: Questionnaire
        updateDisplay?: (data: Questionnaire) => void
    }
) {
    const router = useRouter()
    const path = usePathname();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Questionnaire>({
        defaultValues: currentState
    });

    const onSubmit: SubmitHandler<Questionnaire> = async (data: any) => {
        //console.log("Submitted data:", data);
        try {
            const res = await updateProfileAction(profileId, { questionnaire: data }, path);
            if (updateDisplay) {
                updateDisplay(data);

            }
            router.refresh()
        } catch (err) {
            console.log(err)
        }

    };

    const statusOptions = [
        'Actively Looking',
        'Not Looking',
        'Open to Opportunities'
    ];

    const formattedRoleOptions = roleOptions.map(role => ({ value: role, label: role }));
    const formattedStatusOptions = statusOptions.map(status => ({ value: status, label: status }));

    return (
        <div className='max-w-2xl'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={BASIC_FIELD_STYLE}>
                    <label htmlFor="desiredRole">What job role are you seeking?</label>
                    <Select
                        id="desiredRole"
                        options={formattedRoleOptions}
                        defaultInputValue={currentState?.desiredRole}
                        onChange={(option: any) => setValue("desiredRole", option.value)}
                    />
                    {errors.desiredRole && <p>Please select a role</p>}
                </div>

                <div className={BASIC_FIELD_STYLE}>
                    <label htmlFor="industryExperience">How many years of experience do you have in your industry?</label>
                    <input type="number" {...register("industryExperience", { required: true, valueAsNumber: true })} min={0} />
                    {errors.industryExperience && <p>Please specify your experience</p>}
                </div>

                <div className={BASIC_FIELD_STYLE}>
                    <label htmlFor="jobSearchStatus">What is your current job search status?</label>
                    <Select
                        id="jobSearchStatus"
                        options={formattedStatusOptions}
                        defaultInputValue={currentState?.jobSearchStatus}
                        onChange={(option: any) => setValue("jobSearchStatus", option.value)}
                    />
                    {errors.jobSearchStatus && <p>Please select a status</p>}
                </div>

                <div className={BASIC_FIELD_STYLE}>
                    <label htmlFor="salaryMin">What is your desired minimum salary?</label>
                    <input type="number" {...register("salaryMin", { required: true, valueAsNumber: true })} min={0} placeholder="150000" />
                    {errors.salaryMin && <p>Please specify your desired minimum salary</p>}
                </div>

                <div className={BASIC_FIELD_STYLE}>
                    <label htmlFor="salaryMax">What is your desired maximum salary?</label>
                    <input type="number" {...register("salaryMax", { required: true, valueAsNumber: true })} min={0} placeholder="200000" />
                    {errors.salaryMax && <p>Please specify your desired maximum salary</p>}
                </div>

                <Button type="submit" className='w-full'>
                    Submit
                </Button>
            </form>
        </div>
    );
}
