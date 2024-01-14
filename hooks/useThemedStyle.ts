import { StyleSheet, useColorScheme } from 'react-native';

const useThemedStyle = () => {
  const colorScheme = useColorScheme();
  const labelTextStyle = [
    localStyles.labelText,
    colorScheme === 'dark' && localStyles.darkLabelText,
  ];

  const viewBackgroundColorStyle = [
    localStyles.viewBackgroundColor,
    colorScheme === 'dark' && localStyles.darkViewBackgroundColor,
  ];

  const textInputStyle = [
    localStyles.textInput,
    colorScheme === 'dark' && localStyles.darkTextInput,
  ];

  const memoInputStyle = [
    localStyles.textMemoInput,
    colorScheme === 'dark' && localStyles.darkTextInput,
  ];

  const buttonBackgroundColorStyle = [
    localStyles.buttonBackgroundColor,
    colorScheme === 'dark' && localStyles.darkButtonBackgroundColor,
  ];

  return {
    viewBackgroundColorStyle,
    labelTextStyle,
    textInputStyle,
    buttonBackgroundColorStyle,
    memoInputStyle,
  };
};

const localStyles = StyleSheet.create({
  labelText: {
    fontSize: 16,
  },
  darkLabelText: {
    color: '#fff',
  },

  viewBackgroundColor: {
    backgroundColor: '#fff',
  },

  darkViewBackgroundColor: {
    backgroundColor: '#212121',
  },

  buttonBackgroundColor: {
    backgroundColor: '#4A9AE9',
  },
  darkButtonBackgroundColor: {
    backgroundColor: '#455A64',
  },

  textInput: {
    height: 40,
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },

  darkTextInput: {
    backgroundColor: '#333',
    color: '#fff',
  },

  textMemoInput: {
    minHeight: 100,
    height: 'auto',
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
});

export { useThemedStyle };
