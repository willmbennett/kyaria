import { StyleSheet } from '@react-pdf/renderer';

const sectionMargin = 5

export const pdfstyles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100%',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 30,
    fontFamily: 'Times-Roman',
    fontSize: 11
  },
  resumeSection: {
    marginTop: sectionMargin
  },
  resumeEntry: {
    marginTop: sectionMargin
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Optional, for vertical alignment
    justifyContent: 'space-between', // Adjust as needed
    // Add other styling as required
  },
  entryTitle: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Optional, for vertical alignment
    // Add other styling as required
  },
  entryMain: {
    flex: 1,
    minWidth: 0,
    // Add other styling as required
  },
  entryDate: {
    flexShrink: 0,
    textAlign: 'right'
  },
  entryDateSeparator: {
    marginHorizontal: 3
  },
  header: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'Times-Bold',
    marginTop: 2 * sectionMargin
  },
  name: {
    fontSize: 22,
    fontFamily: 'Times-Bold',
  },
  separator: {
    marginHorizontal: 2, // Adjust as needed for spacing
    // ... other styles
  },
  lineBreak: {
    marginBottom: 2 // Adjust as needed for spacing
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    marginHorizontal: 3, // Adjust as needed for spacing
  },
  contactInfoLink: {
    marginHorizontal: 3, // Adjust as needed for spacing
    textDecoration: 'none',
    color: '#4A6274'
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    marginBottom: 2
  },
  text: {
  },
  textbold: {
    fontFamily: 'Times-Bold',
  },
  bulletListContainer: {
    flexDirection: 'column',
    flex: 1, // Take the full width if needed
  },
  bulletItem: {
    flexDirection: 'row', // For the bullet and the text to be in the same line
    alignItems: 'flex-start', // Adjust vertical alignment as needed
    // Add more styling for bullet items here
  },
  bulletPoint: {
    marginLeft: 5,
  },
  // ... other styles as needed
});