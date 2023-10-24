import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import './CoverLetterPDF.css';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        paddingHorizontal: 70,
        fontSize: 9,
        lineHeight: 1.4
    },
    contactInfo: {
        marginBottom: 10,
        color: '#333',
    },
    conactItem: {
        marginBottom: 5
    },
    date: {
        marginBottom: 20,
        color: '#555',
    },
    salutation: {
        marginBottom: 20,
        color: '#333',
    },
    bodyText: {
        marginVertical: 10,
    },
    signOff: {
        marginTop: 20,
        color: '#333',
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
        <PDFViewer className="viewer">
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.contactInfo}>
                        {name && <Text style={styles.conactItem}>{name}</Text>}
                        {address && <Text style={styles.conactItem}>{address}</Text>}
                        {phone && <Text style={styles.conactItem}>{phone}</Text>}
                        {email && <Text style={styles.conactItem}>{email}</Text>}
                    </View>

                    <Text style={styles.date}>{currentDate}</Text>

                    <View style={styles.contactInfo}>
                        {company && <Text style={styles.conactItem}>Hiring Manager</Text>}
                        {company && <Text style={styles.conactItem}>{company}</Text>}
                        {companyLocation && <Text style={styles.conactItem}>{companyLocation}</Text>}
                    </View>

                    <Text style={styles.salutation}>Dear Hiring Manager,</Text>

                    {bodyText && <Text style={styles.bodyText}>{bodyText}</Text>}

                    <Text style={styles.signOff}>Sincerely,</Text>
                    {name && <Text style={styles.contactInfo}>{name}</Text>}
                </Page>
            </Document>
        </PDFViewer>
    );
};
