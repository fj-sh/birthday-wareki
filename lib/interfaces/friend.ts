import { type Label } from './label';

export enum ReminderSetting {
  OnTheDay = 'OnTheDay',
  OneDayBefore = 'OneDayBefore',
  ThreeDaysBefore = 'ThreeDaysBefore',
  SevenDaysBefore = 'SevenDaysBefore',
  ThirtyDaysBefore = 'ThirtyDaysBefore',
}

const reminderSettingLabel: Record<ReminderSetting, string> = {
  [ReminderSetting.OnTheDay]: '当日',
  [ReminderSetting.OneDayBefore]: '1日前',
  [ReminderSetting.ThreeDaysBefore]: '3日前',
  [ReminderSetting.SevenDaysBefore]: '7日前',
  [ReminderSetting.ThirtyDaysBefore]: '30日前',
};
export interface Friend {
  id: string;
  name: string;
  isBirthYearUnknown: boolean;
  birthYear?: number;
  birthMonth: number;
  birthDay: number;
  age?: number;
  selectedLabels: Label[];
  reminderSettings: ReminderSetting[];
}
