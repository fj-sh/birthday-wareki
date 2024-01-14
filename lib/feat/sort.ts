import { type HeaderListItem } from '../../constants/sample';
import { monthForLocale } from './monthForLocale';
import { type Friend } from '../interfaces/friend';

const MonthHeaderItemMap = new Map<number, HeaderListItem>([
  [
    1,
    {
      id: 'fc9aaf44-b831-4f46-86b8-95ab73b5aef9',
      header: monthForLocale(1, 'long'),
    },
  ],
  [
    2,
    {
      id: '3b5f835d-947a-4fd3-b077-950ae44525ce',
      header: monthForLocale(2, 'long'),
    },
  ],
  [
    3,
    {
      id: '88ebf6ab-f852-4f9a-8dff-c2260a91780c',
      header: monthForLocale(3, 'long'),
    },
  ],

  [
    4,
    {
      id: '58cb90ad-bcd7-4bc1-b7cb-8ec91a023122',
      header: monthForLocale(4, 'long'),
    },
  ],
  [
    5,
    {
      id: 'c3752012-9cae-4638-95e8-bfb7193295cc',
      header: monthForLocale(5, 'long'),
    },
  ],
  [
    6,
    {
      id: '3f1adfb0-de14-4710-87ea-2b504c592ba2',
      header: monthForLocale(6, 'long'),
    },
  ],
  [
    7,
    {
      id: '544a0f6d-bce9-40ab-9832-788b1ecf3a41',
      header: monthForLocale(7, 'long'),
    },
  ],
  [
    8,
    {
      id: '98696913-c4f4-46af-b375-29b50f1e5545',
      header: monthForLocale(8, 'long'),
    },
  ],
  [
    9,
    {
      id: '56e666a8-d2c8-4c6b-84e6-5c98bb77f545',
      header: monthForLocale(9, 'long'),
    },
  ],
  [
    10,
    {
      id: '16a02868-c87d-4bf5-8aad-d04bf76a60b9',
      header: monthForLocale(10, 'long'),
    },
  ],
  [
    11,
    {
      id: '45c10fc7-a891-44f6-9c89-a67e839fa259',
      header: monthForLocale(11, 'long'),
    },
  ],
  [
    12,
    {
      id: '78ff35bb-e770-44c7-8496-5020867b3527',
      header: monthForLocale(12, 'long'),
    },
  ],
]);
export const sortFriendAndHeaderList = (friends: Friend[]): Array<Friend | HeaderListItem> => {
  const friendAndHeaderList: Array<Friend | HeaderListItem> = [];
  const sortedFriends = sortFriends(friends);
  let currentMonth = 0;

  sortedFriends.forEach((friend) => {
    const friendMonth = parseInt(friend.birthMonth, 10);
    if (friendMonth !== currentMonth) {
      const headerItem = MonthHeaderItemMap.get(friendMonth);
      if (headerItem) {
        friendAndHeaderList.push(headerItem);
        currentMonth = friendMonth; // Update the currentMonth after adding the header
      }
    }
    friendAndHeaderList.push(friend);
  });

  return friendAndHeaderList;
};

// 生まれ月順に友達をソートする
const sortFriends = (friends: Friend[]): Friend[] => {
  const sortedFriends = friends.sort((a, b) => {
    const aMonth = Number(a.birthMonth);
    const bMonth = Number(b.birthMonth);
    const aDay = Number(a.birthDay);
    const bDay = Number(b.birthDay);
    if (aMonth === bMonth) {
      return aDay - bDay;
    }
    return aMonth - bMonth;
  });
  return sortedFriends;
};
