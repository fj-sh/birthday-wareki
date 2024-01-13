type Zodiac =
  | '牡羊座'
  | '牡牛座'
  | '双子座'
  | '蟹座'
  | '獅子座'
  | '乙女座'
  | '天秤座'
  | '蠍座'
  | '射手座'
  | '山羊座'
  | '水瓶座'
  | '魚座';

function getZodiac(birthDate: Date): Zodiac {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  let zodiac: Zodiac;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    zodiac = '牡羊座';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    zodiac = '牡牛座';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    zodiac = '双子座';
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    zodiac = '蟹座';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    zodiac = '獅子座';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    zodiac = '乙女座';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
    zodiac = '天秤座';
  } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
    zodiac = '蠍座';
  } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
    zodiac = '射手座';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    zodiac = '山羊座';
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    zodiac = '水瓶座';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    zodiac = '魚座';
  } else {
    console.error(`month: ${month}, day: ${day}, ${birthDate.toISOString()}`);
    throw new Error('Invalid date.');
  }

  return zodiac;
}

export { getZodiac };
