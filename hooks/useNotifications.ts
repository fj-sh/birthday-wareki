import { useEffect } from 'react';
import { type PermissionStatus, requestPermissionsAsync } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import {
  type NotificationContentInput,
  type NotificationTriggerInput,
} from 'expo-notifications/src/Notifications.types';
import { type Friend } from '../lib/interfaces/friend';
import { type ReminderSetting, useReminderSettingsStore } from '../lib/store/reminderSettingsStore';
import {
  type NotificationSettings,
  useNotificationSettingsStore,
} from '../lib/store/notificationSettingsStore';
import { useFriendStore } from '../lib/store/friendStore';

// https://qiita.com/sei_sato/items/cb0bdb35a3eedc142219
export const useNotifications = () => {
  useEffect(() => {
    requestPermissionsAsync().then(({ status }) => {});

    getAllScheduledNotifications();
  }, []);
};

export const scheduleNotification = async (
  content: NotificationContentInput,
  trigger: NotificationTriggerInput
) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  return await Notifications.scheduleNotificationAsync({
    content,
    trigger,
  });
};

const getAllScheduledNotifications = async () => {
  const allScheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  console.log('通知設定:', allScheduledNotifications);
  return allScheduledNotifications;
};
