import { DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sectionOptions } from "../../app/resumebuilder/resumetest-helper";
import { Dispatch, SetStateAction, useId, useState } from "react";
import { ResumeClass } from "../../models/Resume";
import { arrayMove } from "@dnd-kit/sortable";
import { saveResumeToDatabase } from "../../app/resumebuilder/[id]/resumebuilder-helper";
import { usePathname } from "next/navigation";

interface UseResumeFormProps {
    resume: ResumeClass
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
}

export const useResumeForm = ({ resume, setSaveStatus }: UseResumeFormProps) => {
    const path = usePathname()
    const resumeId = resume._id.toString()
    const currentSections: sectionOptions[] = resume.sectionOrder && resume.sectionOrder.length > 0 ? resume.sectionOrder as sectionOptions[] : [
        'skills',
        'professional_experience',
        'education',
        'projects',
        'awards',
        'publications',
        'certifications',
        'volunteering',
        'interests'
    ];
    const [sections, setSections] = useState<sectionOptions[]>(currentSections)

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (over && active.id !== over.id) {
            const updateSections = (sections: sectionOptions[]): sectionOptions[] => {
                const oldIndex = sections.indexOf(active.id as sectionOptions);
                const newIndex = sections.indexOf(over.id as sectionOptions);
                return arrayMove(sections, oldIndex, newIndex);
            };

            const newSectionOrder = updateSections(sections);
            setSections(newSectionOrder)
        }
        await saveResumeToDatabase({
            resumeId,
            setKey: 'sectionOrder',
            value: sections,
            path,
            setSaveStatus
        })
    }

    const handleDragOver = async (event: DragOverEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (over && active.id !== over.id) {
            const updateSections = (sections: sectionOptions[]): sectionOptions[] => {
                const oldIndex = sections.indexOf(active.id as sectionOptions);
                const newIndex = sections.indexOf(over.id as sectionOptions);
                return arrayMove(sections, oldIndex, newIndex);
            };

            const newSectionOrder = updateSections(sections);

            setSections(newSectionOrder)
        }
    }

    const [activeSection, setActiveSection] = useState<string | null>()

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    );

    const handleDragStart = (event: DragStartEvent) => {
        // Logic to handle item drop, updating the state of jobApps accordingly
        //console.log(event.active.id.toString())
        setActiveSection(event.active.id.toString());
    };

    const overlaySection = sections.find(section => section === activeSection) || ''

    const id = useId()

    return { id, handleDragStart, handleDragOver, handleDragEnd, sensors, overlaySection, sections }
}