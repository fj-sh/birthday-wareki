import { type Friend } from '../interfaces/friend';
import { getWarekiByString } from './wareki';

const padWithZero = (numberString: string): string => {
  return numberString.padStart(2, '0');
};

const adjustYear = (year: string): string => {
  const yearInt = parseInt(year);
  return yearInt < 1868 ? '1868' : year;
};

const adjustMonth = (month: string): string => {
  let monthInt = parseInt(month);
  if (monthInt === 0) monthInt = 1;
  else if (monthInt > 12) monthInt = 12;
  return monthInt.toString();
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const adjustDay = (year: string, month: string, day: string): string => {
  const dayInt = parseInt(day);
  const monthInt = parseInt(month);
  const yearInt = parseInt(year);
  const daysInMonth = getDaysInMonth(yearInt, monthInt);
  if (dayInt === 0) return '1';
  return dayInt > daysInMonth ? daysInMonth.toString() : day;
};

export const complementFriend = (friend: Friend): Friend => {
  const adjustedYear = adjustYear(friend.birthYear);
  const adjustedMonth = adjustMonth(friend.birthMonth);
  const adjustedDay = adjustDay(adjustedYear, adjustedMonth, friend.birthDay);

  return {
    ...friend,
    birthYear: padWithZero(adjustedYear),
    birthMonth: padWithZero(adjustedMonth),
    birthDay: padWithZero(adjustedDay),
    warekiBirthday: getWarekiByString(adjustedYear, adjustedMonth, adjustedDay),
  };
};
