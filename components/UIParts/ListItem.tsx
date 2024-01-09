import { type Friend } from '../../lib/interfaces/friend';
import { type PanGestureHandlerProps } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  friend: Friend;
  ItemHeight: number;
  onDismiss?: (task: Friend) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem = ({ friend, ItemHeight, onDismiss, simultaneousHandlers }: ListItemProps) => {};

export { ListItem };
