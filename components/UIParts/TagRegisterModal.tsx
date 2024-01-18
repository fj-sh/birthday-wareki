import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useThemedStyle } from '../../hooks/useThemedStyle';
import { Label } from './Label';
import { useState } from 'react';
import { useTagStore } from '../../lib/store/tagStore';
import { type Tag } from '../../lib/interfaces/tag';
import { v4 as uuidv4 } from 'uuid';

interface TagRegisterModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const TagRegisterModal = (props: TagRegisterModalProps) => {
  const { tags, setTags } = useTagStore();
  const [tagName, setTagName] = useState('');
  const { textInputStyle, buttonBackgroundColorStyle, viewBackgroundColorStyle } = useThemedStyle();

  const onPressAddTag = () => {
    const newTag: Tag = {
      id: uuidv4(),
      name: tagName,
    };
    setTags([...tags, newTag]);
    setTagName('');
    props.setModalVisible(!props.modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <TouchableOpacity
        style={modalStyles.centeredView}
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <>
          <View style={modalStyles.modalBackground}></View>
          <View
            style={[modalStyles.modalView, viewBackgroundColorStyle]}
            onStartShouldSetResponder={() => true}
          >
            <Label text={'タグを入力'} position={'left'} />
            <TextInput
              style={textInputStyle}
              value={tagName}
              placeholder={'タグを入力'}
              onChangeText={(text: string) => {
                setTagName(text);
              }}
            />
            <Pressable
              style={[modalStyles.button, buttonBackgroundColorStyle]}
              onPress={onPressAddTag}
            >
              <Text style={modalStyles.textStyle}>タグを追加</Text>
            </Pressable>
          </View>
        </>
      </TouchableOpacity>
    </Modal>
  );
};

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalBackground: {
    position: 'absolute',
    width: '100%',
    height: '110%', // SafeAreaViewの高さを超えるようにする inset を計測すると良い
    backgroundColor: '#000',
    opacity: 0.4,
  },
  modalView: {
    width: '80%',
    height: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    transform: [{ translateY: -70 }],
  },

  button: {
    marginTop: 20,
    borderRadius: 6,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export { TagRegisterModal };
