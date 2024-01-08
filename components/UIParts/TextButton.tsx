import { TouchableOpacity, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
interface TextButtonProps {
  text: string;
  onPress: () => void;
}
const TextButton = (props: TextButtonProps) => {
  const colorScheme = useColorScheme();

  const textStyle = [localStyles.text, colorScheme === 'dark' && localStyles.darkText];
  const iconColor = colorScheme === 'dark' ? '#fff' : 'black';

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={localStyles.iconTextContainer}>
        <AntDesign name="plus" size={20} color={iconColor} />
        <Text style={textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  text: {
    fontSize: 16,
  },
  darkText: {
    color: '#fff',
  },
});

export { TextButton };
