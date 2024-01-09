import * as Localization from 'expo-localization';
export const monthForLocale = (
  monthNumber: number,
  monthFormat: 'long' | 'short' | 'narrow' = 'short'
): string => {
  const currentYear = new Date().getFullYear();
  const monthIndex = monthNumber - 1;
  const localeName = Localization.locale;
  const formatter = new Intl.DateTimeFormat(localeName, { month: monthFormat });
  return formatter.format(new Date(Date.UTC(currentYear, monthIndex)));
};
