import Button from '@components/Button';
import Divider from '@components/Divider';
import Textinput from '@components/TextInput';
import { useStyles } from '@hooks/useStyles';
import { useBooks } from '@store/useBooks';
import { createBookSchema } from '@utils/validations';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Keyboard, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { shallow } from 'zustand/shallow';

type Props = {};

const CreateBookScreen = (props: Props) => {
  const { t } = useTranslation();
  const { loading, createBook } = useBooks(state => state, shallow);
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      description: '',
      price: '',
      image_url: '',
    },
    validationSchema: createBookSchema,
    onSubmit: async values => {
      let data = { ...values, price: Number(values.price) };
      console.log('data', data);
      createBook(data);
    },
  });
  const s = useStyles(theme => ({
    container: {
      flex: 1,
      paddingVertical: 20,
    },

    btn: {
      marginBottom: theme.insets.bottom,
      width: theme.percentWidth(30),
      height: 40,
    },
  }));
  return (
    <KeyboardAwareScrollView>
      <Pressable style={{ flex: 1, padding: 20 }} onPress={Keyboard.dismiss}>
        <View style={s.container}>
          <Textinput
            placeholder={t('title')}
            text={t('title')}
            value={formik?.values.title}
            setValue={formik?.handleChange('title')}
            error={formik?.touched.title && formik?.errors.title}
            errorMessage={formik?.errors.title as string}
          />
          <Divider />
          <Textinput
            placeholder={t('author')}
            text={t('author')}
            value={formik?.values.author}
            setValue={formik?.handleChange('author')}
            error={formik?.touched.author && formik?.errors.author}
            errorMessage={formik?.errors.author}
          />
          <Divider />
          <Textinput
            placeholder={t('description')}
            text={t('description')}
            value={formik?.values.description}
            setValue={formik?.handleChange('description')}
            error={formik?.touched.description && formik?.errors.description}
            errorMessage={formik?.errors.description}
          />
          <Divider />
          <Textinput
            placeholder={t('price')}
            text={t('price')}
            value={formik?.values.price}
            setValue={formik?.handleChange('price')}
            error={formik?.touched.price && formik?.errors.price}
            errorMessage={formik?.errors.price}
          />
          <Divider />
          <Textinput
            placeholder={t('image_url')}
            text={t('image_url')}
            value={formik?.values.image_url}
            setValue={formik?.handleChange('image_url')}
            error={formik?.touched.image_url && formik?.errors.image_url}
            errorMessage={formik?.errors.image_url}
          />
          <Divider />
          <Button
            text={t('create')}
            style={s.btn}
            onPress={formik.submitForm}
            loading={loading}
          />
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default CreateBookScreen;
