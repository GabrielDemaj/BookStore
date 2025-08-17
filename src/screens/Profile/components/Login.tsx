import Button from '@components/Button';
import Divider from '@components/Divider';
import Textinput from '@components/TextInput';
import { useStyles } from '@hooks/useStyles';
import { useAuth } from '@store/useAuth';
import { loginSchema } from '@utils/validations';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Keyboard, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { shallow } from 'zustand/shallow';

type Props = {};

const Login = (props: Props) => {
  const { authenticate, error, loading } = useAuth(state => state, shallow);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async values => {
      console.log('values', values);
      authenticate(values);
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
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={s.container}>
          <Textinput
            placeholder={t('name')}
            text={t('name')}
            value={formik?.values.name}
            setValue={formik?.handleChange('name')}
            error={formik?.touched.name && formik?.errors.name}
            errorMessage={formik?.errors.name as string}
          />
          <Divider />
          <Textinput
            placeholder={t('email')}
            text={t('email')}
            value={formik?.values.email}
            setValue={formik?.handleChange('email')}
            error={formik?.touched.email && (formik?.errors.email || error)}
            errorMessage={
              (formik?.touched.email && formik?.errors.email) || error
            }
            onSubmitEditing={formik.handleSubmit}
            keyboardType="email-address"
          />
          <Divider />
          <Textinput
            placeholder={t('password')}
            text={t('password')}
            secureTextEntry
            hasEye
            value={formik?.values.password}
            setValue={formik?.handleChange('password')}
            error={formik?.touched.password && formik?.errors.password}
            errorMessage={formik?.errors.password}
            onSubmitEditing={formik.handleSubmit}
          />
          <Divider />
          <Button
            text={t('login')}
            style={s.btn}
            onPress={formik.submitForm}
            loading={loading}
          />
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default Login;
