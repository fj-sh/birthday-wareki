import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { BirthdayRegisterScreen } from '../../components/screens/BirthdayRegisterScreen';
import { type Friend } from '../../lib/interfaces/friend';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { i18n } from '../../lib/i18n/i18n';
import { Button } from 'react-native';
import { useFriendStore } from '../../lib/store/friendStore';
import { complementFriend } from '../../lib/feat/complementFriend';
import { useUserActionCountStore } from '../../lib/store/userActionCountStore';

export default function Register() {
  const { friends, setFriends } = useFriendStore();
  const { incrementUserActionCount } = useUserActionCountStore();
  const [friend, setFriend] = useState<Friend>({
    id: uuidv4(),
    name: '',
    isBirthYearUnknown: false,
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    tagIds: [],
    memo: '',
    age: '',
  });
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.id) {
      const foundFriend = friends.find((friend) => friend.id === params.id);
      if (foundFriend) {
        setFriend(foundFriend);
      }
    }
  }, [params.id]);

  const onSaveButtonPress = () => {
    const completeFriend = complementFriend(friend);
    setFriends([...friends, completeFriend]);
    incrementUserActionCount();
    router.back();
  };

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('register.add'),
      headerRight: () => (
        <Button title={i18n.t('register.save')} onPress={onSaveButtonPress}></Button>
      ),
    });
  }, [friend]);

  return <BirthdayRegisterScreen friend={friend} setFriend={setFriend} />;
}
