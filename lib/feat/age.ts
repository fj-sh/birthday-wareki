export function createUTCDate(year: number, month: number, day: number): Date {
  // UTCに基づいた日付を作成する（月は0から始まるので、1を引く）
  return new Date(Date.UTC(year, month - 1, day));
}

export const getAgeByString = (year: string, month: string, day: string): string => {
  // 空文字が渡された場合は、デフォルト値として1月1日を設定
  const parsedYear = parseInt(year, 10);
  const parsedMonth = month === '' ? 0 : parseInt(month, 10) - 1; // 月は0から始まる
  const parsedDay = day === '' ? 1 : parseInt(day, 10);

  const birthDate = new Date(parsedYear, parsedMonth, parsedDay);
  return getAge(birthDate).toString();
};

export function getAge(birthday: Date): number {
  const today = new Date();
  const todayUTC = createUTCDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const birthYear = birthday.getUTCFullYear();
  const birthMonth = birthday.getUTCMonth();
  const birthDate = birthday.getUTCDate();

  let age = todayUTC.getFullYear() - birthYear;
  const m = todayUTC.getMonth() - birthMonth;

  if (m < 0 || (m === 0 && todayUTC.getDate() <= birthDate)) {
    age--;
  }

  return age;
}

export function getBirthYearByAge(age: number, birthMonth: string, birthDay: string): number {
  const today = new Date();
  const todayUTC = createUTCDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // 文字列から数値に変換
  const birthMonthNum = parseInt(birthMonth, 10) - 1; // 月は0から始まるため、1を引く
  const birthDayNum = parseInt(birthDay, 10);

  // 現在の年から年齢を引く
  let birthYear = todayUTC.getFullYear() - age;

  // 今年の誕生日がまだ来ていない場合、生まれ年を1つ減らす
  if (
    todayUTC.getMonth() < birthMonthNum ||
    (todayUTC.getMonth() === birthMonthNum && todayUTC.getDate() < birthDayNum)
  ) {
    birthYear--;
  }

  return birthYear;
}
