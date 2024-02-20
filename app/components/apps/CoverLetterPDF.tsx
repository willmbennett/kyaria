import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Consider adding a custom font import here if desired

const spacingMargin = 15

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 48, // Increased padding for a more spacious layout
        fontSize: 11, // Increased base font size for better readability
        lineHeight: 1.6, // Increased line height for improved readability
        fontFamily: 'Times-Roman', // Example of setting a serif font for a formal look
    },
    contactInfo: {
        marginBottom: spacingMargin,
        color: '#333',
    },
    contactItem: { // Fixed typo from 'conactItem' to 'contactItem'
        fontSize: 10, // Slightly smaller font for contact info
    },
    date: {
        marginBottom: spacingMargin,
        color: '#555',
        fontSize: 10, // Consistent font size for secondary text
    },
    salutation: {
        marginBottom: spacingMargin,
        color: '#333',
        fontWeight: 'bold', // Bold for emphasis
    },
    bodyText: {
        marginBottom: spacingMargin,
        textAlign: 'justify', // Justify text for a polished look
    },
    signOff: {
        color: '#333',
        fontWeight: 'bold', // Consistency in emphasis
    },
    accentText: { // New style for name and important headings
        color: '#007BFF', // Example accent color
        fontSize: 12,
        fontWeight: 'bold',
    }
});

interface CoverLetterPDFProps {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    companyLocation?: string;
    company?: string;
    bodyText?: string;
}

export const CoverLetterPDF: React.FC<CoverLetterPDFProps> = ({
    name,
    phone,
    email,
    address,
    company,
    bodyText,
    companyLocation
}) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.contactInfo}>
                    {name && <Text style={[styles.contactItem, styles.accentText]}>{name}</Text>}
                    {address && <Text style={styles.contactItem}>{address}</Text>}
                    {phone && <Text style={styles.contactItem}>{phone}</Text>}
                    {email && <Text style={styles.contactItem}>{email}</Text>}
                </View>

                <Text style={styles.date}>{currentDate}</Text>

                <View style={styles.contactInfo}>
                    {company && <Text style={styles.contactItem}>Hiring Manager</Text>}
                    {company && <Text style={styles.contactItem}>{company}</Text>}
                    {companyLocation && <Text style={styles.contactItem}>{companyLocation}</Text>}
                </View>

                <Text style={styles.salutation}>Dear Hiring Manager,</Text>

                {bodyText && <Text style={styles.bodyText}>{bodyText}</Text>}

                <Text style={styles.signOff}>Sincerely,</Text>
                {name && <Text style={[styles.contactInfo, styles.accentText]}>{name}</Text>}
            </Page>
        </Document>
    );
};
