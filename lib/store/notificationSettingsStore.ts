import { create, type StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface NotificationSettings {
  notificationId: string;
  friendId: string;
  reminderLabel: string;
}

export interface NotificationSettingsStore {
  notificationSettings: NotificationSettings[];
  addNotification: (notificationId: string, friendId: string, reminderLabel: string) => void;
  clearAllNotifications: () => void;
}

const notificationSettingsStore: StateCreator<NotificationSettingsStore> = (set, get) => ({
  notificationSettings: [],
  addNotification: (notificationId: string, friendId: string, reminderLabel: string) => {
    set((state) => {
      const newNotification = { notificationId, friendId, reminderLabel };
      const newSettings = [...state.notificationSettings, newNotification];
      return { ...state, notificationSettings: newSettings };
    });
  },
  clearAllNotifications: () => {
    set(() => ({ notificationSettings: [] }));
  },
});

export const useNotificationSettingsStore = create(
  persist(notificationSettingsStore, {
    name: 'notification-settings-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);
