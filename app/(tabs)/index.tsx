import { useNotifications } from '../../hooks/useNotifications';

import { FriendListScreen } from '../../components/screens/FriendListScreen';
import { useUpdateNotifications } from '../../hooks/useUpdateNotifications';
import { useRequestConsent } from '../../hooks/useRequestConsent';

export default function InitPage() {
  useNotifications();
  useUpdateNotifications();
  useRequestConsent();

  return <FriendListScreen />;
}
