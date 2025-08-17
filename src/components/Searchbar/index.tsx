import Button from '@components/Button';
import TouchableOpacity from '@components/TouchableOpacity';
import { useStyles } from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import SearchIcon from '@icons/search.svg';
import XIcon from '@icons/x.svg';
import { useBooks } from '@store/useBooks';
import { useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { shallow } from 'zustand/shallow';

const Search = () => {
  const { searchBooks, getBooks, search } = useBooks(
    state => ({
      searchBooks: state.searchBooks,
      search: state.search,
      getBooks: state.getBooks,
    }),
    shallow,
  );

  const [localSearch, setLocalSearch] = useState(search || '');
  const theme = useTheme();

  const s = useStyles(theme => ({
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.palette.gray,
      borderRadius: 10,
      height: 40,
    },
    icon: { width: 40, justifyContent: 'center', alignItems: 'center' },
    input: { flex: 1 },
    btn: { paddingHorizontal: 10 },
    textStyles: { fontSize: 15 },
  }));

  const clearSearch = () => {
    setLocalSearch('');
    getBooks(1, 20); // Fallback to initial list
  };

  const handleSearchButton = () => {
    const query = localSearch.trim();
    if (query.length > 0) {
      searchBooks(query, 1, 20);
    } else {
      getBooks(1, 20);
    }
  };

  // Keep input in sync with store search (optional)
  useEffect(() => {
    setLocalSearch(search || '');
  }, [search]);

  return (
    <View style={s.container}>
      {localSearch.length > 0 ? (
        <TouchableOpacity style={s.icon} onPress={clearSearch}>
          <XIcon fill={theme.palette.primary} width={20} height={20} />
        </TouchableOpacity>
      ) : (
        <View style={s.icon}>
          <SearchIcon fill={theme.palette.primary} width={20} height={20} />
        </View>
      )}

      <TextInput
        placeholder="Search books"
        value={localSearch}
        onChangeText={setLocalSearch}
        style={s.input}
        keyboardType="web-search"
        placeholderTextColor={theme.palette.placeholder}
      />

      <Button
        text="Search"
        onPress={handleSearchButton}
        style={s.btn}
        textStyles={s.textStyles}
      />
    </View>
  );
};

export default Search;
