import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Message, useChat } from 'ai/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '../../../../Button';
import TextareaAutosize from 'react-textarea-autosize';
import { FieldWrapper } from './FieldWrapper';
import { useFormArray } from '../../../../../../lib/resumebuilder/use-form-array-remove';
import { ResumeClass } from '../../../../../../models/Resume';

type BulletPointItemProps = {
    name: string;
    fieldId?: string
    index: number;
    setKey: string;
    handleItemRemoval: () => void;
    resumeId: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
};

const BulletPointItem = ({ name, fieldId, index, setKey, handleItemRemoval, resumeId, setSaveStatus }: BulletPointItemProps) => {
    const fieldName = `${name}.${index}.content`
    const fieldSetKey = setKey + '.' + index + '.content'
    const { watch, setValue, register } = useFormContext();
    const bulletPoint = watch(fieldName);
    const [loading, setLoading] = useState(false)

    const { messages, setMessages, reload, append: appendChat, stop } = useChat({
        body: {
            temp: 0.3
        },
        onFinish() {
            setLoading(false);
        }
    });

    const lastmessage = messages[messages.length - 1]

    async function optimizeClick() {
        if (!bulletPoint) return;

        const messages: Message[] = [
            {
                id: "1", role: "system", content: "You are a professional resume writer experienced in enhancing bullet points. Use the format Action Verb + What You Did +	Additional Descriptive Information/Results including quantities. If the bullet doesn't have a quantity make one up but leave it blank like [number] or [percent]%."
            },
            {
                id: "2", role: "user", content: `Please improve this resume bullet point: "${bulletPoint}". Keep it a single sentance.`
            },
            { id: '1', role: 'assistant', content: bulletPoint }
        ];

        setLoading(true)
        setMessages(messages)
        appendChat({
            role: "user",
            content: `Please help me refine this: ${bulletPoint}`
        })
    }

    useEffect(() => {
        if (loading && lastmessage?.role === 'assistant') {
            setValue(fieldName, lastmessage.content);
        }
    }, [loading, lastmessage, setValue, fieldName]);

    return (
        <div className="flex flex-col space-y-2 lg:space-x-2 lg:flex-row my-2">
            <FieldWrapper
                className="w-full"
                resumeId={resumeId}
                fieldName={fieldName}
                placeholder={`BULLET ${index + 1}`}
                setKey={fieldSetKey}
                setSaveStatus={setSaveStatus}
            >
                <TextareaAutosize
                    {...register(fieldName)}
                    className="border p-1 rounded w-full"
                    defaultValue={bulletPoint}
                />
            </FieldWrapper>
            <div className='flex flex-row items-center space-x-2'>
                <Button variant='secondary' size='md' type="button" onClick={handleItemRemoval} className="text-red-500">Remove</Button>
                <Button size='md' type="button" onClick={optimizeClick} disabled={loading}>Optimize</Button>
            </div>
        </div>
    );
};

type Props = {
    name: string;
    setKey: string;
    fieldData?: Partial<ResumeClass>
    resumeId: string;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>;
};

const BulletPointsField = ({ name, fieldData, setKey, resumeId, setSaveStatus }: Props) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const valueToAdd = { content: '', show: true }
    const { addArrayItem, removeArrayItem } = useFormArray({ resumeId, setKey, setSaveStatus, valueToAdd })

    const handleAppend = async () => {
        append(valueToAdd)
        await addArrayItem()
    }

    const handleRemove = (index: number, fieldId: string) => {
        remove(index)
        removeArrayItem(fieldId)
    }

    return (
        <div className='w-full text-left flex flex-col'>
            {fields.length > 0 &&
                <>
                    <label className="text-gray-600 text-sm mb-1">Bullets</label>
                    {fields.map((field, index) => {
                        const fieldId = (fieldData as { _id?: string }[])[index]?._id
                        const removeItem = () => fieldId ? handleRemove(index, fieldId) : console.log('Id not found')
                        return (
                            <BulletPointItem
                                key={field.id}
                                name={name}
                                handleItemRemoval={removeItem}
                                fieldId={fieldId}
                                index={index}
                                setKey={setKey}
                                resumeId={resumeId}
                                setSaveStatus={setSaveStatus}
                            />
                        )
                    }
                    )}
                </>
            }
            <div>
                <Button size='md' type="button" onClick={handleAppend}>Add Bullet Point</Button>
            </div>
        </div>
    );
};

export default BulletPointsField;
