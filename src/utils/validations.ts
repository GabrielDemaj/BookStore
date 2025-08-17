import { t } from 'i18next';
import * as yup from 'yup';
export const loginSchema = yup.object().shape({
  name: yup.string().required(t('pleaseEnterValidName')),
  email: yup
    .string()
    .email(t('emailMustBeValid'))
    .required(t('pleaseEnterValidEmail')),
  password: yup
    .string()
    .min(8, t('thePasswordMustNotHavelessThanEight'))
    .max(32, t('thePasswordMustNotBeLongerThan'))
    .required(t('pleaseEnterValidPassword')),
});
export const createBookSchema = yup.object().shape({
  title: yup.string().required(t('pleaseEnterValidTitle')),
  author: yup.string().required(t('pleaseEnterValidAuthor')),
  description: yup.string().nullable(),
  price: yup
    .number()
    .typeError(t('priceMustBeANumber'))
    .positive(t('priceMustBePositive')),
  image_url: yup.string().url(t('pleaseEnterValidImageUrl')),
});
