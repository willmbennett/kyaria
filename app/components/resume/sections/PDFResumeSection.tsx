import { pdfstyles } from "../styles";
import { Link, Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { FieldConfig, formatDate, GeneralSectionConfig, sectionType, sortDataBasedOnConfig } from "../../../resumebuilder/resumetest-helper";
import { Award, Certification, Details, Education, GPA, ProfessionalExperience, Project, Publication, Volunteering } from "../../../../models/Resume";

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
        <View wrap={false} style={pdfstyles.resumeSection}>
            <SectionHeader title={sectionConfig.title} />
            {sortedData.map((item, index) => (
                <EntryView key={index} item={item} index={index} fieldsConfig={sectionConfig.fieldsConfig} />
            ))}
        </View>
    );
};

interface FieldGroups {
    [key: string]: FieldConfig[];
}


const EntryView = ({ item, fieldsConfig, index }: { item: sectionType, fieldsConfig: FieldConfig[], index: number }) => {
    const groupedFields = fieldsConfig.reduce<FieldGroups>((acc, fieldConfig) => {
        const group = fieldConfig.pdfgroup || fieldConfig.name; // Fallback to name if no group specified
        acc[group] = acc[group] ? [...acc[group], fieldConfig] : [fieldConfig];
        return acc;
    }, {});

    // Define the order in which the groups should be rendered
    const renderOrder = ['title', 'subtitle', 'body'];

    return (
        <View style={index != 0 ? pdfstyles.resumeEntry : {}}>
            {renderOrder.map(group => {
                return groupedFields[group] ? (
                    <RenderFieldGroups key={group} group={group} item={item} groupFields={groupedFields[group]} />
                ) : null;
            })}
        </View>
    );
};

const hasProperty = <T extends object>(obj: T, key: keyof any): key is keyof T => {
    return key in obj;
};

const RenderFieldGroups = ({ group, item, groupFields }: { group: string, item: sectionType, groupFields: FieldConfig[] }) => {
    const titleTextGroups = groupFields.filter(g => (g.pdfgroup == group) && ['text', 'textBold', 'link', 'gpa'].includes(g.pdftype || ''))
    const titleDateGroups = groupFields.filter(g => (g.pdfgroup == group) && ['date', 'startDate', 'endDate', 'current'].includes(g.pdftype || ''))

    switch (group) {
        case 'title':
            return (
                <View style={pdfstyles.entryHeader}>
                    <View style={pdfstyles.entryTitle}>
                        {titleTextGroups.filter(field => hasProperty(item, field.name) && item[field.name]).map((field, idx) => (
                            <View style={pdfstyles.entryTitle} key={idx}>
                                {idx > 0 && <Text>, </Text>}
                                <RenderField key={idx} field={field} item={item} />
                            </View>
                        ))}
                    </View>
                    <View style={pdfstyles.entryTitle}>
                        {titleDateGroups.filter(field => {
                            // Check if the field exists and is not empty
                            if (!hasProperty(item, field.name) || !item[field.name]) {
                                return false;
                            }

                            // If the field is 'endDate', check if 'current' is true. If so, skip this field.
                            if (field.pdftype === 'endDate' && item['current' as keyof sectionType]) {
                                return false;
                            }

                            // For all other cases, include the field
                            return true;
                        }).map((field, idx) => (
                            <View style={pdfstyles.entryTitle} key={idx}>
                                {idx > 0 && <Text style={pdfstyles.entryDateSeparator}>-</Text>}
                                <RenderField key={idx} field={field} item={item} />
                            </View>
                        ))}
                    </View>
                </View>
            )
        case 'subtitle':
            return (
                <View style={pdfstyles.entryHeader}>
                    <View style={pdfstyles.entryTitle}>
                        {titleTextGroups
                            .filter(field =>
                                hasProperty(item, field.name) &&
                                item[field.name] &&
                                (field.name as string !== 'gpa' || (item[field.name] as GPA).score !== '') // Additional check for gpa
                            )
                            .map((field, idx) => (
                                <View style={pdfstyles.entryTitle} key={idx}>
                                    {idx > 0 && <Text>, </Text>}
                                    <RenderField key={idx} field={field} item={item} />
                                </View>
                            ))
                        }

                    </View>
                </View>
            )
        case 'body':
            return (
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        {groupFields.filter(g => g.pdfgroup == group).map((field, idx) => (
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

    const fieldName = field.name

    if (!hasProperty(item, fieldName)) {
        return null;
    } else {
        switch (field.pdftype) {
            case 'text':
                return item[fieldName] ? <Text style={pdfstyles.text}>{item[fieldName]}</Text> : null;

            case 'textBold':
                return item[fieldName] ? <Text style={pdfstyles.textbold}>{item[fieldName]}</Text> : null;

            case 'date':
                return item[fieldName] ? <Text style={pdfstyles.entryDate}>{formatDate(item[fieldName]?.toString())}</Text> : null;

            case 'startDate':
                return item[fieldName] ? <Text style={pdfstyles.entryDate}>{formatDate(item[fieldName]?.toString())}</Text> : null;

            case 'endDate':
                // Only display the end date if 'current' is not set to true
                return <Text style={pdfstyles.entryDate}>{formatDate(item[fieldName]?.toString())}</Text>;

            case 'current':
                // Display 'PRESENT' only if 'end_date' is not set
                return <Text style={pdfstyles.entryDate}>Present</Text>;

            case 'bulletPoints':
                const bulletPoints = item[fieldName];
                if (Array.isArray(bulletPoints)) {
                    return (
                        <View>
                            {bulletPoints.map((detail: Details, idx: number) => (
                                <View style={pdfstyles.bulletItem} key={idx}>
                                    <Text style={pdfstyles.bulletPoint}>•</Text>
                                    <Text style={pdfstyles.bulletText}>{detail.content}</Text>
                                </View>
                            ))}
                        </View>
                    );
                }
                return null;

            case 'gpa':
                return (item[fieldName] as GPA).score ? <Text style={pdfstyles.text}>{`GPA: ${(item[fieldName] as GPA).score}${(item[fieldName] as GPA).scoringSystem ? `/${(item[fieldName] as GPA).scoringSystem}` : ''}`}</Text> : null;

            case 'link':
                return item[fieldName] ? <Link src={item['Link' as keyof sectionType]?.toString() || ''} style={pdfstyles.contactInfoLink}>{item['LinkTitle' as keyof sectionType] || field.placeholder}</Link> : null;

            // Add more cases as needed for different field types
            default:
                return null;
        }
    }
};



export default PDFResumeSection;
