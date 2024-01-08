import { type Friend } from '../lib/interfaces/friend';
import { type Dispatch, type RefObject, type SetStateAction } from 'react';
import { type TextInput } from 'react-native';

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
    setFriend((previousState) => ({
      ...previousState,
      birthYear: text,
    }));

    if (text.length === 4) {
      monthInputRef.current.focus();
    }
  };

  const handleMonthChange = (text: string): void => {
    if (dayInputRef.current === null) {
      return;
    }

    if (text === '') {
      setFriend((previousState) => ({
        ...previousState,
        birthMonth: '',
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
    setFriend((previousState) => ({
      ...previousState,
      birthDay: text,
    }));
  };

  return { handleYearChange, handleMonthChange, handleDayChange };
};

export { useBirthday };
