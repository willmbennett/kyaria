import React, { useEffect, useState } from 'react';
import { Message, useChat } from 'ai/react';
import { useFieldArray, Controller, Control, useFormContext } from 'react-hook-form';
import { Button } from '../../Button';
import TextareaAutosize from 'react-textarea-autosize';

type Props = {
    name: string;
    control: Control<any>;
};

type BulletPointItemProps = {
    name: string;
    index: number
    control: Control<any>;
    onRemove: (index: number) => void; // Function to handle the removal of a bullet point.
};

const BulletPointItem = ({ name, index, control, onRemove }: BulletPointItemProps) => {
    const { watch, setValue } = useFormContext();
    const [finishedLoading, setFinishedLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const { messages, setMessages, reload, append: appendChat, stop } = useChat({
        body: {
            temp: 0.3
        },
        onFinish() {
            setFinishedLoading(true);
            setLoading(false);
        }
    });

    const lastmessage = messages[messages.length - 1]

    async function optimizeClick() {
        const bulletPoint = watch(`${name}[${index}].content`);
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

        setFinishedLoading(false)
        setLoading(true)
        setMessages(messages)
        appendChat({
            role: "user",
            content: `Please help me refine this: ${bulletPoint}`
        })
    }

    // Save the final message to context
    useEffect(() => {
        if (finishedLoading) {
            setValue(`${name}[${index}].content`, lastmessage.content)
        }
    }, [finishedLoading]);

    return (
        <div className="mb-2 flex flex-row">
            <Controller
                name={`${name}[${index}].content`}
                control={control}
                render={({ field }) => (
                    <TextareaAutosize {...field} className="border p-1 rounded w-full" value={(loading && lastmessage.role == 'assistant' && lastmessage.content) || field.value} />
                )}
            />
            <div className='flex flex-row items-center'>
                <Button variant='secondary' size='md' type="button" onClick={() => onRemove(index)} className="ml-2 text-red-500">Remove</Button>
                <Button size='md' type="button" onClick={optimizeClick} className="ml-2" disabled={loading}>Optimize</Button>
            </div>
        </div>
    );
};


const BulletPointsField = ({ name, control }: Props) => {
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className='w-full text-left flex flex-col'>
            {fields.length > 0 &&
                <>
                    <label className="text-gray-600 text-sm mb-1">Bullets</label>
                    {fields.map((field, index) => (
                        <BulletPointItem
                            key={field.id}
                            name={name}
                            index={index}
                            control={control}
                            onRemove={remove}
                        />
                    ))}
                </>
            }
            <div>
                <Button size='md' type="button" onClick={() => append({ content: '', show: true })}>Add Bullet Point</Button>
            </div>
        </div>
    );
};

export default BulletPointsField;
