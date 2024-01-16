import { create, type StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ReminderSetting {
  name: string;
  label: string;
  checked: boolean;
}

export interface ReminderSettingsStore {
  reminderSettings: ReminderSetting[];
  updateSetting: (label: string, checked: boolean) => void;
}
const reminderSettingsStore: StateCreator<ReminderSettingsStore> = (set, get) => ({
  reminderSettings: [
    { name: '当日', label: 'OnTheDay', checked: true },
    { name: '1日前', label: 'OneDayBefore', checked: true },
    { name: '3日前', label: 'ThreeDaysBefore', checked: true },
    { name: '7日前', label: 'SevenDaysBefore', checked: true },
    { name: '30日前', label: 'ThirtyDaysBefore', checked: true },
  ],
  updateSetting: (label: string, checked: boolean) => {
    set((state) => {
      const newSettings = state.reminderSettings.map((setting) =>
        setting.label === label ? { ...setting, checked } : setting
      );
      return { ...state, reminderSettings: newSettings };
    });
  },
});
export const useReminderSettingsStore = create(
  persist(reminderSettingsStore, {
    name: 'reminder-settings-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);
