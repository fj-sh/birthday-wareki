import Color from 'color';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const Palette = {
  primary: '#4A9AE9',
  background: '#17202A',
  card: Color('#17202A').lighten(0.15).hex(),
  border: Color('#FFFFFF').darken(0.65).hex(),
  text: '#FFFFFF',
};
export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
