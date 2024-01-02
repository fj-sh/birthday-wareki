import { useEffect } from 'react';
import { type PermissionStatus, requestPermissionsAsync } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import {
  type NotificationContentInput,
  type NotificationTriggerInput,
} from 'expo-notifications/src/Notifications.types';

// https://qiita.com/sei_sato/items/cb0bdb35a3eedc142219
export const useNotifications = () => {
  useEffect(() => {
    requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        // TODO: ここで通知の状態を Storage に保存する - savePermissions
      }
    });
  }, []);
};

export const getPermissionsAsync = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  return status;
};

export const savePermissions = async (status: PermissionStatus) => {
  // TODO: AsyncStorage に保存する
};

export const requestInitPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus;
};

export const requestDeniedPermissions = async (permissionStatus: PermissionStatus) => {
  if (permissionStatus === 'denied') {
    Linking.openSettings();
  }
};

export const scheduleNotification = async (
  content: NotificationContentInput,
  trigger: NotificationTriggerInput
) => {
  console.log('scheduleNotification');
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  await Notifications.scheduleNotificationAsync({
    content,
    trigger,
  });
};
