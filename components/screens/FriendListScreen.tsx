import Animated, { useSharedValue } from 'react-native-reanimated';
import { data, type HeaderListItem, isHeader, type ListItem } from '../../constants/sample';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';
import { useCallback, useRef } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import { useHeaderLayout } from '../../hooks/useHeaderLayout';
import { MeasureableAnimatedView } from '../MeasureableAnimatedView';
import { SectionListItem } from '../SectionListItem';
import { AddIcon, Fab, FabIcon, FabLabel } from '@gluestack-ui/themed';
import { translate } from '../../lib/i18n/i18n';

const HeaderHeight = 65;
const ItemHeight = 50;

const headers = data.filter(isHeader) as HeaderListItem[];

const FriendListScreen = () => {
  const contentOffsetY = useSharedValue(0);
  // Where the magic happens :)
  const { headerRefs, headersLayoutX, headersLayoutY } = useHeaderLayout({
    headers,
    data,
    headerHeight: HeaderHeight,
    itemHeight: ItemHeight,
  });

  const { rHeaderListStyle, rIndicatorStyle } = useHeaderStyle({
    contentOffsetY,
    headersLayoutX,
    headersLayoutY,
  });

  const flatlistRef = useRef<FlatList<ListItem | HeaderListItem>>(null);

  const onSelectHeaderItem = useCallback((headerItem: string) => {
    const headerIndex = data.findIndex((_item) => (_item as HeaderListItem).header === headerItem);
    flatlistRef.current?.scrollToIndex({
      index: headerIndex,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <>
        {/* Animated Header Section */}
        <Animated.View style={[{ flexDirection: 'row' }, rHeaderListStyle]}>
          {headers.map(({ header }, index) => {
            return (
              <MeasureableAnimatedView
                key={header}
                onTouchStart={() => {
                  onSelectHeaderItem(header);
                }}
                ref={headerRefs[index]}
                style={{
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {header}
                </Text>
              </MeasureableAnimatedView>
            );
          })}
        </Animated.View>
        <Animated.View style={rIndicatorStyle} />
      </>
      {/* List */}
      <FlatList
        onScroll={(e) => {
          contentOffsetY.value = e.nativeEvent.contentOffset.y;
        }}
        ref={flatlistRef}
        scrollEventThrottle={16}
        data={data}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        renderItem={({ item }) => {
          return (
            <SectionListItem item={item} height={isHeader(item) ? HeaderHeight : ItemHeight} />
          );
        }}
      />
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>{translate('friendList.addFriend')}</FabLabel>
      </Fab>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export { FriendListScreen };
