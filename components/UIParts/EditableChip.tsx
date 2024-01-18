import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EditableChipProps {
  label: string;
  color: string;
  onPress: () => void;
}

const EditableChip = (props: EditableChipProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[localStyles.container, { backgroundColor: props.color }]}>
        <Text style={localStyles.text} numberOfLines={1} ellipsizeMode="tail">
          {props.label}
        </Text>
      </View>
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
    height: 'auto',
    maxWidth: 110,
    width: 'auto',
  },

  text: {
    maxWidth: '100%',
    paddingHorizontal: 8,
  },
});

export { EditableChip };
