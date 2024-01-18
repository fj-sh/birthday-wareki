import { Text, View } from '../Themed';

import { FlatList, StyleSheet } from 'react-native';
import { useTagStore } from '../../lib/store/tagStore';
import { Label } from '../UIParts/Label';
import { CheckableChip } from '../UIParts/CheckableChip';
import { useReminderSettingsStore } from '../../lib/store/reminderSettingsStore';

const SettingsModalScreen = () => {
  const { tags, setTags } = useTagStore();
  const { reminderSettings, updateSetting } = useReminderSettingsStore();

  return (
    <View style={localStyles.container}>
      <View style={localStyles.settingsContainer}>
        <Label text={'タグを編集する'} position={'left'} />
        <FlatList
          style={localStyles.tagList}
          data={tags}
          horizontal={true}
          renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
        />
      </View>
      <View style={localStyles.settingsContainer}>
        <Label text={'通知の設定'} position={'left'} />
        <View style={localStyles.reminderChips}>
          {reminderSettings.map((item) => (
            <CheckableChip
              key={item.label}
              label={item.name}
              checked={item.checked}
              checkedColor={'#DCEDC8'}
              normalColor={'#FFF8E1'}
              onPress={() => {
                updateSetting(item.label, !item.checked);
              }}
            />
          ))}
        </View>
      </View>
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
});

export { SettingsModalScreen };
