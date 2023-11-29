import { pdfstyles } from "../styles";
import { Link, Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { FieldConfig, formatDate, GeneralSectionConfig } from "../../../resumebuilder/resumetest-helper";
import { Award, Certification, Details, Education, ProfessionalExperience, Project, Publication, Responsibilities, Volunteering } from "../../../../models/Resume";
import { isArray } from "chart.js/dist/helpers/helpers.core";
import { isRefType } from "@typegoose/typegoose";

// Determine the key to sort by. This could be more dynamic based on sectionConfig if needed.
const getSortDateField = (sectionConfig: GeneralSectionConfig) => {
    // Check if 'end_date' field is configured
    const hasEndDate = sectionConfig.fieldsConfig.some(field => field.name === 'end_date');
    if (hasEndDate) return 'end_date';

    // Check if 'date' field is configured
    const hasDate = sectionConfig.fieldsConfig.some(field => field.name === 'date');
    if (hasDate) return 'date';

    // Return null if neither 'end_date' nor 'date' is configured
    return null;
};

type sectionType = ProfessionalExperience | Education | Publication | Project | Award | Certification | Volunteering

// Custom sort function
const sortDataBasedOnConfig = (data: sectionType[]
    , sectionConfig: GeneralSectionConfig
) => {
    // Get the appropriate date field for sorting
    const sortDateField = getSortDateField(sectionConfig);

    // Custom sort function
    const customSort = (a: sectionType, b: sectionType) => {
        if (!sortDateField) return 0; // No sorting if no date field is present

        const dateA = a[sortDateField as keyof sectionType]?.toString();
        const dateB = b[sortDateField as keyof sectionType]?.toString();

        const isCurrentDefined = (obj: any): obj is { current: boolean } => {
            return 'current' in obj;
        };

        // Handle 'current' or 'present' cases
        if (isCurrentDefined(a) && (a.current || dateA === 'present')) return -1;
        if (isCurrentDefined(b) && (b.current || dateB === 'present')) return 1;


        // Convert dates to timestamps for comparison
        const timestampA = new Date(dateA || '').getTime();
        const timestampB = new Date(dateB || '').getTime();

        // Sort in descending order
        return timestampB - timestampA;
    };

    // Return the sorted data
    return data.sort(customSort);
};

const SectionHeader = ({ title }: { title: string }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{title.toUpperCase()}</Text>
        <LineBreak />
    </View>
);

interface ResumeSectionProps {
    sectionConfig: GeneralSectionConfig
    data: ProfessionalExperience[] | Education[] | Publication[] | Project[] | Award[] | Certification[] | Volunteering[]
}

const PDFResumeSection = ({ sectionConfig, data }: ResumeSectionProps) => {
    // Sort the data if necessary
    const sortedData = sortDataBasedOnConfig(data, sectionConfig);

    return (
        <View wrap={false}>
            <SectionHeader title={sectionConfig.title} />
            {sortedData.map((item, index) => (
                <EntryView key={index} item={item} fieldsConfig={sectionConfig.fieldsConfig} />
            ))}
        </View>
    );
};

interface FieldGroups {
    [key: string]: FieldConfig[];
}


const EntryView = ({ item, fieldsConfig }: { item: sectionType, fieldsConfig: FieldConfig[] }) => {
    const groupedFields = fieldsConfig.reduce<FieldGroups>((acc, fieldConfig) => {
        const group = fieldConfig.pdfgroup || fieldConfig.name; // Fallback to name if no group specified
        acc[group] = acc[group] ? [...acc[group], fieldConfig] : [fieldConfig];
        return acc;
    }, {});

    return (
        <View style={pdfstyles.resumeEntry}>
            {Object.entries(groupedFields).map(([group, groupFields]) => (
                <RenderFieldGroups key={group} group={group} item={item} groupFields={groupFields} />
            ))}
        </View>
    );
};

const RenderFieldGroups = ({ group, item, groupFields }: { group: string, item: sectionType, groupFields: FieldConfig[] }) => {
    const titleTextGroups = groupFields.filter(g => (g.pdfgroup == group) && ['text', 'textBold', 'link'].includes(g.pdftype || ''))
    const numTitleText = titleTextGroups.length
    const titleDateGroups = groupFields.filter(g => (g.pdfgroup == group) && ['date', 'startDate', 'endDate'].includes(g.pdftype || ''))
    const numTitleDate = titleDateGroups.length

    switch (group) {
        case 'title':
            return (
                <View style={pdfstyles.entryHeader}>
                    <View style={pdfstyles.entryTitle}>
                        {titleTextGroups.map((field, idx) => (
                            <View style={pdfstyles.entryTitle} key={idx}>
                                <RenderField key={idx} field={field} item={item} />
                                <Text style={pdfstyles.text}>{idx < numTitleText - 1 ? ', ' : ''}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={pdfstyles.entryTitle}>
                        {titleDateGroups.map((field, idx) => (
                            <View style={pdfstyles.entryTitle} key={idx}>
                                <RenderField key={idx} field={field} item={item} />
                                <Text style={pdfstyles.entryDateSeparator}>{(idx < numTitleDate - 1) && (numTitleDate != 1) ? '-' : ''}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )
        case 'body':
            return (
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        {groupFields.filter(g => g.pdfgroup == group).map((field, idx) => (
                            // Render each field based on its type (text, date, bulletPoints, etc.)
                            <RenderField key={idx} field={field} item={item} />
                        ))}
                    </View>
                </View>
            )
        // Add more cases as needed for different field types
        default:
            return null;
    }
};

const RenderField = ({ field, item }: { field: FieldConfig, item: sectionType }) => {

    const hasProperty = <T extends object>(obj: T, key: keyof any): key is keyof T => {
        return key in obj;
    };

    const fieldName = field.name

    if (!hasProperty(item, fieldName)) {
        return null;
    } else {
        switch (field.pdftype) {
            case 'text':
                return <Text style={pdfstyles.text}>{item[fieldName] || field.placeholder}</Text>;

            case 'textBold':
                return <Text style={pdfstyles.textbold}>{item[fieldName] || field.placeholder}</Text>;

            case 'date':
                return <Text style={pdfstyles.entryDate}>{item[fieldName] ? formatDate(item[fieldName]?.toString()) : field.placeholder}</Text>;

            case 'startDate':
                return <Text style={pdfstyles.entryDate}>{item[fieldName] ? formatDate(item[fieldName]?.toString()) : field.placeholder}</Text>;

            case 'endDate':
                return <Text style={pdfstyles.entryDate}>{item['current' as keyof sectionType] ? 'PRESENT' : formatDate(item[fieldName]?.toString())}</Text>;

            case 'bulletPoints':
                const bulletPoints = item[fieldName];
                if (Array.isArray(bulletPoints)) {
                    // Now it's safe to treat bulletPoints as Details[]
                    return (
                        <>
                            {bulletPoints.map((detail: Details, idx: number) => (
                                <View style={pdfstyles.bulletItem} key={idx}>
                                    <Text style={pdfstyles.bulletPoint}>• {detail.content}</Text>
                                </View>
                            ))}
                        </>
                    );
                }
                return null;

            case 'gpa':
                return <Text style={pdfstyles.text}>{`GPA: ${item[fieldName] || ''}`}</Text>;

            case 'link':
                return item[fieldName] ? <Link src={item['Link' as keyof sectionType]?.toString() || ''} style={pdfstyles.contactInfoLink}>{item['LinkTitle' as keyof sectionType] || field.placeholder}</Link> : null;

            // Add more cases as needed for different field types
            default:
                return null;
        }
    }
};



export default PDFResumeSection;
