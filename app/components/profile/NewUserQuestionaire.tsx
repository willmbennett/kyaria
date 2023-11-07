import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import { Button } from '../Button';
import { roleOptions } from '../../profile/profile-helper';
import { updateProfileAction } from '../../profile/_action';

type QuestionFormFields = {
    desiredRole: string;
    industryExperience: number;
    jobSearchStatus: string;
    salaryMin: number;
    salaryMax: number;
};

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'
const H2_STYLE = 'text-left font-bold text-2xl py-4 mb-4'

export default function NewUserQuestionnaire(
    {
        profile,
        setOnboardingStage
    }: {
        profile: any,
        setOnboardingStage: any
    }
) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuestionFormFields>();

    const onSubmit: SubmitHandler<QuestionFormFields> = async (data: any) => {
        console.log("Submitted data:", data);
        const path = "/"
        const res = await updateProfileAction(profile._id, { questionnaire: data }, path);
        setOnboardingStage('story')
    };

    const statusOptions = [
        'Actively Looking',
        'Not Looking',
        'Open to Opportunities'
    ];

    const formattedRoleOptions = roleOptions.map(role => ({ value: role, label: role }));
    const formattedStatusOptions = statusOptions.map(status => ({ value: status, label: status }));

    return (
        <div>
            <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">
                Questionnaire
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={BASIC_FIELD_STYLE}>
                    <label htmlFor="desiredRole">What job role are you seeking?</label>
                    <Select
                        id="desiredRole"
                        options={formattedRoleOptions}
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
