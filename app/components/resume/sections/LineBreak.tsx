import { Line, Svg, View } from '@react-pdf/renderer';
import { pdfstyles } from '../styles';

export const LineBreak = () => (
  <View style={pdfstyles.lineBreak}>
    <Svg height="5" width="100%">
      <Line
        x1="0"
        y1="3"
        x2="1000"
        y2="3"
        strokeWidth={2}
        stroke="#4A6274"
      />
    </Svg>
  </View>)