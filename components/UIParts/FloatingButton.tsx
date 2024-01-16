import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { type StyleProp, type ViewStyle, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Palette } from '../../constants/Colors';

interface BottomFloatingButtonProps {
  style?: StyleProp<ViewStyle>; // Optional style prop for customizing the button's appearance
  onSelect?: () => void; // Optional callback function for handling icon selection
}

const BottomFloatingButton = ({ style, onSelect }: BottomFloatingButtonProps) => {
  // Create a shared animated value 'highlighted' to track whether the button is highlighted
  const highlighted = useSharedValue(false);

  // Create a tap gesture using GestureHandler and define the tap behavior
  const gesture = Gesture.Tap()
    .maxDuration(10000) // Set the maximum duration for a tap gesture
    .onBegin(() => {
      highlighted.value = true; // Mark the button as highlighted when the tap begins
    })
    .onTouchesUp(() => {
      // When the tap ends, determine which option to select based on progress value
      if (onSelect) runOnJS(onSelect)();
    })
    .onFinalize(() => {
      highlighted.value = false; // Reset the highlighted state when the tap gesture is finalized
    });

  // Define the animated style for scaling the button when it is highlighted
  const rHighlightedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(highlighted.value ? 0.8 : 1), // Scale the button down when highlighted, return to normal scale otherwise
        },
      ],
    };
  }, []);

  // Render the BottomFloatingButton component
  return (
    <GestureDetector gesture={gesture}>
      {/* Animated View representing the floating button */}
      <Animated.View style={[style, rHighlightedStyle]} testID="floatingButton">
        {/* Absolute positioned view for the 'add' icon */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.center]}>
          <MaterialIcons name={'add'} size={28} color={Palette.text} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export the BottomFloatingButton component for usage in other components
export { BottomFloatingButton };
