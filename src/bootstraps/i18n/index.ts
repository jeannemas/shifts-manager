import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { getUserLocale } from '@/helpers';

import english from './english';

Vue.use(VueI18n);

const translations: VueI18n.LocaleMessages = {
  // English
  en: english,
};

export default new VueI18n({
  locale: getUserLocale(), // Locale from user will be injected on auth
  fallbackLocale: 'en',
  messages: translations,
});
