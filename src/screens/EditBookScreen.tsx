import Button from '@components/Button';
import Divider from '@components/Divider';
import Textinput from '@components/TextInput';
import { useStyles } from '@hooks/useStyles';
import { useBooks } from '@store/useBooks';
import { createBookSchema } from '@utils/validations';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Alert, Keyboard, Modal, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { shallow } from 'zustand/shallow';
import TrashIcon from '@icons/trash.svg';
import useTheme from '@hooks/useTheme';
import { useState } from 'react';
import Text from '@components/Text';

type Props = {};

const EditBookScreen = (props: Props) => {
  const { t } = useTranslation();
  const { loading, editBook, singleBook, deleteBook } = useBooks(
    state => state,
    shallow,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      title: singleBook?.title || '',
      author: singleBook?.author || '',
      description: singleBook?.description || '',
      price: String(singleBook?.price) || '',
      image_url: singleBook?.image_url || '',
    },
    validationSchema: createBookSchema,
    onSubmit: async values => {
      let data = { ...values, price: Number(values.price), id: singleBook?.id };
      console.log('data', data);
      editBook(data);
    },
  });
  const handleDelete = () => {
    deleteBook(singleBook?.id);
  };

  const showDeleteAlert = (onConfirm: () => void) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Delete cancelled'),
        },
        {
          text: 'Delete',
          style: 'destructive', // Red color for destructive action
          onPress: onConfirm, // Callback for confirming deletion
        },
      ],
      {
        cancelable: true, //
        onDismiss: () => console.log('Alert dismissed'),
      },
    );
  };

  const s = useStyles(theme => ({
    container: {
      flex: 1,
      paddingVertical: 20,
    },

    btn: {
      width: theme.percentWidth(30),
      height: 40,
    },
    delete: {
      backgroundColor: theme.palette.error,
      width: theme.percentWidth(30),
      height: 40,
    },
    aligner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
            errorMessage={String(formik?.errors.author)}
          />
          <Divider />
          <Textinput
            placeholder={t('description')}
            text={t('description')}
            value={formik?.values.description}
            setValue={formik?.handleChange('description')}
            error={formik?.touched.description && formik?.errors.description}
            errorMessage={String(formik?.errors.description)}
          />
          <Divider />
          <Textinput
            placeholder={t('price')}
            text={t('price')}
            value={formik?.values.price}
            setValue={formik?.handleChange('price')}
            error={formik?.touched.price && formik?.errors.price}
            errorMessage={String(formik?.errors.price)}
          />
          <Divider />
          <Textinput
            placeholder={t('image_url')}
            text={t('image_url')}
            value={formik?.values.image_url}
            setValue={formik?.handleChange('image_url')}
            error={formik?.touched.image_url && formik?.errors.image_url}
            errorMessage={String(formik?.errors.image_url)}
          />
          <Divider />
          <View style={s.aligner}>
            <Button
              text={t('edit')}
              style={s.btn}
              onPress={formik.submitForm}
              loading={loading}
            />
            <Button
              text={t('delete')}
              style={s.delete}
              loading={loading}
              onPress={() => showDeleteAlert(handleDelete)}
              startIcon={
                <TrashIcon
                  fill={theme.palette.white}
                  stroke={theme.palette.white}
                  width={20}
                  height={20}
                />
              }
            />
          </View>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default EditBookScreen;
