import { FieldConfig } from "../../../../resumebuilder/resumetest-helper";
import { SectionWrapper } from "./SectionWrapper";
import { FieldGroups, ResumeSectionType } from "../../../../resumebuilder/[id]/resumebuilder-helper";
import { Field } from "./Field";
import { Dispatch, SetStateAction } from "react";

interface ResumeItemProps {
    resumeId: string;
    index: number;
    item?: ResumeSectionType;
    fieldsConfig: FieldConfig[]; // New prop for field configuration
    sectionName: string;
    handleRemove: () => void;
    isVisible: boolean;
    toggleVisibility: () => void;
    setSaveStatus: Dispatch<SetStateAction<"saving" | "up to date" | "error">>
}

export const SectionItem = ({
    resumeId,
    index,
    item,
    sectionName,
    fieldsConfig,
    handleRemove,
    isVisible,
    toggleVisibility,
    setSaveStatus
}: ResumeItemProps) => {
    const setKey = sectionName + '.' + index
    const groupedFields = fieldsConfig.reduce<FieldGroups>((acc, fieldConfig) => {
        const group = fieldConfig.group || fieldConfig.name; // Fallback to name if no group specified
        acc[group] = acc[group] ? [...acc[group], fieldConfig] : [fieldConfig];
        return acc;
    }, {});

    const previewItems = fieldsConfig.slice(0, 2); // Adjust the number as needed
    const titleName: string = previewItems[0].name;
    const associationName: string = previewItems[1].name;

    // Initialize title with the first item
    const title = item && item.hasOwnProperty(titleName) ? item[titleName as keyof ResumeSectionType] as string : '';
    let sectionTitle = title
    const association = item && item.hasOwnProperty(associationName) ? item[associationName as keyof ResumeSectionType] as string : '';

    // Add the second item with a hyphen only if both items exist
    if (title && association) {
        sectionTitle += ' - ' + association;
    } else if (association) {
        sectionTitle = association;
    }

    let isCurrent = false;
    if (item && item.hasOwnProperty('current')) {
        isCurrent = Boolean(item['current' as keyof ResumeSectionType]);
    }

    return (
        <SectionWrapper index={index} title={sectionTitle} handleRemove={handleRemove} isVisible={isVisible} toggleVisibility={toggleVisibility}>
            {Object.entries(groupedFields).map(([group, groupFields]) => (
                <div key={group} className="flex flex-col lg:flex-row lg:space-x-4 py-2">
                    {groupFields.map((fieldConfig, i) =>
                        <Field
                            key={i}
                            fieldData={item && item[fieldConfig.name as keyof ResumeSectionType] as Partial<ResumeSectionType>}
                            resumeId={resumeId}
                            fieldConfig={fieldConfig}
                            isCurrent={isCurrent}
                            setKey={setKey}
                            index={index}
                            setSaveStatus={setSaveStatus}
                        />
                    )}
                </div>
            ))}
        </SectionWrapper>
    )
};