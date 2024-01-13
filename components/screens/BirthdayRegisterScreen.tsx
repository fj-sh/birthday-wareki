import { type Friend } from '../../lib/interfaces/friend';
import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { Label } from '../UIParts/Label';
import { Wareki } from '../UIParts/Wareki';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useBirthday } from '../../hooks/useBirthday';
import { CheckableChip } from '../UIParts/CheckableChip';
import { sampleTags } from '../../lib/interfaces/label';
import { TextButton } from '../UIParts/TextButton';
import { getBirthYearByAge } from '../../lib/feat/age';
import { getRegionCode } from '../../lib/feat/localization';
import { Eto } from '../UIParts/Eto';
import { TagRegisterModal } from '../UIParts/TagRegisterModal';

interface FriendRegisterScreenProps {
  friend: Friend;
}

const BirthdayRegisterScreen = (props: FriendRegisterScreenProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const [friend, setFriend] = useState<Friend>({
    ...props.friend,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const colorScheme = useColorScheme();

  const monthInputRef = useRef<TextInput>(null);
  const dayInputRef = useRef<TextInput>(null);

  const { handleYearChange, handleMonthChange, handleDayChange } = useBirthday({
    friend,
    setFriend,
    monthInputRef,
    dayInputRef,
  });

  const toggleIsBirthYearUnknown = () => {
    setFriend((previousState) => ({
      ...previousState,
      isBirthYearUnknown: !previousState.isBirthYearUnknown,
    }));
  };

  const setBirthYearByAge = (text: string) => {
    if (text === '' || text === undefined) {
      return;
    }
    const updateBirthMonth = friend.birthMonth === '' ? '1' : friend.birthMonth;
    const updateBirthDay = friend.birthDay === '' ? '1' : friend.birthDay;

    const birthYear = getBirthYearByAge(Number(text), updateBirthMonth, updateBirthDay);
    setFriend((previousState) => ({
      ...previousState,
      isBirthYearUnknown: false,
      birthYear: birthYear.toString(),
      birthMonth: updateBirthMonth,
      birthDay: updateBirthDay,
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

  const textInputStyle = [
    localStyles.textInput,
    colorScheme === 'dark' && localStyles.darkTextInput,
  ];

  const birthdayInputSeparatorStyle = [
    localStyles.birthdayInputSeparator,
    colorScheme === 'dark' && localStyles.darkLabelText,
  ];

  const labelTextStyle = [
    localStyles.labelText,
    colorScheme === 'dark' && localStyles.darkLabelText,
  ];

  const birthdayInputStyle = [
    localStyles.birthdayInput,
    colorScheme === 'dark' && localStyles.darkTextInput,
  ];

  const memoInputStyle = [
    localStyles.textMemoInput,
    colorScheme === 'dark' && localStyles.darkTextInput,
  ];

  const onMemoAreaFocused = () => {
    scrollViewRef.current?.scrollTo({ y: 250, animated: true });
  };

  const onMemoAreaFocusedOut = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={colorScheme === 'dark' ? localStyles.darkContainer : localStyles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 350 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={colorScheme === 'dark' ? localStyles.darkContainer : localStyles.container}>
            <View style={localStyles.inputContainer}>
              <Label text={'名前'} position={'left'} />

              <TextInput
                style={textInputStyle}
                value={friend.name}
                placeholder={'名前を入力'}
                onChangeText={(text: string) => {
                  setFriend((previousState) => ({
                    ...previousState,
                    name: text,
                  }));
                }}
              />

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
                    style={birthdayInputStyle}
                    placeholder={'YYYY'}
                    onChangeText={handleYearChange}
                    maxLength={4}
                    value={friend.birthYear}
                    keyboardType={'number-pad'}
                  />
                  <Text style={birthdayInputSeparatorStyle}>/</Text>
                </Animated.View>
                <TextInput
                  ref={monthInputRef}
                  style={birthdayInputStyle}
                  placeholder={'MM'}
                  onChangeText={handleMonthChange}
                  value={friend.birthMonth}
                  maxLength={3}
                  keyboardType={'number-pad'}
                />
                <Text style={birthdayInputSeparatorStyle}>/</Text>
                <TextInput
                  style={birthdayInputStyle}
                  ref={dayInputRef}
                  placeholder={'DD'}
                  maxLength={2}
                  onChangeText={handleDayChange}
                  keyboardType={'number-pad'}
                  value={friend.birthDay}
                />
              </View>
              <View style={localStyles.birthdayUnknownContainer}>
                <Text style={labelTextStyle}>生まれ年が不明</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#25D366' }}
                  thumbColor={friend.isBirthYearUnknown ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleIsBirthYearUnknown}
                  value={friend.isBirthYearUnknown}
                />
              </View>
              <View style={localStyles.AgeInputStyle}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <Text style={labelTextStyle}>年齢 </Text>
                  <TextInput
                    style={[birthdayInputStyle, { width: 100 }]}
                    placeholder={'年齢を入力'}
                    maxLength={3}
                    onChangeText={(text: string) => {
                      setFriend((previousState) => ({
                        ...previousState,
                        age: text,
                      }));
                      setBirthYearByAge(text);
                    }}
                    keyboardType={'number-pad'}
                    value={friend.age}
                  />
                  {getRegionCode() === 'JP' && friend.birthYear !== '' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 16,
                        marginTop: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Wareki
                        year={friend.birthYear}
                        month={friend.birthMonth}
                        day={friend.birthDay}
                      />
                      <Eto year={friend.birthYear} />
                    </View>
                  )}
                </View>
              </View>

              <Label text={'タグを設定'} position={'left'} />
              <View style={localStyles.tagChipContainer}>
                {sampleTags.map((label) => (
                  <CheckableChip
                    key={label.id}
                    label={label.name}
                    checked={friend.labelIds.includes(label.id)}
                    checkedColor={'#DCEDC8'}
                    normalColor={'#FFF8E1'}
                    onPress={() => {
                      // friend を更新
                      if (friend.labelIds.includes(label.id)) {
                        setFriend((previousState) => ({
                          ...previousState,
                          labelIds: previousState.labelIds.filter((id) => id !== label.id),
                        }));
                      } else {
                        setFriend((previousState) => ({
                          ...previousState,
                          labelIds: [...previousState.labelIds, label.id],
                        }));
                      }
                    }}
                  />
                ))}
              </View>
              <View style={localStyles.textButton}>
                <TextButton
                  text={'タグを追加'}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
              </View>

              <Label text={'メモ'} position={'left'} />
              <TextInput
                style={memoInputStyle}
                value={friend.memo}
                placeholder={'メモを入力'}
                placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'lightgray'}
                multiline={true}
                onChangeText={(text) => {
                  setFriend((previousState) => ({
                    ...previousState,
                    memo: text,
                  }));
                }}
                onFocus={onMemoAreaFocused}
                onBlur={onMemoAreaFocusedOut}
              />
            </View>

            <TagRegisterModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  darkScrollContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#000',
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

  darkTextInput: {
    backgroundColor: '#333',
    color: '#fff',
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
  darkLabelText: {
    color: '#fff',
  },
  tagChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  AgeInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  textButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  textMemoInput: {
    minHeight: 100,
    height: 'auto',
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
});

export { BirthdayRegisterScreen };
