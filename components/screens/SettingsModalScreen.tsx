import { View } from '../Themed';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTagStore } from '../../lib/store/tagStore';
import { Label } from '../UIParts/Label';
import { CheckableChip } from '../UIParts/CheckableChip';
import { useReminderSettingsStore } from '../../lib/store/reminderSettingsStore';
import { EditableChip } from '../UIParts/EditableChip';
import { useState } from 'react';
import { type Tag } from '../../lib/interfaces/tag';
import { modalStyles } from '../UIParts/TagRegisterModal';
import { useThemedStyle } from '../../hooks/useThemedStyle';
import { Feather } from '@expo/vector-icons';

const SettingsModalScreen = () => {
  const { tags, setTags } = useTagStore();

  const { reminderSettings, updateSetting } = useReminderSettingsStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [editTag, setEditTag] = useState<Tag | null>(null);
  const onTagPress = (tag: Tag) => {
    setEditTag(tag);
    setModalVisible(true);
  };

  const onPressEditTag = () => {
    if (editTag == null) {
      return;
    }
    const newTags = tags.map((tag) => {
      if (tag.id === editTag.id) {
        return editTag;
      }
      return tag;
    });
    setTags(newTags);
    setModalVisible(false);
  };

  const onPressDeleteTag = () => {
    if (editTag == null) {
      return;
    }
    Alert.alert(
      '削除の確認',
      'タグを削除してもよろしいですか？',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const newTags = tags.filter((tag) => {
              return tag.id !== editTag.id;
            });
            setTags(newTags);
            setModalVisible(false);
          },
        },
      ],
      { cancelable: false } // ダイアログ外をタップしても閉じない
    );
  };

  const { textInputStyle, buttonBackgroundColorStyle, viewBackgroundColorStyle } = useThemedStyle();

  return (
    <View style={localStyles.container}>
      <View style={localStyles.settingsContainer}>
        <Label text={'タグを編集する'} position={'left'} />
        <FlatList
          style={localStyles.tagList}
          data={tags}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 6 }}>
              <EditableChip
                key={`${item.id}-tag-chip`}
                label={item.name}
                onPress={() => {
                  onTagPress(item);
                }}
                color={'#DCEDC8'}
              />
            </View>
          )}
        />
      </View>
      <View style={localStyles.settingsContainer}>
        <Label text={'通知の設定'} position={'left'} />
        <View style={localStyles.reminderChips}>
          {reminderSettings.map((item) => (
            <CheckableChip
              key={`${item.label}-reminder-chip`}
              label={item.name}
              checked={item.checked}
              checkedColor={'#DCEDC8'}
              normalColor={'#FFF8E1'}
              onPress={() => {
                const updatedItemChecked = !item.checked;
                updateSetting(item.label, updatedItemChecked);
              }}
            />
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={modalStyles.centeredView}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <>
            <View style={modalStyles.modalBackground}></View>
            <View
              style={[modalStyles.modalView, viewBackgroundColorStyle]}
              onStartShouldSetResponder={() => true}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  padding: 5,
                }}
                onPress={onPressDeleteTag}
              >
                <Feather name="trash-2" size={24} color="red" />
              </TouchableOpacity>
              {editTag == null ? null : (
                <>
                  <Label text={'タグの名前を編集'} position={'left'} />

                  <TextInput
                    style={textInputStyle}
                    value={editTag.name}
                    placeholder={'タグを入力'}
                    onChangeText={(text: string) => {
                      setEditTag({ id: editTag.id, name: text });
                    }}
                  />
                  <Pressable
                    style={[modalStyles.button, buttonBackgroundColorStyle]}
                    onPress={onPressEditTag}
                  >
                    <Text style={modalStyles.textStyle}>タグを変更</Text>
                  </Pressable>
                </>
              )}
            </View>
          </>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  settingsContainer: {
    marginVertical: 16,
  },
  reminderChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
  },
  tagList: {
    flexGrow: 0,
    flexShrink: 1,
  },

  editModalContainer: {},
});

export { SettingsModalScreen };
