import { TextInput, StyleSheet } from 'react-native';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: SearchInputProps) => {
  return <TextInput />;
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
