import { StyleSheet, Text, View } from 'react-native';
import { type Friend } from '../../../lib/interfaces/friend';
import { useThemedStyle } from '../../../hooks/useThemedStyle';
import { memo } from 'react';

interface BirthdayTextProps {
  friend: Friend;
}
const BirthdayText = memo((props: BirthdayTextProps) => {
  const { textStyle } = useThemedStyle();

  const getBirthYear = (birthYear: string) => {
    return birthYear === '' ? '----' : `${birthYear}`;
  };

  const getBirthMonth = (birthMonth: string) => {
    return birthMonth === '' ? '--' : `${birthMonth}`;
  };

  const getBirthDay = (birthDay: string) => {
    return birthDay === '' ? '--' : `${birthDay}`;
  };

  return (
    <View style={localStyles.container}>
      <Text style={textStyle}>{getBirthYear(props.friend.birthYear)}</Text>
      <Text style={textStyle}>/</Text>
      <Text style={textStyle}>{getBirthMonth(props.friend.birthMonth)}</Text>
      <Text style={textStyle}>/</Text>
      <Text style={textStyle}>{getBirthDay(props.friend.birthDay)}</Text>
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

export { BirthdayText };
