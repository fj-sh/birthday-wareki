import { monthForLocale } from '../lib/feat/monthForLocale';
import { type Friend } from '../lib/interfaces/friend';

interface HeaderListItem {
  id: string;
  header: string;
}

// So yes, I like gangster movies.
export const data: Array<Friend | HeaderListItem> = [
  {
    id: 'fc9aaf44-b831-4f46-86b8-95ab73b5aef9',
    header: monthForLocale(1, 'long'),
  },
  {
    id: '1',
    name: 'Alice',
    isBirthYearUnknown: false,
    birthYear: '1990',
    birthMonth: '06',
    birthDay: '15',
    age: '34',
    memo: 'Loves photography',
    labelIds: ['1', '3'],
  },

  {
    id: '58d47816-4ef6-485d-bf9f-f2226c92a6b5',
    header: monthForLocale(2, 'long'),
  },
  {
    id: '2',
    name: 'Bob',
    isBirthYearUnknown: true,
    birthYear: '',
    birthMonth: '11',
    birthDay: '22',
    age: '',
    memo: 'Enjoys hiking',
    labelIds: ['2', '4'],
  },
];

// Simple utility function to check if an item is a header or not.
export const isHeader = (item: Friend | HeaderListItem) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Boolean((item as any)?.header);

export type { HeaderListItem };
