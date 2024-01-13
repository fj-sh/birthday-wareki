type Wareki = '明治以前' | '明治' | '大正' | '昭和' | '平成' | '令和';

export const getWarekiByString = (year: string, month: string, day: string): string => {
  // 空文字が渡された場合は、デフォルト値として1月1日を設定
  const parsedYear = parseInt(year, 10);
  const parsedMonth = month === '' ? 0 : parseInt(month, 10) - 1; // 月は0から始まる
  const parsedDay = day === '' ? 1 : parseInt(day, 10);

  const birthDate = new Date(parsedYear, parsedMonth, parsedDay);

  return getWareki(birthDate);
};
const getWareki = (birthDate: Date): string => {
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1; // 月は0から始まるので+1
  const birthDay = birthDate.getDate();
  let wareki: Wareki;
  let warekiYear: number;

  if (birthYear > 2019 || (birthYear === 2019 && birthMonth >= 5)) {
    // 令和は2019年5月1日から開始
    wareki = '令和';
    warekiYear = birthYear - 2018;
  } else if (
    (birthYear === 2019 && birthMonth < 5) ||
    birthYear > 1989 ||
    (birthYear === 1989 && birthMonth >= 1 && birthDay >= 8)
  ) {
    // 平成は1989年1月8日から2019年4月30日まで
    wareki = '平成';
    warekiYear = birthYear - 1988;
  } else if (
    (birthYear === 1989 && birthMonth === 1 && birthDay < 8) ||
    birthYear > 1926 ||
    (birthYear === 1926 && birthMonth === 12 && birthDay >= 25)
  ) {
    // 昭和は1926年12月25日から1989年1月7日まで
    wareki = '昭和';
    warekiYear = birthYear - 1925;
  } else if (
    (birthYear === 1926 && birthMonth < 12) ||
    birthYear > 1912 ||
    (birthYear === 1912 && birthMonth >= 7 && birthDay >= 30)
  ) {
    // 大正は1912年7月30日から1926年12月24日まで
    wareki = '大正';
    warekiYear = birthYear - 1911;
  } else if (
    birthYear >= 1868 &&
    (birthYear < 1912 ||
      (birthYear === 1912 && birthMonth < 7) ||
      (birthYear === 1912 && birthMonth === 7 && birthDay < 30))
  ) {
    // 明治は1868年10月23日から1912年7月29日まで
    wareki = '明治';
    warekiYear = birthYear - 1867;
  } else {
    wareki = '明治以前';
    warekiYear = 0;
  }

  return `${wareki}${warekiYear}年`;
};

export { getWareki };
