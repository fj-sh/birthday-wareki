import { StyleSheet, useColorScheme, Text } from 'react-native';
import { getRegionCode } from '../../lib/feat/localization';
import { getWarekiByString } from '../../lib/feat/wareki';

interface WarekiProps {
  year: string;
  month: string;
  day: string;
}

const Wareki = (props: WarekiProps) => {
  const colorScheme = useColorScheme();
  const labelTextStyle = [
    localStyles.labelText,
    colorScheme === 'dark' && localStyles.darkLabelText,
  ];

  if (props.year === '') {
    return <></>;
  }

  const wareki = getWarekiByString(props.year, props.month, props.day);

  return <>{getRegionCode() === 'JP' && <Text style={labelTextStyle}>{wareki}</Text>}</>;
};

const localStyles = StyleSheet.create({
  labelText: {
    fontSize: 16,
  },
  darkLabelText: {
    color: '#fff',
  },
});

export { Wareki };
