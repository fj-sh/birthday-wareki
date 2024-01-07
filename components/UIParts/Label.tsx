import { View, Text, StyleSheet, type ViewStyle } from 'react-native';

interface LabelProps {
  text: string;
  position: 'left' | 'right' | 'center';
}
const Label = (props: LabelProps) => {
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

  return (
    <View style={[localStyles.container, positionStyle]}>
      <Text style={localStyles.text}>{props.text}</Text>
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
});

export { Label };
