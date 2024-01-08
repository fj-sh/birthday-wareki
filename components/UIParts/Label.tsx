import { View, Text, StyleSheet, type ViewStyle, useColorScheme } from 'react-native';

interface LabelProps {
  text: string;
  position: 'left' | 'right' | 'center';
}
const Label = (props: LabelProps) => {
  const colorScheme = useColorScheme();
  const positionToAlignItems = (position: 'left' | 'right' | 'center') => {
    switch (position) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      case 'center':
        return 'center';
    }
  };
  const positionStyle: ViewStyle = {
    justifyContent: 'center',
    alignItems: positionToAlignItems(props.position),
  };

  const textStyle = [localStyles.text, colorScheme === 'dark' && localStyles.darkText];

  return (
    <View style={[localStyles.container, positionStyle]}>
      <Text style={textStyle}>{props.text}</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
});

export { Label };
