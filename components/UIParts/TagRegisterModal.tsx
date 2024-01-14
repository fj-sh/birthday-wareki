import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  TextInput,
} from 'react-native';
import { useThemedStyle } from '../../hooks/useThemedStyle';
import { Label } from './Label';
import { useState } from 'react';

interface TagRegisterModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const TagRegisterModal = (props: TagRegisterModalProps) => {
  const [tagName, setTagName] = useState('');
  const { textInputStyle, buttonBackgroundColorStyle, viewBackgroundColorStyle } = useThemedStyle();

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
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <>
          <View style={styles.modalBackground}></View>
          <View
            style={[styles.modalView, viewBackgroundColorStyle]}
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
              style={[styles.button, buttonBackgroundColorStyle]}
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
              }}
            >
              <Text style={styles.textStyle}>タグを追加</Text>
            </Pressable>
          </View>
        </>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
