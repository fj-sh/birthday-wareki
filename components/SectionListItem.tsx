import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import { type HeaderListItem, isHeader, type ListItem } from '../constants/sample';

interface SectionListItemProps {
  item: ListItem | HeaderListItem;
  height: number;
}

const SectionListItem = ({ item, height }: SectionListItemProps) => {
  const colorScheme = useColorScheme();
  const headerColorStyle =
    colorScheme === 'dark' ? { backgroundColor: '#333' } : { backgroundColor: '#F1F8E9' };
  const headerTextStyle = {
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };
  if (isHeader(item)) {
    const { header } = item as HeaderListItem;
    return (
      <View style={[localStyles.headerContainer, { height }, headerColorStyle]}>
        <Text style={[localStyles.headerText, headerTextStyle]}>{header}</Text>
      </View>
    );
  }

  const { title } = item as ListItem;

  return (
    <View style={[localStyles.itemContainer, { height }]}>
      <Text>{title}</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingLeft: 15,
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
});

export { SectionListItem };
