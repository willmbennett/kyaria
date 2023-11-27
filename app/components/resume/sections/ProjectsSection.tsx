import { Project } from "../../../../models/Resume";
import { Link, Text, View } from '@react-pdf/renderer';
import { LineBreak } from "./LineBreak";
import { pdfstyles } from "../styles";
import { formatDate } from "../../../resumebuilder/resumetest-helper";

export const ProjectSection = ({ projects }: { projects: Project[] }) => (
    <View>
        <Text style={pdfstyles.sectionHeader}>{'Projects'.toUpperCase()}</Text>
        <LineBreak />
        {projects.map((project, index) => (
            <View key={index}>
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        <Text style={pdfstyles.text}>{project.name || 'Project Name'}, <Link src={project.Link || ''} style={pdfstyles.contactInfoLink}>{project.LinkTitle}</Link></Text>
                    </View>
                    <Text style={pdfstyles.entryDate}>{formatDate(project.start_date)} - {formatDate(project.end_date)}</Text>
                </View>
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        <Text style={pdfstyles.text}>{project.organization || 'Organization'}, {project.location || 'Location'}</Text>
                    </View>
                </View>
                <View style={pdfstyles.entryContainer}>
                    <View style={pdfstyles.entryMain}>
                        {project.details && project.details.map((detail, idx) =>
                            <View style={pdfstyles.bullets} key={idx}>
                                <Text key={idx} style={pdfstyles.bulletPoint}>•</Text>
                                <Text key={idx} style={pdfstyles.bulletPoint}>{detail.content}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        ))}
    </View>
);
