import { type Friend } from '../../../lib/interfaces/friend';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyle } from '../../../hooks/useThemedStyle';
import { memo } from 'react';

interface WarekiTextProps {
  friend: Friend;
}

const WarekiText = memo((props: WarekiTextProps) => {
  const { textStyle } = useThemedStyle();

  return (
    <View style={localStyles.container}>
      <Text style={textStyle}>
        {props.friend.warekiBirthday} {props.friend.warekiBirthday === '' ?? '----'}
      </Text>
    </View>
  );
});

const localStyles = StyleSheet.create({
  container: {
    color: 'transparent',
    flexDirection: 'row',
    gap: 3,
  },
});

export { WarekiText };
