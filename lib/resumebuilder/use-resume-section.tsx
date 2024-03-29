import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ResumeSectionType } from "../../app/resumebuilder/[id]/resumebuilder-helper";

interface UseResumeListProps {
    items: ResumeSectionType[];
}

export const useResumeSection = ({ items }: UseResumeListProps) => {
    const methods = useForm({
        defaultValues: {
            section: items
        }
    });
    const { control } = methods
    const { fields, append, remove } = useFieldArray({ control, name: 'section' });
    const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});
    const prevLengthRef = useRef(fields.length);

    useEffect(() => {
        if (fields.length > prevLengthRef.current) {
            const lastItem = fields[fields.length - 1];
            setVisibility({ ...visibility, [lastItem.id]: true });
        }
        prevLengthRef.current = fields.length;
    }, [fields.length]);


    const toggleVisibility = (id: string) => {
        setVisibility({ ...visibility, [id]: !visibility[id] });
    };

    return { fields, methods, remove, append, visibility, toggleVisibility }

}