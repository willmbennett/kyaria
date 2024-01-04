import React, { KeyboardEventHandler, MouseEventHandler, useState, useId } from "react";
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
import { NewPostFormData } from "../../../lib/hooks/blog";

type ArrayField = { id: string, label: string; value: string }

type ArrayFieldNames = "tags";

type ListInputProps = {
    name: ArrayFieldNames;
    control: Control<NewPostFormData>;
};

const MultiValue = (props: MultiValueProps<ArrayField>) => {
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


const Control = (props: ControlProps<ArrayField>) => {
    const { setNodeRef, active } = useDroppable({
        id: "droppable"
    });

    return (
        <div ref={setNodeRef}>
            <components.Control {...props} />
        </div>
    );
};


const MultiValueContainer = (props: MultiValueGenericProps<ArrayField>) => {
    return <components.MultiValueContainer {...props} />;
};

const MultiValueRemove = (props: MultiValueRemoveProps<ArrayField>) => {
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

const ListInput: React.FC<ListInputProps> = ({ name, control }) => {
    const { fields, append, remove, move } = useFieldArray({ control, name });
    const [inputValue, setInputValue] = useState('');

    const onChange = (fields: OnChangeValue<ArrayField, true>) => {
        remove();
        fields.forEach(item => append({ label: item.label, value: item.value }));
    }

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                // Check if the skill is unique before adding it
                if (!fields.some((field) => (field as ArrayField).value === inputValue)) {
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
    const id = useId()

    return (
        <div className="mb-6 p-4 border bg-slate-100 border-slate-400 shadow rounded-md">
            <DndContext modifiers={[restrictToParentElement]} onDragEnd={onSortEnd} onDragOver={handleDragOver} id={id}>
                <SortableContext items={fields} strategy={rectSortingStrategy}>
                    <CreatableSelect
                        isMulti
                        value={fields.map(field => ({ id: field.id, label: (field as ArrayField).value, value: (field as ArrayField).value }))}
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
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ListInput;
