import React, { KeyboardEventHandler, MouseEventHandler, useState } from "react";
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
import { ResumeBuilderFormData } from "../../resumebuilder/resumetest-helper";
import { Button } from "../Button";

type SkillField = { id: string, label: string; value: string }

type ArrayFieldNames = "social_links" | "skills" | "professional_experience" | "education" | "projects" | 'awards' | 'publications' | 'certifications' | 'interests' | 'volunteering';

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
    const dynamicStyles = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.2s ease',
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={dynamicStyles}
            className="cursor-grab bg-gray-200 border border-slate-300 rounded px-2 py-1 m-0.5 shadow text-sm"
        >
            <components.MultiValue {...props} innerProps={innerProps} />
        </div>
    );

};


const Control = (props: ControlProps<SkillField>) => {
    const { setNodeRef, active } = useDroppable({
        id: "droppable"
    });

    return (
        <div ref={setNodeRef}>
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

function Loading() {
    return <>
      <style jsx>{`
          .loader {
            border: 6px solid #f3f3f3; 
            border-top: 6px solid rgb(51 65 85);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: auto;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
      `}</style>
      <div className="loader"></div> 
    </>
  }

const ListInput: React.FC<ListInputProps> = ({ name, control, setValue, watch }) => {
    const { fields, append, remove, move } = useFieldArray({ control, name });
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const data = watch('skills')
    const userResume = watch()
    const skillsArray = data?.map(skill => skill.value)

    const onChange = (fields: OnChangeValue<SkillField, true>) => {
        remove();
        fields.forEach(item => append({ label: item.label, value: item.value }));
    }

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                // Check if the skill is unique before adding it
                if (!fields.some((field) => (field as SkillField).value === inputValue)) {
                    const newSkill = { label: inputValue, value: inputValue };
                    append(newSkill)
                }
                setInputValue(''); // Clear the input value here
                event.preventDefault();
        }
    };

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

        if (!data) return;

        const messages = [
            {
                role: "system", content: `You are a professional resume writer experienced in curating and refining skill sets for job seekers. Skills should be 1-2 words long. If the resume is technical only include technical skills.
Soft skills examples:
Listening
Writing
Empathy
Giving constructive feedback
Self-confidence
Respect
Nonverbal communication
Self-organization
Self-motivation
Self-management
Curiosity
Positivity
Calmness in stressful situations
Quick decision-making
Open-mindedness
Delegation
Negotiation
Mediation
Listening
Coordination
Conflict management
Cooperation
Collaboration
Introspection
Critical thinking and observation
Memory
Self-organization
Perception
Perception
Persistence
Decision-making
Lateral thinking
Initiative
Negotiation
Brainstorming
Discipline
Integrity
Dependability
Commitment
Critical thinking
Professionalism
Initiative
Time-management
Self-motivation
Inspiration
Innovative ideas
Reframing ideas
Divergent thinking
Questioning
Insightfulness
Mind mapping
Prioritization
Organization
Setting goals
Stress management
Delegation
Decision making
Self-starting
Coping
Empathy
Diplomacy
Sensitivity
Public speaking
Tolerance
Mentoring
Sense of humor
Networking
Patience
Humility
Empathy
Versatility
Trust
Discipline
Active listening
Authenticity

Technical skills examples:
Word processing software
Spreadsheet software
Presentation software
Email management
Data entry
Digital calendars
Video conferencing
Social media management
Instant messaging
HTML
Java
Operating systems
UI/UX
Python
JavaScript
CSS
Illustration software
Photoshop
Design software
Desktop publishing
Video creation software
Instant messaging
Video conferencing
Email management applications
Spreadsheets
SQL
MySQL
Oracle RDBMS
Toad
Data analytics
Accounts payable
Billings
Accounts receivable
Fixed assets
Inventory
Payroll
Microsoft Excel
OnlyOffice
LibreOffice
Microsoft Word
Google Drive
Microsoft Powerpoint
Adobe Persuasion
Adobe Creative Suite
iMovie
Hootsuite
WordPress
GanttPRO
Zoho Projects
` 
            },
            {
                role: "user", content: `Please tailor the skills section of my resume: ${JSON.stringify(userResume)}${userResume.title? `to this role ${JSON.stringify(userResume.title)}` : ''}. Return the list of the top 10-15 skills in this json format: {"skills": string[]}`
            }
        ]

        try {
            setLoading(true)
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
            setLoading(false)
        } catch (error) {
            console.error(`Failed to optimize resume section: skills`, error);
        }
    }

    return (
        <div className="mb-6 p-4 border bg-slate-100 border-slate-400 shadow rounded-md">
            <DndContext modifiers={[restrictToParentElement]} onDragEnd={onSortEnd} onDragOver={handleDragOver}>
                <SortableContext items={fields} strategy={rectSortingStrategy}>
                    {name == 'skills' && <Button className="mb-3" type="button" onClick={optimizeSkills} size="md">Optimize</Button>}
                    {!loading &&
                        <CreatableSelect
                            isMulti
                            value={fields.map(field => ({ id: field.id, label: (field as SkillField).value, value: (field as SkillField).value }))}
                            onChange={onChange}
                            inputValue={inputValue}
                            onInputChange={(newValue) => setInputValue(newValue)}
                            onKeyDown={handleKeyDown}
                            components={{
                                // @ts-ignore We're failing to provide a required index prop to SortableElement
                                MultiValue,
                                MultiValueContainer,
                                MultiValueRemove,
                                Control,
                                DropdownIndicator: null,
                            }}
                            closeMenuOnSelect={false}
                            menuIsOpen={false}
                        />
                    }
                    {loading && Loading()}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ListInput;
