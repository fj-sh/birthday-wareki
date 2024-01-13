import { StyleSheet, useColorScheme, Text } from 'react-native';
import { getRegionCode } from '../../lib/feat/localization';
import { getEtoByString } from '../../lib/feat/eto';

interface EtoProps {
  year: string;
}

const Eto = (props: EtoProps) => {
  const colorScheme = useColorScheme();
  const labelTextStyle = [
    localStyles.labelText,
    colorScheme === 'dark' && localStyles.darkLabelText,
  ];

  if (props.year === '') {
    return <></>;
  }

  const eto = getEtoByString(props.year);

  return <>{getRegionCode() === 'JP' && <Text style={labelTextStyle}>{eto}</Text>}</>;
};

const localStyles = StyleSheet.create({
  labelText: {
    fontSize: 16,
  },
  darkLabelText: {
    color: '#fff',
  },
});

export { Eto };
