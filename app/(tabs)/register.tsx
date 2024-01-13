import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { BirthdayRegisterScreen } from '../../components/screens/BirthdayRegisterScreen';
import { type Friend } from '../../lib/interfaces/friend';

export default function Register() {
  const initFriend: Friend = {
    id: uuidv4(),
    name: '',
    isBirthYearUnknown: false,
    birthMonth: '',
    birthDay: '',
    labelIds: ['1', '2'],
    memo: '',
    age: '',
  };
  return <BirthdayRegisterScreen friend={initFriend} />;
}
