import React, { Dispatch, SetStateAction } from 'react';
import { useForm, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { FieldWrapper } from '../sections/fields/FieldWrapper';
import { SocialLinkClass } from '../../../../../models/Resume';
import { useFormArray } from '../../../../../lib/resumebuilder/use-form-array-remove';
import { Button } from '../../../Button';

const socialPlatforms = ['LinkedIn', 'GitHub', 'Twitter', 'Facebook', 'Instagram', 'Website', 'Blog'];

interface SocialLinksSectionProps {
    social_links?: SocialLinkClass[];
    resumeId: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
}

export const SocialLinksSection = ({ social_links, resumeId, setSaveStatus }: SocialLinksSectionProps) => {
    const methods = useForm({
        defaultValues: {
            social_links: social_links || []
        },
    });

    const { control } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name: "social_links",
    });

    const valueToAdd = { name: socialPlatforms[0], url: '' };

    const { addArrayItem, removeArrayItem } = useFormArray({ resumeId, setKey: 'social_links', setSaveStatus, valueToAdd });

    const handleAppend = async () => {
        append(valueToAdd);
        await addArrayItem();
    };

    const handleRemove = async (index: number, fieldId: string) => {
        remove(index);
        await removeArrayItem(fieldId);
    };

    return (
        <FormProvider {...methods}>
            <form>
                <h2 className="text-lg font-semibold mb-4">{'Social Links'.toUpperCase()}</h2>
                {fields.map((field, index) => {
                    const fieldId = social_links && social_links[index]._id
                    return (
                        <div key={field.id} className="flex items-center gap-2">
                            <FieldWrapper
                                className="w-full"
                                resumeId={resumeId}
                                fieldName={`social_links.${index}.name`}
                                placeholder='Social Name'
                                setKey={`social_links.${index}.name`}
                                setSaveStatus={setSaveStatus}
                            >
                                <Controller
                                    name={`social_links.${index}.name`}
                                    control={control}
                                    render={({ field: { onChange, value, ...restField } }) => (
                                        <select onChange={onChange} value={value || ''} className="border p-1 rounded w-full" {...restField}>
                                            {socialPlatforms.map((platform) => (
                                                <option key={platform} value={platform}>
                                                    {platform}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </FieldWrapper>
                            <FieldWrapper
                                className="w-full"
                                resumeId={resumeId}
                                fieldName={`social_links.${index}.url`}
                                placeholder='Social Link URL'
                                setKey={`social_links.${index}.url`}
                                setSaveStatus={setSaveStatus}
                            >
                                <Controller
                                    name={`social_links.${index}.url`}
                                    control={control}
                                    render={({ field }) => (
                                        <input type="url" {...field} className="border p-1 rounded w-full" placeholder="Social Link URL" />
                                    )}
                                />
                            </FieldWrapper>
                            <button type="button" onClick={() => fieldId && handleRemove(index, fieldId)} className="ml-2 text-red-500">Remove</button>
                        </div>
                    )
                }
                )}
                <Button size='md' type="button" onClick={handleAppend} >Add Social</Button>
            </form>
        </FormProvider>
    );
};
