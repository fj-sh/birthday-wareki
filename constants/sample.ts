import { monthForLocale } from '../lib/feat/monthForLocale';
import { type Friend } from '../lib/interfaces/friend';

interface ListItem {
  title: string;
}
interface HeaderListItem {
  header: string;
}

// So yes, I like gangster movies.
export const data: Array<Friend | HeaderListItem> = [
  {
    header: monthForLocale(1, 'long'),
  },
  {
    id: '1',
    name: 'Alice',
    isBirthYearUnknown: false,
    birthYear: '1990',
    birthMonth: '06',
    birthDay: '15',
    age: 34,
    memo: 'Loves photography',
    labelIds: ['1', '3'],
  },
  {
    id: '2',
    name: 'Bob',
    isBirthYearUnknown: true,
    birthMonth: '11',
    birthDay: '22',
    memo: 'Enjoys hiking',
    labelIds: ['2', '4'],
  },
  {
    header: monthForLocale(2, 'long'),
  },
  {
    id: '3',
    name: 'Takashi',
    isBirthYearUnknown: true,
    birthMonth: '11',
    birthDay: '22',
    memo: '将棋が好きです',
    labelIds: ['2', '4'],
  },
  {
    header: monthForLocale(3, 'long'),
  },
  {
    id: '4',
    name: 'Emma',
    isBirthYearUnknown: false,
    birthYear: '1985',
    birthMonth: '02',
    birthDay: '10',
    age: 39,
    memo: 'Passionate about art',
    labelIds: ['5', '6'],
  },
  {
    header: 'Brad Pitt',
  },
  {
    id: '5',
    name: 'Carlos',
    isBirthYearUnknown: true,
    birthMonth: '07',
    birthDay: '30',
    memo: 'Loves cooking',
    labelIds: ['7', '3'],
  },
  {
    header: monthForLocale(4, 'long'),
  },
  {
    id: '6',
    name: 'Yuki',
    isBirthYearUnknown: false,
    birthYear: '1992',
    birthMonth: '12',
    birthDay: '01',
    age: 32,
    memo: 'Fond of skiing',
    labelIds: ['2', '8'],
  },
  {
    id: '7',
    name: 'Sofia',
    isBirthYearUnknown: false,
    birthYear: '1995',
    birthMonth: '04',
    birthDay: '18',
    age: 29,
    memo: 'Enthusiastic traveler',
    labelIds: ['1', '9'],
  },
  {
    header: monthForLocale(5, 'long'),
  },
  {
    id: '8',
    name: 'David',
    isBirthYearUnknown: true,
    birthMonth: '09',
    birthDay: '05',
    memo: 'Tech enthusiast',
    labelIds: ['4', '10'],
  },
  {
    id: '9',
    name: 'David',
    isBirthYearUnknown: true,
    birthMonth: '09',
    birthDay: '05',
    memo: 'Tech enthusiast',
    labelIds: ['4', '10'],
  },
  {
    id: '10',
    name: 'David',
    isBirthYearUnknown: true,
    birthMonth: '09',
    birthDay: '05',
    memo: 'Tech enthusiast',
    labelIds: ['4', '10'],
  },
  {
    id: '11',
    name: 'David',
    isBirthYearUnknown: true,
    birthMonth: '09',
    birthDay: '05',
    memo: 'Tech enthusiast',
    labelIds: ['4', '10'],
  },
  {
    id: '12',
    name: 'David',
    isBirthYearUnknown: true,
    birthMonth: '09',
    birthDay: '05',
    memo: 'Tech enthusiast',
    labelIds: ['4', '10'],
  },
  {
    id: '13',
    name: 'David',
    isBirthYearUnknown: true,
    birthMonth: '09',
    birthDay: '05',
    memo: 'Tech enthusiast',
    labelIds: ['4', '10'],
  },
];

// Simple utility function to check if an item is a header or not.
export const isHeader = (item: Friend | HeaderListItem) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Boolean((item as any)?.header);

export type { ListItem, HeaderListItem };
