import Header from '@components/Header';
import Text from '@components/Text';
import { useStyles } from '@hooks/useStyles';
import { Image, View } from 'react-native';
import SettingsIcon from '@icons/settings.svg';
import { head } from 'lodash';
import TouchableOpacity from '@components/TouchableOpacity';
import { t } from 'i18next';
import { useBookStoreNavigation } from '@utils/useBookStoreNavigation';
import { useBooks } from '@store/useBooks';
import { shallow } from 'zustand/shallow';
import Button from '@components/Button';
import { FlatList } from 'react-native-gesture-handler';

type Props = {};

const Home = (props: Props) => {
  const { navigate } = useBookStoreNavigation();
  const { getBooks, books } = useBooks(state => state, shallow);

  const handleNavigate = () => {
    navigate('Profile');
  };

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
      fontSize: 20,
      fontFamily: theme.fonts.regular,
      paddingLeft: 20,
    },
    icon: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));

  const renderItem = (item: any) => {
    console.log('item', item);
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text>{item.description}</Text>
        <Text>{item.price}</Text>
        <Image
          source={{ uri: item.image_url }}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Hello Gabriel</Text>
        <TouchableOpacity style={s.icon} onPress={handleNavigate}>
          <SettingsIcon />
        </TouchableOpacity>
      </View>
      <Button onPress={() => getBooks(1, 10)} text="test" />
      <FlatList
        data={books}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default Home;
