import React from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import NestedFieldArray from './NestedFieldArray';
import demoProfile from '../../../examples/will_profile.json';

const BASIC_FIELD_STYLE = 'text-left font-medium text-lg mb-4 flex flex-col w-full'

type FormFields = {
    name: string;
    title: string;
    email: string;
    phone: string;
    social_links: { [key: string]: string };
    location: string;
    summary: string;
    areas_of_expertise: string[];
    skills: string[];
    professional_experience: {
        title: string;
        company: string;
        location: string;
        start_date: string;
        end_date: string;
        responsibilities: string[];
    }[];
    education: {
        degree: string;
        institution: string;
        location: string;
        details: string[];
    }[];
};

export default function NewProfileForm({
    userProfile,
    setUserProfile,
    userId
}: {
    userProfile: any,
    setUserProfile: any
    userId: string
}) {

    const { register, handleSubmit, control } = useForm<FormFields>({
        defaultValues: { ...demoProfile }
    });

    const { fields: experienceFields, append: appendExperience } = useFieldArray({
        control,
        name: 'professional_experience',
    });

    const { fields: educationFields, append: appendEducation } = useFieldArray({
        control,
        name: 'education',
    });

    const createUserProfile = async (data: FormFields) => {
        try {
            const response = await fetch('/api/db/profile/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, userId: userId }), // Sending form data
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const createdUserProfile = await response.json();

            //console.log("Created User Profile")
            //console.log(createdUserProfile.insertedId)

            if (createdUserProfile.insertedId) {
                setUserProfile({ ...data, _id: createdUserProfile.insertedId, userId: userId }); // Assuming setUserProfile is a function that sets user profile in your app state
            }
        } catch (error) {
            console.error('Failed to create user profile:', error);
        }
    };

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createUserProfile(data)
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col w-full max-w-3xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">Create Your Profile</h1>
                    {/* Basic Fields */}
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Name</p>
                        <input {...register('name')} placeholder="Name" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Job Title</p>
                        <input {...register('title')} placeholder="Title" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Email</p>
                        <input {...register('email')} placeholder="Email" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Phone Number</p>
                        <input {...register('phone')} placeholder="Phone" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Github URL</p>
                        <input {...register('social_links.Github')} placeholder="GitHub" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>LinkedIn URL</p>
                        <input {...register('social_links.LinkedIn')} placeholder="LinkedIn" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Location</p>
                        <input {...register('location')} placeholder="Location" />
                    </div>
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Summary</p>
                        <input {...register('summary')} placeholder="Summary" />
                    </div>

                    {/* Areas of Expertise */}
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Areas of Expertise</p>
                        <Controller
                            name="areas_of_expertise"
                            control={control}
                            render={({ field }) => (
                                <input {...field} placeholder="Areas of Expertise (comma separated)" />
                            )}
                        />
                    </div>

                    {/* Skills */}
                    <div className={BASIC_FIELD_STYLE}>
                        <p>Skills</p>
                        <Controller
                            name="skills"
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Skills (comma separated)" />}
                        />
                    </div>

                    {/* Professional Experience */}
                    {experienceFields.map((field, index) => (
                        <div key={field.id} className="ext-left font-bold text-2xl mb-4">
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Title</p>
                                <input {...register(`professional_experience.${index}.title`)} placeholder="Title" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Company</p>
                                <input {...register(`professional_experience.${index}.company`)} placeholder="Company" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Location</p>
                                <input {...register(`professional_experience.${index}.location`)} placeholder="Location" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Start Date</p>
                                <input {...register(`professional_experience.${index}.start_date`)} placeholder="Start Date" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>End Date</p>
                                <input {...register(`professional_experience.${index}.end_date`)} placeholder="End Date" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Responsibilities</p>
                                <NestedFieldArray
                                    {...{
                                        control,
                                        register,
                                        parentIndex:
                                            index,
                                        parentName: "professional_experience",
                                        childName: "responsibilities"
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className={BASIC_FIELD_STYLE}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button" onClick={() => appendExperience({})}>
                            Add Experience
                        </button>
                    </div>

                    {/* Education */}
                    {educationFields.map((field, index) => (
                        <div key={field.id} className={BASIC_FIELD_STYLE}>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Degree</p>
                                <input {...register(`education.${index}.degree`)} placeholder="Degree" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Institution</p>
                                <input {...register(`education.${index}.institution`)} placeholder="Institution" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Location</p>
                                <input {...register(`education.${index}.location`)} placeholder="Location" />
                            </div>
                            <div className={BASIC_FIELD_STYLE}>
                                <p>Details</p>
                                <input {...register(`education.${index}.details`)} placeholder="Details (comma separated)" />
                            </div>
                        </div>
                    ))}
                    <div className={BASIC_FIELD_STYLE}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button" onClick={() => appendEducation({})}>
                            Add Education
                        </button>
                    </div>

                    {/* Submit */}
                    <div className={BASIC_FIELD_STYLE}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
