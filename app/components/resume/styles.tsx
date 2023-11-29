import { Font, StyleSheet } from '@react-pdf/renderer';


export const pdfstyles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
    border:'50px'
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 30,
    fontFamily: 'Times-Roman'
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
    fontFamily: 'Times-Bold',
    marginBottom: 2
  },
  name: {
    fontSize: 22,
    fontFamily: 'Times-Bold',
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
    fontFamily: 'Times-Bold',
    marginTop: 10,
    marginBottom: 5
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  textbold: {
    fontSize: 10,
    marginBottom: 3,
    fontFamily: 'Times-Bold',
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