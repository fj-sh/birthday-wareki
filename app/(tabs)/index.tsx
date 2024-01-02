import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={onRequest}>
        <Text>Push通知の許可を求める</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={sendNotification}>
        <Text>Push通知を送る</Text>
      </TouchableOpacity>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
