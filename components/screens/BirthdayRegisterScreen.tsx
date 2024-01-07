import { type Friend } from '../../lib/interfaces/friend';
import { useRef, useState } from 'react';
import { View, StyleSheet, Switch, TextInput, Text } from 'react-native';
import { Label } from '../UIParts/Label';
import Animated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface FriendRegisterScreenProps {
  friend: Friend;
}

const BirthdayRegisterScreen = (props: FriendRegisterScreenProps) => {
  const [friend, setFriend] = useState<Friend>({
    ...props.friend,
  });

  const monthInputRef = useRef<TextInput>(null);
  const dayInputRef = useRef<TextInput>(null);

  const handleYearChange = (text: string) => {
    if (monthInputRef.current === null) {
      return;
    }
    if (text.length === 4) {
      monthInputRef.current.focus();
    }
  };

  const handleMonthChange = (text: string) => {
    if (dayInputRef.current === null) {
      return;
    }
    if (text.length === 2) {
      dayInputRef.current.focus();
    }
  };

  const toggleIsBirthYearUnknown = () => {
    setFriend((previousState) => ({
      ...previousState,
      isBirthYearUnknown: !previousState.isBirthYearUnknown,
    }));
  };

  const rBirthYearInputStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(friend.isBirthYearUnknown ? 0 : 70, {
        duration: 200,
        easing: Easing.linear,
      }),
      opacity: withTiming(friend.isBirthYearUnknown ? 0 : 1, {
        duration: 200,
        easing: Easing.linear,
      }),
    };
  }, [friend.isBirthYearUnknown]);

  return (
    <View style={localStyles.container}>
      <View style={localStyles.inputContainer}>
        <Label text={'名前'} position={'left'} />

        <TextInput style={localStyles.textInput} value={friend.name} placeholder={'名前を入力'} />

        <Label text={'生年月日'} position={'left'} />

        <View style={localStyles.birthdayInputContainer}>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 4,
              },
              rBirthYearInputStyle,
            ]}
          >
            <TextInput
              style={localStyles.birthdayInput}
              placeholder={'YYYY'}
              onChangeText={handleYearChange}
              maxLength={4}
            />
            <Text style={localStyles.birthdayInputSeparator}>/</Text>
          </Animated.View>
          <TextInput
            ref={monthInputRef}
            style={localStyles.birthdayInput}
            placeholder={'MM'}
            onChangeText={handleMonthChange}
            maxLength={2}
          />
          <Text style={localStyles.birthdayInputSeparator}>/</Text>
          <TextInput
            style={localStyles.birthdayInput}
            ref={dayInputRef}
            placeholder={'DD'}
            maxLength={2}
          />
        </View>
        <View style={localStyles.birthdayUnknownContainer}>
          <Text style={localStyles.labelText}>生まれ年が不明</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#25D366' }}
            thumbColor={friend.isBirthYearUnknown ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleIsBirthYearUnknown}
            value={friend.isBirthYearUnknown}
          />
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputContainer: {
    marginVertical: 6,
    marginHorizontal: 12,
  },

  textInput: {
    height: 40,
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },

  birthdayInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  birthdayInput: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 60,
    borderRadius: 5,
  },

  birthdayInputSeparator: {
    marginHorizontal: 4,
  },

  birthdayUnknownContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  labelText: {
    fontSize: 16,
  },
});

export { BirthdayRegisterScreen };
