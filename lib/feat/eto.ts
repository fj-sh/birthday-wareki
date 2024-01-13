type Eto = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

export function getEto(birthYear: number): Eto {
  const baseYear = 1900; // 1900年は子年とする
  const etoList: Eto[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  // 入力検証: birthYear が正の整数であることを確認
  if (!Number.isInteger(birthYear) || birthYear < 0) {
    throw new Error('Invalid birth year. Please enter a positive integer.');
  }

  const etoIndex = (birthYear - baseYear) % 12;
  return etoList[etoIndex];
}
