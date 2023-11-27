import { StyleSheet } from '@react-pdf/renderer';


export const pdfstyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 30,
    },
    entryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    entryMain: {
      flex: 1,
      minWidth: 0,
    },
    entryDate: {
      flexShrink: 0,
      marginLeft: 10,
      fontSize: 11,
      textAlign: 'right'
    },
    header: {
      textAlign: 'center',
      marginBottom: 5,
    },
    title: {
      textAlign: 'center',
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 2
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#4A6274'
    },
    separator: {
      marginHorizontal: 5, // Adjust as needed for spacing
      fontSize: 10,
      // ... other styles
    },
    lineBreak: {
      marginBottom: 2 // Adjust as needed for spacing
    },
    contactView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    contactInfo: {
      marginHorizontal: 3, // Adjust as needed for spacing
      fontSize: 10,
    },
    contactInfoLink: {
      marginHorizontal: 3, // Adjust as needed for spacing
      fontSize: 10,
      textDecoration: 'none',
      color: '#4A6274'
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5
    },
    text: {
      fontSize: 10,
      marginBottom: 5,
    },
    bullets: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: 2,
    },
    bulletPoint: {
      marginLeft: 5,
      fontSize: 10,
    },
    // ... other styles as needed
  });