import Button from '@components/Button';
import Loader from '@components/Loader';
import SearchBar from '@components/Searchbar';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import { useStyles } from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import SettingsIcon from '@icons/settings.svg';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@store/useAuth';
import { useBooks } from '@store/useBooks';
import { useBookStoreNavigation } from '@utils/useBookStoreNavigation';
import { percentHeight, percentWidth } from '@variables/index';
import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, View } from 'react-native';
import { shallow } from 'zustand/shallow';

type Props = {};
const BookItem = ({
  item,
  index,
  onPress,
  styles,
}: {
  item: any;
  index: number;
  onPress: () => void;
  styles: any;
}) => {
  const translateX = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0, // Slide to original position
      tension: 65, // Controls speed
      friction: 7, // Controls bounciness
      delay: index * 100, // Stagger animation
      useNativeDriver: true, // Native driver for performance
    }).start();
  }, [translateX, index]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        index === 0 && { marginTop: 20 },
        { transform: [{ translateX }] },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.img} />
        ) : (
          <Image source={require('@assets/img.png')} style={styles.img} />
        )}
        <View style={styles.card}>
          <View style={styles.align}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>{item.price}$</Text>
          </View>
          <Text style={styles.author}>{item.author}</Text>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
const Home = (props: Props) => {
  const { navigate } = useBookStoreNavigation();
  const { books, refreshing, getBooks, updateRandom, setSearch } = useBooks(
    state => state,
    shallow,
  );
  const { handleRefresh, user } = useAuth(state => state, shallow);
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useState(true);
  console.log('user', user);
  const handleNavigate = () => {
    navigate('Profile');
  };

  const onCardPress = (book: any) => {
    updateRandom({ singleBook: book });
    navigate('SingleBook', { book });
  };

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, []),
  );
  useEffect(() => {
    getBooks(1, 20);
    setInitialLoading(false);
  }, []);

  const s = useStyles(theme => ({
    container: {
      flex: 1,
      marginTop: theme.insets.top,
      backgroundColor: theme.palette.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontFamily: theme.fonts.bold,
      paddingLeft: 20,
    },
    icon: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    search: {
      backgroundColor: theme.palette.background,
    },
    list: {
      paddingHorizontal: 20,
    },
    wrapper: {
      borderWidth: 1,
      borderColor: theme.palette.border,
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: theme.palette.background,
      ...theme.shadows.standard,
      elevation: 1,
    },
    card: {
      padding: 10,
    },
    img: {
      width: percentWidth(100) - 40,
      height: 200,
    },
    align: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    name: {
      fontFamily: theme.fonts.bold,
      fontSize: 18,
    },
    price: {
      fontSize: 16,
      fontFamily: theme.fonts.semiBold,
    },
    author: { fontFamily: theme.fonts.regularItalic },
    description: {},
    inputContainerStyle: {
      borderRadius: 10,
      height: 40,
    },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: percentHeight(100) - theme.insets.top - 80,
    },
    emptyText: {
      fontSize: 24,
      fontFamily: theme.fonts.bold,
    },
    emptyBtn: {
      marginTop: 20,
      height: 40,
      paddingHorizontal: 15,
    },
  }));

  if (initialLoading) return <Loader />;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text testID="home_title" style={s.title}>
          {t('hello')} {user?.name ? user.name : ''}
        </Text>
        <TouchableOpacity
          testID="settings_button"
          style={s.icon}
          onPress={handleNavigate}
        >
          <SettingsIcon />
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        renderItem={({ item, index }) => (
          <BookItem
            item={item}
            index={index}
            onPress={() => onCardPress(item)}
            styles={s}
          />
        )}
        keyExtractor={item => String(item.id)}
        style={s.list}
        contentContainerStyle={{ paddingBottom: theme.insets.bottom + 20 }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        ListHeaderComponent={() => (
          <View style={s.search}>
            <SearchBar />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={s.empty}>
            <Text style={s.emptyText}>No books found</Text>
            <Button
              onPress={() => getBooks(1, 20)}
              text="Refresh"
              style={s.emptyBtn}
            />
          </View>
        )}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        refreshing={refreshing}
        onRefresh={() => {
          getBooks(1, 20);
          setSearch('');
        }}
        indicatorStyle={theme.isDarkMode ? 'white' : 'black'}
      />
    </View>
  );
};

export default Home;
