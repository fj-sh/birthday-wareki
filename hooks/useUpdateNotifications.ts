import {
  type NotificationSettings,
  useNotificationSettingsStore,
} from '../lib/store/notificationSettingsStore';
import * as Notifications from 'expo-notifications';
import { type ReminderSetting, useReminderSettingsStore } from '../lib/store/reminderSettingsStore';
import { useFriendStore } from '../lib/store/friendStore';
import type { Friend } from '../lib/interfaces/friend';
import type { NotificationTriggerInput } from 'expo-notifications/src/Notifications.types';
import { scheduleNotification } from './useNotifications';
import { useEffect } from 'react';

export const useUpdateNotifications = () => {
  const { clearAllNotifications } = useNotificationSettingsStore();
  const { friends } = useFriendStore();
  const { reminderSettings } = useReminderSettingsStore();
  const { addNotification } = useNotificationSettingsStore();

  useEffect(() => {
    updateNotifications();
  }, [friends, reminderSettings]);

  const updateNotifications = () => {
    clearAllNotifications();
    Notifications.cancelAllScheduledNotificationsAsync().then(() => {
      for (const friend of friends) {
        setNotificationsByReminderSettings(friend, reminderSettings).then(
          (notificationSettings) => {
            saveNotificationIdsForFriend(notificationSettings, addNotification);
          }
        );
      }
    });
  };

  return { updateNotifications };
};

const createNotificationContent = (friend: Friend, day: number) => {
  if (day === 0) {
    return {
      title: `${friend.name}さんの誕生日です`,
      body: `${friend.name}さんの誕生日です`,
      data: { friendId: friend.id },
    };
  } else {
    return {
      title: `${friend.name}さんの誕生日が${day}日後です`,
      body: `${friend.name}さんの誕生日が${day}日後です`,
      data: { friendId: friend.id },
    };
  }
};

const setNotificationsByReminderSettings = async (
  friend: Friend,
  reminderSettings: ReminderSetting[]
) => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const birthMonth = Number(friend.birthMonth);
  const birthDay = Number(friend.birthDay);
  let birthDate = new Date(thisYear, birthMonth - 1, birthDay, 8, 0, 0); // Set time to 08:00 AM

  // もし現在の日付が誕生日を過ぎている場合、次年度の誕生日に設定
  if (birthDate < today) {
    birthDate = new Date(thisYear + 1, birthMonth - 1, birthDay, 8, 0, 0);
  }

  // 各通知のIDを格納するための配列
  const notificationSettings: NotificationSettings[] = [];

  for (const setting of reminderSettings) {
    if (setting.checked) {
      let day;
      switch (setting.label) {
        case 'OnTheDay':
          day = 0;
          break;
        case 'OneDayBefore':
          day = 1;
          break;
        case 'ThreeDaysBefore':
          day = 3;
          break;
        case 'SevenDaysBefore':
          day = 7;
          break;
        case 'ThirtyDaysBefore':
          day = 30;
          break;
        default:
          continue;
      }

      const content = createNotificationContent(friend, day);
      const triggerDate = new Date(birthDate.getTime() - day * 24 * 60 * 60 * 1000);
      const triggerSeconds = (triggerDate.getTime() - today.getTime()) / 1000;

      if (triggerSeconds > 0) {
        const trigger: NotificationTriggerInput = {
          seconds: triggerSeconds,
        };

        const notificationId = await scheduleNotification(content, trigger);
        notificationSettings.push({
          notificationId,
          friendId: friend.id,
          reminderLabel: setting.label,
        });
      }
    }
  }

  return notificationSettings;
};

const saveNotificationIdsForFriend = (
  notificationSettings: NotificationSettings[],
  addNotification: (notificationId: string, friendId: string, reminderLabel: string) => void
) => {
  notificationSettings.forEach((setting) => {
    addNotification(setting.notificationId, setting.friendId, setting.reminderLabel);
  });
};
