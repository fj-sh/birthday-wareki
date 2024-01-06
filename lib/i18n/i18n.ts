import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

type TranslationKeys = 'friendList.addFriend';
export const i18n = new I18n({
  en: {
    friendList: {
      addFriend: 'Add Friend',
      title: 'Friend List',
    },
    register: {
      add: 'Add Friend',
      edit: 'Edit Friend',
      save: 'Save',
    },
  },
  ja: {
    friendList: {
      addFriend: '友達を追加',
      title: '友達一覧',
    },
    register: {
      add: '友達を追加',
      edit: '友達を編集',
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
