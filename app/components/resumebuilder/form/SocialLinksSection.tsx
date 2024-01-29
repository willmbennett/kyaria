import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ResumeBuilderFormData } from '../../../resumebuilder/resumetest-helper';
import { Button } from '../../Button';
import { Controller } from 'react-hook-form';
type SocialField = { id: string, name: string, url: string }
const socialPlatforms = ['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'Website', 'Blog']; // Add more platforms as needed

const SocialLinksSection = () => {
    const { control } = useFormContext<ResumeBuilderFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "social_links"
    });

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">{'Social Links'.toUpperCase()}</h2>
            {fields.map((field: SocialField, index) => (
                <div key={field.id} className="flex items-center mb-2">
                    <Controller
                        name={`social_links.${index}.name`}
                        control={control}
                        render={({ field }) => (
                            <select {...field} className="border p-1 rounded w-full">
                                {socialPlatforms.map((platform, idx) => (
                                    <option key={idx} value={platform}>
                                        {platform}
                                    </option>
                                ))}
                            </select>
                        )}
                        defaultValue={field.name || socialPlatforms[0]} // Set default value
                    />
                    <Controller
                        name={`social_links.${index}.url`}
                        control={control}
                        render={({ field }) => <input type="url" {...field} placeholder="Social Link URL" className="border p-1 rounded w-full" />}
                    />
                    <button onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                </div>
            ))}
            <Button size='md' type="button" onClick={() => append({ name: socialPlatforms[0], url: '' })} className="text-blue-500">Add Social Link</Button>
        </>
    );
};

export default SocialLinksSection;
