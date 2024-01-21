import { type Friend } from '../../lib/interfaces/friend';
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
  type PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import { Alert, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { ItemHeight } from '../../constants/itemHeight';

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  friend: Friend;
  onDismiss?: (task: Friend) => void;
  onTap: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const SwipeableListItem = ({ friend, onDismiss, simultaneousHandlers, onTap }: ListItemProps) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(ItemHeight);
  const marginVertical = useSharedValue(0);
  const opacity = useSharedValue(1);

  const canDelete = () => {
    Alert.alert(
      'Delete Friend',
      `Are you sure you want to delete ${friend.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            translateX.value = withTiming(0);
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            translateX.value = withTiming(-SCREEN_WIDTH);
            itemHeight.value = withTiming(0);
            marginVertical.value = withTiming(10);
            opacity.value = withTiming(0, undefined, (isFinished) => {
              if (isFinished && onDismiss) {
                runOnJS(onDismiss)(friend);
              }
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        runOnJS(canDelete)();
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return { opacity };
  });

  const rFriendContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, rFriendContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5 name={'trash-alt'} size={ItemHeight * 0.4} color={'red'} />
      </Animated.View>

      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[styles.friend, rStyle]}>
          <View style={styles.contentAndIconContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.friendTitle}>{friend.name}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onTap}>
              <Entypo name="chevron-right" size={24} color="gray" />
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
  },
  contentAndIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },

  friend: {
    width: '95%',
    height: ItemHeight - 20,
    justifyContent: 'center',

    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  friendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    height: ItemHeight,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { SwipeableListItem };
