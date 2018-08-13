
import i18n from "i18next";
import xhr from "i18next-xhr-backend";
import { reactI18nextModule } from "react-i18next";


async function loadLocales(url, _, cb) {

    try {
        const locale = await import(
            /* webpackChunkName: "languages", webpackMode: "eager" */
            `@assets/locales/${url}.json`
        );

        cb(locale, { status: "200" });

    } catch (err) {
        cb(null, { status: "404" });
    }
}

i18n
.use(xhr)
.use(reactI18nextModule)
.init({
    fallbackLng: "en",
    ns: ["main", "splash"],
    defaultNS: "main",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true
    },
    backend: {
      loadPath: "{{ns}}/{{lng}}",
      parse: data => data,
      ajax: loadLocales
    }
});

export default i18n;
