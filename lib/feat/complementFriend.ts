import { type Friend } from '../interfaces/friend';
import { getWarekiByString } from './wareki';

const padWithZero = (numberString: string): string => {
  return numberString.padStart(2, '0');
};

export const complementFriend = (friend: Friend): Friend => {
  return {
    ...friend,
    birthMonth: padWithZero(friend.birthMonth),
    birthDay: padWithZero(friend.birthDay),
    warekiBirthday: getWarekiByString(friend.birthYear, friend.birthMonth, friend.birthDay),
  };
};
