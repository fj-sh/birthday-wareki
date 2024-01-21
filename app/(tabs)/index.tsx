import { useNotifications } from '../../hooks/useNotifications';

import { FriendListScreen } from '../../components/screens/FriendListScreen';
import { useUpdateNotifications } from '../../hooks/useUpdateNotifications';

export default function InitPage() {
  useNotifications();
  useUpdateNotifications();

  return <FriendListScreen />;
}
