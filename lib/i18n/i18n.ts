import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

type TranslationKeys = 'friendList.addFriend';
export const i18n = new I18n({
  en: {
    birthdayList: {
      addBirthday: 'Add Birthday',
      title: 'Birthday List',
    },
    register: {
      add: 'Add Birthday',
      edit: 'Edit Birthday',
      save: 'Save',
    },
  },
  ja: {
    birthdayList: {
      addBirthday: '誕生日を追加',
      title: '誕生日一覧',
    },
    register: {
      add: '誕生日を追加',
      edit: '誕生日を編集',
      save: '保存',
    },
  },
});

// Set the locale once at the beginning of your app.
export const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage;

i18n.enableFallback = true;
i18n.defaultLocale = 'ja';

export function translate(key: TranslationKeys): string {
  return i18n.t(key);
}
