import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CheckableChipProps {
  label: string;
  checked: boolean;
  checkedColor: string;
  normalColor: string;
  onPress: () => void;
}
const CheckableChip = (props: CheckableChipProps) => {
  const rChipStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: props.checked ? props.checkedColor : props.normalColor,
    };
  });

  const rIconStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(props.checked ? 1 : 0, { stiffness: 100, duration: 500 }),
    };
  });

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Animated.View style={[localStyles.container, rChipStyle]}>
        <Animated.View style={rIconStyle}>
          <Feather name="check" size={24} color="#2E7D32" />
        </Animated.View>
        <Text style={localStyles.text} numberOfLines={1} ellipsizeMode="tail">
          {props.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
    gap: 5,
    height: 'auto',
    maxWidth: 110,
    width: 'auto',
  },

  text: {
    maxWidth: '80%',
  },
});

export { CheckableChip };
