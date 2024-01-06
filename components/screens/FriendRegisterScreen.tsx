import { type Friend } from '../../lib/interfaces/friend';
import { useState } from 'react';
import { View } from 'react-native';

interface FriendRegisterScreenProps {
  friend: Friend;
}

const FriendRegisterScreen = (props: FriendRegisterScreenProps) => {
  const [friend, setFriend] = useState<Friend>({
    ...props.friend,
  });

  return <View></View>;
};

export { FriendRegisterScreen };
