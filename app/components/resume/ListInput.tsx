import React, { MouseEventHandler, useState } from "react";
import { useFieldArray, Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
    components,
    MultiValueGenericProps,
    MultiValueProps,
    MultiValueRemoveProps,
    OnChangeValue,
    ControlProps
} from "react-select";
import { DndContext, DragEndEvent, DragOverEvent, useDroppable } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CreatableSelect from "react-select/creatable";
import { ResumeBuilderFormData } from "../../resumetest/resumetest-helper";
import { Button } from "../Button";

type SkillField = { id: string, label: string; value: string }

type ArrayFieldNames = "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests';

type ListInputProps = {
    name: ArrayFieldNames;
    control: Control<ResumeBuilderFormData>;
    setValue: UseFormSetValue<ResumeBuilderFormData>;
    watch: UseFormWatch<ResumeBuilderFormData>;
};

const MultiValue = (props: MultiValueProps<SkillField>) => {
    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: props.data.id
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.2s ease',
        cursor: 'grab',
        backgroundColor: '#f2f2f2', // Light background color
        border: '1px solid #d9d9d9', // Subtle border
        borderRadius: '4px', // Rounded corners
        padding: '5px 8px', // Padding inside the draggable item
        margin: '2px', // Space around the item
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Slight shadow for depth
        fontSize: '0.9em', // Font size, adjust as needed
    };

    return (
        <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <components.MultiValue {...props} innerProps={innerProps} />
        </div>
    );
};


const Control = (props: ControlProps<SkillField>) => {
    const { setNodeRef, active } = useDroppable({
        id: "droppable"
    });
    const style = {
        padding: "5px 10px", // Adequate padding
        margin: "5px 0", // Space around the control
        backgroundColor: active ? "#F0F8FF" : "white", // Slight background change on active
        transition: "border-color 0.2s, background-color 0.2s", // Smooth transitions
        boxShadow: active ? "0px 0px 5px #B0E0E6" : "none", // Optional: shadow effect on focus
        cursor: "pointer", // Cursor pointer on hover
    };

    return (
        <div ref={setNodeRef} style={style}>
            <components.Control {...props} />
        </div>
    );
};


const MultiValueContainer = (props: MultiValueGenericProps<SkillField>) => {
    return <components.MultiValueContainer {...props} />;
};

const MultiValueRemove = (props: MultiValueRemoveProps<SkillField>) => {
    return (
        <components.MultiValueRemove
            {...props}
            innerProps={{
                onPointerDown: (e) => e.stopPropagation(),
                ...props.innerProps
            }}
        />
    );
};

const ListInput: React.FC<ListInputProps> = ({ name, control, setValue, watch }) => {
    const { fields, append, remove, move } = useFieldArray({ control, name });
    const [inputValue, setInputValue] = useState('');

    const onChange = (fields: OnChangeValue<SkillField, true>) => {
        remove();
        fields.forEach(item => append({ label: item.label, value: item.value }));
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { over, active } = event;
        if (over && active.id !== over.id) {
            // Find the indices and reorder the list temporarily
            const oldIndex = fields.findIndex(item => item.id === active.id);
            const newIndex = fields.findIndex(item => item.id === over.id);
            
            // Update the state with the new order
            return move(oldIndex, newIndex);
        }
    };

    const onSortEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex(item => item.id === active.id);
            const newIndex = fields.findIndex(item => item.id === over.id);
            return move(oldIndex, newIndex);
        }
    };

    async function optimizeSkills() {
        const data = watch('skills')
    
        if (!data) return;
        const skillsArray = data.map(skill => skill.value)
    
        const messages = [
            {
                role: "system", content: "You are a professional resume writer experienced in curating and refining skill sets for job seekers."
            },
            {
                role: "user", content: `Please review this list of skills and refine it for a professional resume. Focus on including only the most important and relevant skills, enhancing their wording for clarity and impact. Shorten the list as necessary, but ensure that key competencies are retained. Return the revised list in a JSON array format: ${JSON.stringify(skillsArray)}.`
            }
        ]
    
        try {
            console.log('about to optimize resume section', data)
            const response = await fetch('/api/openai/optimizeResume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Network response was not ok`);
            }
    
            const skillsRaw = await response.json();
    
            const fixedSkills = skillsRaw.skills.map((skill: string) => ({ label: skill, value: skill }))
    
            console.log('optimizedData', fixedSkills)
            setValue('skills', fixedSkills);
        } catch (error) {
            console.error(`Failed to optimize resume section: skills`, error);
        }
    }

    return (
        <DndContext modifiers={[restrictToParentElement]} onDragEnd={onSortEnd} onDragOver={handleDragOver}>
            <SortableContext items={fields} strategy={rectSortingStrategy}>
                <CreatableSelect
                    isMulti
                    value={fields.map(field => ({ id: field.id, label: (field as SkillField).value, value: (field as SkillField).value }))}
                    onChange={onChange}
                    inputValue={inputValue}
                    components={{
                        // @ts-ignore We're failing to provide a required index prop to SortableElement
                        MultiValue,
                        MultiValueContainer,
                        MultiValueRemove,
                        Control,
                        DropdownIndicator: null,
                    }}
                    onInputChange={setInputValue}
                    closeMenuOnSelect={false}
                    menuIsOpen={false}
                />
                <Button type="button" onClick={optimizeSkills} size="md">Optimize</Button>
            </SortableContext>
        </DndContext>
    );
};

export default ListInput;
