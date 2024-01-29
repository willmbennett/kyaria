import { Line, Svg, View } from '@react-pdf/renderer';
import { pdfstyles } from './styles';

export const LineBreak = () => (
  <View style={pdfstyles.lineBreak}>
    <Svg height="1" width="100%">
      <Line
        x1="0"
        y1="1"
        x2="1000"
        y2="1"
        strokeWidth={1}
        stroke="black"
      />
    </Svg>
  </View>)