import { type Friend } from '../lib/interfaces/friend';
import { type Dispatch, type RefObject, type SetStateAction } from 'react';
import { type TextInput } from 'react-native';
import { getAgeByString } from '../lib/feat/age';

interface UseBirthdayProps {
  friend: Friend;
  setFriend: Dispatch<SetStateAction<Friend>>;
  monthInputRef: RefObject<TextInput>;
  dayInputRef: RefObject<TextInput>;
}

const useBirthday = ({ friend, setFriend, monthInputRef, dayInputRef }: UseBirthdayProps) => {
  const handleYearChange = (text: string): void => {
    if (monthInputRef.current === null) {
      return;
    }

    let age: string | undefined;
    if (text.length === 4) {
      age = getAgeByString(text, friend.birthMonth, friend.birthDay);
    }
    setFriend((previousState) => ({
      ...previousState,
      birthYear: text,
      age: age ?? previousState.age,
    }));

    if (text.length === 4) {
      monthInputRef.current.focus();
    }
  };

  const handleMonthChange = (text: string): void => {
    if (dayInputRef.current === null) {
      return;
    }

    let age: string | undefined;
    if (friend.birthYear) {
      age = getAgeByString(friend.birthYear, text, friend.birthDay);
    }

    if (text === '') {
      setFriend((previousState) => ({
        ...previousState,
        birthMonth: '',
        age: age ?? previousState.age,
      }));
      return;
    }

    let month = parseInt(text, 10);

    if (!isNaN(month)) {
      month = Math.min(month, 12);
      const formattedMonth = month >= 1 && month < 10 ? `0${month}` : `${month}`;

      if (formattedMonth.length === 2 && formattedMonth !== '00' && formattedMonth !== '01') {
        dayInputRef.current.focus();
      }

      if (formattedMonth === '11' || formattedMonth === '12') {
        dayInputRef.current.focus();
      }

      setFriend((previousState) => ({
        ...previousState,
        birthMonth: formattedMonth,
      }));
    }
  };

  const handleDayChange = (text: string): void => {
    let age: string | undefined;
    if (friend.birthYear) {
      age = getAgeByString(friend.birthYear, friend.birthMonth, text);
    }
    setFriend((previousState) => ({
      ...previousState,
      birthDay: text,
      age: age ?? previousState.age,
    }));
  };

  return { handleYearChange, handleMonthChange, handleDayChange };
};

export { useBirthday };
