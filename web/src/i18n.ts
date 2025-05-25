import { createI18n } from "vue-i18n";
import enTranslation from "./translations/en";
import plTranslation from "./translations/pl";

export default createI18n({
  legacy: false,
  locale: "pl",
  fallbackLocale: "en",
  messages: {
    en: enTranslation,
    pl: plTranslation,
  },
});
