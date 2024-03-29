'use client'
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { FormProvider } from 'react-hook-form';
import {
    components,
    MultiValueGenericProps,
    MultiValueProps,
    MultiValueRemoveProps,
    ControlProps
} from "react-select";
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
    rectSortingStrategy,
    SortableContext,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CreatableSelect from "react-select/creatable";
import { Button } from "../../../Button";
import { JobClass } from "../../../../../models/Job";
import { useResumeList } from "../../../../../lib/resumebuilder/use-resume-list";
import { ResumeClass } from "../../../../../models/Resume";

type SkillField = { id: string, label: string; value: string }


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

type ListInputProps = {
    name: string
    job?: Partial<JobClass>;
    resume: ResumeClass
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
};

const ListInput: React.FC<ListInputProps> = ({ name, job, resume, setSaveStatus }) => {
    const inputList = resume[name as keyof ResumeClass] as string[]
    const {
        methods,
        onSortEnd,
        handleDragOver,
        fields,
        optimizeSkills,
        loading,
        onChange,
        inputValue,
        setInputValue,
        handleKeyDown
    } =
        useResumeList(
            {
                setKey: name,
                inputList,
                resume,
                job,
                setSaveStatus
            })

    return (
        <FormProvider {...methods}>
            <form className="mb-6 p-4">
                <DndContext modifiers={[restrictToParentElement]} onDragEnd={onSortEnd} onDragOver={handleDragOver}>
                    <SortableContext items={fields} strategy={rectSortingStrategy}>
                        {name == 'skills' && <Button className="mb-3" type="button" onClick={optimizeSkills} size="md">Optimize</Button>}
                        {!loading &&
                            <CreatableSelect
                                isMulti
                                value={fields}
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
            </form>
        </FormProvider>
    );
};

export default ListInput;
