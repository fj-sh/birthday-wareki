import {
  getPermissionsAsync,
  requestDeniedPermissions,
  requestInitPermissions,
  scheduleNotification,
  useNotifications,
} from '../../hooks/useNotifications';
import type {
  NotificationContentInput,
  NotificationTriggerInput,
} from 'expo-notifications/src/Notifications.types';

import { FriendListScreen } from '../../components/screens/FriendListScreen';

export default function TabOneScreen() {
  const onRequest = async () => {
    const status = await getPermissionsAsync();

    let permissionStatus = status;
    if (permissionStatus !== 'granted') {
      permissionStatus = await requestInitPermissions();
    }

    if (permissionStatus !== 'granted') {
      await requestDeniedPermissions(permissionStatus);
    }
  };

  const sendNotification = async () => {
    const content: NotificationContentInput = {
      title: 'Hello',
      body: 'World',
      badge: 2,
    };
    const trigger: NotificationTriggerInput = {
      seconds: 10,
    };

    await scheduleNotification(content, trigger);
  };
  useNotifications();
  return <FriendListScreen />;
}
