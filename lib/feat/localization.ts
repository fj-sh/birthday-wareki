import { getLocales } from 'expo-localization';

export const getLocale = (): string => {
  const locales = getLocales();
  console.log(locales);
  return locales[0].languageCode;
};

export const getRegionCode = (): string | null => {
  const locales = getLocales();

  return locales[0].regionCode;
};
