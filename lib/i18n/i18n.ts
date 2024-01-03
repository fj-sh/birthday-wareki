import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

type TranslationKeys = 'friendList.addFriend';
export const i18n = new I18n({
  en: {
    friendList: {
      addFriend: 'Add Friend',
    },
  },
  ja: {
    friendList: {
      addFriend: '友達を追加',
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
