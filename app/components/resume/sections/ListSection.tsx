import { Text, View } from '@react-pdf/renderer';
import { pdfstyles } from '../styles';
import { LineBreak } from './LineBreak';

export const ListSection = ({ name, list }: { name: string, list: string[] }) => (
    <View style={pdfstyles.resumeSection}>
      <Text style={pdfstyles.sectionHeader}>{name.toUpperCase()}</Text>
      <LineBreak />
      <Text style={pdfstyles.text}>{list.join(', ')}</Text>
    </View>
  );
  