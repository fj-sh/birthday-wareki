export const trimText = (text: string, length: number): string => {
  if (text.length > length) {
    const result = `${text.slice(0, length)}`;
    return result;
  }

  return text;
};
