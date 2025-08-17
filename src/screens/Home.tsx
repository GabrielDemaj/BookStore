import Loader from '@components/Loader';
import SearchBar from '@components/Searchbar';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import { useStyles } from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import SettingsIcon from '@icons/settings.svg';
import { useBooks } from '@store/useBooks';
import { useBookStoreNavigation } from '@utils/useBookStoreNavigation';
import { percentWidth } from '@variables/index';
import { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { Image, View, FlatList, Animated } from 'react-native';
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
  const translateX = useRef(new Animated.Value(100)).current; // Start 100px to the right

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
        { transform: [{ translateX }] }, // Apply animation
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
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useState(true);

  const handleNavigate = () => {
    navigate('Profile');
  };

  const onCardPress = (book: any) => {
    updateRandom({ singleBook: book });
    navigate('SingleBook', { book });
  };

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
  }));

  const renderItem = (item: any, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => onCardPress(item)}
        style={[s.wrapper, index === 0 && { marginTop: 20 }]}
      >
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={s.img} />
        ) : (
          <Image source={require('@assets/img.png')} style={s.img} />
        )}
        <View style={s.card}>
          <View style={s.align}>
            <Text style={s.name}>{item.title}</Text>
            <Text style={s.price}>{item.price}$</Text>
          </View>
          <Text style={s.author}>{item.author}</Text>
          {item.description ? (
            <Text style={s.description}>{item.description}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  if (initialLoading) return <Loader />;

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>{t('hello')} Gabriel</Text>
        <TouchableOpacity style={s.icon} onPress={handleNavigate}>
          <SettingsIcon />
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        // renderItem={({ item, index }) => renderItem(item, index)}
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
