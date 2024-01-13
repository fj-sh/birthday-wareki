type Eto =
  | '子(ね) 🐭'
  | '丑(うし) 🐮'
  | '寅(とら) 🐯'
  | '卯(う) 🐰'
  | '辰(たつ) 🐲'
  | '巳(み) 🐍'
  | '午(うま) 🐴'
  | '未(ひつじ) 🐏'
  | '申(さる) 🐵'
  | '酉(とり) 🐔'
  | '戌(いぬ) 🐶'
  | '亥(い) 🐗';

export const getEtoByString = (year: string): string => {
  // 空文字が渡された場合は、デフォルト値として1月1日を設定
  const parsedYear = parseInt(year, 10);

  return getEto(parsedYear);
};

export function getEto(birthYear: number): Eto {
  const baseYear = 1900; // 1900年は子年とする
  const etoList: Eto[] = [
    '子(ね) 🐭',
    '丑(うし) 🐮',
    '寅(とら) 🐯',
    '卯(う) 🐰',
    '辰(たつ) 🐲',
    '巳(み) 🐍',
    '午(うま) 🐴',
    '未(ひつじ) 🐏',
    '申(さる) 🐵',
    '酉(とり) 🐔',
    '戌(いぬ) 🐶',
    '亥(い) 🐗',
  ];
  // 入力検証: birthYear が正の整数であることを確認
  if (!Number.isInteger(birthYear) || birthYear < 0) {
    throw new Error('Invalid birth year. Please enter a positive integer.');
  }

  const etoIndex = (birthYear - baseYear) % 12;
  return etoList[etoIndex];
}
