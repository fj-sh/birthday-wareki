import { useEffect } from 'react';
import { requestPermissionsAsync } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

export const useNotifications = () => {
  useEffect(() => {
    requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        // TODO: ここで通知の状態を Storage に保存する
      }
    });
  }, []);
};

export const getPermissionsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  console.log('existingStatus', existingStatus);
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (existingStatus === 'denied') {
    Linking.openSettings();
  }
  return finalStatus;
};
