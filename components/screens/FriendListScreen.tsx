import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { useHeaderLayout } from '../../hooks/useHeaderLayout';
import { MeasureableAnimatedView } from '../MeasureableAnimatedView';
import { SectionListItem } from '../SectionListItem';
import { EvilIcons } from '@expo/vector-icons';
import { BottomFloatingButton } from '../UIParts/FloatingButton';
import { Palette } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { i18n } from '../../lib/i18n/i18n';
import { type Friend } from '../../lib/interfaces/friend';
import { SwipeableListItem } from '../UIParts/SwipeableListItem';
import { HeaderHeight, ItemHeight } from '../../constants/itemHeight';
import { useFriendStore } from '../../lib/store/friendStore';
import { useThemedStyle } from '../../hooks/useThemedStyle';
import { sortFriendAndHeaderList } from '../../lib/feat/sort';
import { type HeaderListItem, isHeader } from '../../lib/interfaces/headerListItem';
import { AdmobBanner } from '../UIParts/AdmobBanner';

const FriendListScreen = () => {
  const { friends, setFriends } = useFriendStore();
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>(friends);
  const [friendsAndHeaders, setFriendsAndHeaders] = useState<Array<Friend | HeaderListItem>>([]);
  const [searchText, setSearchText] = useState('');
  const colorScheme = useColorScheme();
  const { textInputStyle } = useThemedStyle();
  const contentOffsetY = useSharedValue(0);
  const { bottom: safeBottom } = useSafeAreaInsets();
  const isScrolling = useSharedValue(false);
  const {
    textStyle,
    viewBackgroundColorStyle,
    lightViewBackgroundColorStyle,
    iconBackgroundColorStyle,
  } = useThemedStyle();
  const router = useRouter();

  const headers = friendsAndHeaders.filter(isHeader) as HeaderListItem[];

  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends]);

  useEffect(() => {
    const friendsAndHeaders = sortFriendAndHeaderList(filteredFriends);
    setFriendsAndHeaders(friendsAndHeaders);
  }, [filteredFriends]);

  useEffect(() => {
    setFilteredFriends(
      friends.filter((friend) => {
        return friend.name.includes(searchText) || friend.memo.includes(searchText);
      })
    );
  }, [searchText]);

  const textInputContainerStyle = [
    localStyles.textInputContainer,
    {
      borderColor: colorScheme === 'dark' ? '#424242' : '#E0E0E0',
      backgroundColor: colorScheme === 'dark' ? '#424242' : '#F5F5F5',
    },
  ];

  // Where the magic happens :)
  const { headerRefs, headersLayoutX, headersLayoutY } = useHeaderLayout({
    headers,
    data: friendsAndHeaders,
    headerHeight: HeaderHeight,
    itemHeight: ItemHeight,
  });

  const { rHeaderListStyle, rIndicatorStyle } = useHeaderStyle({
    contentOffsetY,
    headersLayoutX,
    headersLayoutY,
    colorSchemeName: colorScheme,
  });

  const flatlistRef = useRef<FlatList<Friend | HeaderListItem>>(null);

  const onSelectHeaderItem = useCallback(
    (headerItem: string) => {
      const headerIndex = friendsAndHeaders.findIndex(
        (_item) => (_item as HeaderListItem).header === headerItem
      );

      flatlistRef.current?.scrollToIndex({
        index: headerIndex,
      });
    },
    [friendsAndHeaders]
  );

  const onChangeSearchText = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  // Define the animated style for the floating action button
  const rFloatingActionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isScrolling.value ? 0 : 1, {
            overshootClamping: true,
          }),
        },
      ],
    };
  }, []);

  const onAddButtonPress = useCallback(() => {
    router.push({ pathname: '/(tabs)/register', params: { id: '' } }); // friend: null
  }, []);

  const onEditButtonPress = useCallback((friend: Friend) => {
    router.push({ pathname: '/(tabs)/register', params: { id: friend.id } });
  }, []);

  return (
    <SafeAreaView style={[localStyles.container, lightViewBackgroundColorStyle]}>
      <>
        <View style={[textInputContainerStyle, iconBackgroundColorStyle]}>
          <EvilIcons name="search" size={24} color="#BDBDBD" style={localStyles.icon} />
          <TextInput
            style={textInputStyle}
            onChangeText={(text) => {
              onChangeSearchText(text);
            }}
            placeholder={i18n.t('birthdayList.searchPlaceholder')}
          />
        </View>
        {/* Animated Header Section */}
        <Animated.ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[{ flexDirection: 'row', height: 80 }, rHeaderListStyle, viewBackgroundColorStyle]}
        >
          {headers.map(({ header }, index) => {
            return (
              <MeasureableAnimatedView
                key={`${header}-${index}`}
                onTouchStart={() => {
                  onSelectHeaderItem(header);
                }}
                ref={headerRefs[index]}
                style={{
                  padding: 20,
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 14,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    },
                    textStyle,
                  ]}
                  key={`${header}-${index}-header-text`}
                >
                  {header}
                </Text>
              </MeasureableAnimatedView>
            );
          })}
        </Animated.ScrollView>
        <Animated.View style={rIndicatorStyle} />
      </>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
        <AdmobBanner />
      </View>
      <FlatList
        onScroll={(e) => {
          contentOffsetY.value = e.nativeEvent.contentOffset.y;
        }}
        onMomentumScrollBegin={() => {
          isScrolling.value = true;
        }}
        onMomentumScrollEnd={() => {
          isScrolling.value = false;
        }}
        ref={flatlistRef}
        scrollEventThrottle={16}
        data={friendsAndHeaders}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        renderItem={({ item }) => {
          if (isHeader(item)) {
            const header = item as HeaderListItem;
            return (
              <SectionListItem
                item={header}
                height={HeaderHeight}
                key={`${header.id}-rendered-header`}
              />
            );
          }

          const friend = item as Friend;
          return (
            <SwipeableListItem
              simultaneousHandlers={flatlistRef}
              friend={friend}
              onDismiss={() => {
                setFriends(friends.filter((item) => item.id !== friend.id));
              }}
              onTap={() => {
                onEditButtonPress(friend);
              }}
              key={friend.id}
            />
          );
        }}
      />

      <BottomFloatingButton
        onSelect={onAddButtonPress}
        style={[
          {
            position: 'absolute',
            bottom: safeBottom + 10,
            right: 24,
            height: 64,
            aspectRatio: 1,
            backgroundColor: colorScheme === 'dark' ? '#455A64' : Palette.primary,
            borderRadius: 32,
          },
          rFloatingActionStyle,
        ]}
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputContainer: {
    width: '85%',
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 6,
    marginHorizontal: 10,
    marginRight: 50,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginLeft: 10,
    marginRight: 5,
  },
  textInput: {
    height: 30,
    fontSize: 16,
    width: '100%',
    marginVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
});

export { FriendListScreen };
