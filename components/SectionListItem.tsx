import { Text, View, StyleSheet } from 'react-native';
import { type HeaderListItem, isHeader, type ListItem } from '../constants/sample';

interface SectionListItemProps {
  item: ListItem | HeaderListItem;
  height: number;
}

const SectionListItem = ({ item, height }: SectionListItemProps) => {
  if (isHeader(item)) {
    const { header } = item as HeaderListItem;
    return (
      <View style={[localStyles.headerContainer, { height }]}>
        <Text style={localStyles.headerText}>{header}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.1)',
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
