import { type Friend } from '../../lib/interfaces/friend';
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
  type PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { ItemHeight } from '../../constants/itemHeight';
import { BirthdayText } from './FriendListItems/BirthdayText';
import { useThemedStyle } from '../../hooks/useThemedStyle';
import { Eto } from './Eto';
import { Wareki } from './Wareki';
import { trimText } from '../../lib/feat/trimText';
import { EditableChip } from './EditableChip';
import { useTagStore } from '../../lib/store/tagStore';
import { useEffect, useState } from 'react';

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  friend: Friend;
  onDismiss?: (task: Friend) => void;
  onTap: () => void;
  onTagTap: (tag: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const SwipeableListItem = ({
  friend,
  onDismiss,
  simultaneousHandlers,
  onTap,
  onTagTap,
}: ListItemProps) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(ItemHeight);
  const marginVertical = useSharedValue(0);
  const opacity = useSharedValue(1);
  const { tags } = useTagStore();
  const [friendTags, setFriendTags] = useState(
    tags.filter((tag) => friend.tagIds.includes(tag.id))
  );

  useEffect(() => {
    setFriendTags(tags.filter((tag) => friend.tagIds.includes(tag.id)));
  }, [tags, friend.tagIds]);

  const { textStyle, viewBackgroundColorStyle, lightViewBackgroundColorStyle } = useThemedStyle();

  const canDelete = () => {
    Alert.alert(
      '友達の削除',
      `${friend.name}を削除してもよろしいですか？`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            translateX.value = withTiming(0);
          },
        },
        {
          text: '削除',
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
    <Animated.View
      style={[styles.taskContainer, rFriendContainerStyle, lightViewBackgroundColorStyle]}
    >
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5 name={'trash-alt'} size={ItemHeight * 0.6} color={'red'} />
      </Animated.View>

      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[styles.friend, rStyle, viewBackgroundColorStyle]}>
          <View style={styles.contentAndIconContainer}>
            <View style={styles.contentContainer}>
              <Text style={[styles.friendTitle, textStyle]}>{friend.name}</Text>
              <BirthdayText friend={friend} />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Wareki year={friend.birthYear} month={friend.birthMonth} day={friend.birthDay} />
                <Eto year={friend.birthYear} />
              </View>
              <View style={{ width: '95%', height: 20 }}>
                <Text style={[textStyle]} numberOfLines={1} ellipsizeMode="tail">
                  {trimText(friend.memo, 25)}
                </Text>
              </View>
              <ScrollView
                style={styles.tagList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {friendTags.map((tag) => {
                  return (
                    <View style={{ marginHorizontal: 6 }} key={tag.id}>
                      <EditableChip
                        key={`${tag.id}-tag-chip`}
                        label={tag.name}
                        onPress={() => {
                          onTagTap(tag.name);
                        }}
                        color={'#DCEDC8'}
                      />
                    </View>
                  );
                })}
              </ScrollView>
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
    gap: 3,
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
  memoText: {
    fontSize: 12,
    color: 'gray',
    flexShrink: 1,
  },
  tagList: {
    flexGrow: 0,
    flexShrink: 1,
  },
});

export { SwipeableListItem };
