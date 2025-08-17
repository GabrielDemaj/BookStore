import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import { useStyles } from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import ArrowLeft from '@icons/back.svg';
import EditIcon from '@icons/edit.svg';
import { useAuth } from '@store/useAuth';
import { useBooks } from '@store/useBooks';
import { useBookStoreNavigation } from '@utils/useBookStoreNavigation';
import { percentWidth } from '@variables/index';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { shallow } from 'zustand/shallow';

type Props = {};

const BookScreen = (props: Props) => {
  const { goBack, navigate } = useBookStoreNavigation();

  const theme = useTheme();
  const { singleBookRefreshing, getSingleBook, singleBook } = useBooks(
    state => state,
    shallow,
  );
  const book = singleBook;
  const { isAuthenticated } = useAuth(state => state, shallow);

  const onEditPress = () => {
    navigate('EditBookScreen');
  };

  const s = useStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.palette.background,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    left: {
      top: 30,
      position: 'absolute',
      backgroundColor: theme.palette.primary,
      zIndex: 1000,
      borderRadius: 2000,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },

    cover: {
      width: percentWidth(100),
      height: percentWidth(100) * 1.5,
      alignSelf: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginBottom: 20,
      resizeMode: 'cover',
    },
    title: {
      fontSize: 22,
      fontFamily: theme.fonts.bold,
      marginBottom: 5,
    },
    author: {
      fontSize: 16,
      fontFamily: theme.fonts.regularItalic,
      marginBottom: 10,
    },
    price: {
      fontSize: 18,
      fontFamily: theme.fonts.semiBold,
      color: theme.palette.primary,
      marginBottom: 20,
    },
    description: {
      fontSize: 14,
      fontFamily: theme.fonts.regular,
      lineHeight: 20,
      marginBottom: 30,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
    align: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  }));

  return (
    <ScrollView
      style={s.container}
      refreshControl={
        <RefreshControl
          refreshing={singleBookRefreshing}
          tintColor={theme.palette.black}
          onRefresh={() => getSingleBook(book.id)}
        />
      }
      indicatorStyle={theme.isDarkMode ? 'white' : 'black'}
    >
      <TouchableOpacity style={s.left} onPress={goBack}>
        <ArrowLeft fill="white" stroke={'white'} color={'white'} />
      </TouchableOpacity>
      {isAuthenticated && (
        <TouchableOpacity style={[s.left, { right: 0 }]} onPress={onEditPress}>
          <EditIcon fill="white" stroke={'white'} color={'white'} />
        </TouchableOpacity>
      )}
      {book.image_url ? (
        <Image source={{ uri: book.image_url }} style={s.cover} />
      ) : (
        <Image source={require('@assets/img.png')} style={s.cover} />
      )}

      <View style={s.align}>
        <Text style={s.title}>{book.title}</Text>
        <Text style={s.price}>{book.price}$</Text>
      </View>
      <Text style={s.author}>{book.author}</Text>

      <Text style={s.description}>{book.description}</Text>
    </ScrollView>
  );
};

export default BookScreen;
