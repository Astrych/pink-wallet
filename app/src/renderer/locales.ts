
import i18n from "i18next";
import xhr from "i18next-xhr-backend";
import { reactI18nextModule } from "react-i18next";


function loadLocales(url, _, cb) {

    import(
        /* webpackChunkName: "languages" */
        /* webpackMode: "eager" */
        `../../assets/locales/${url}.json`
    )
    .then(locale => {
        cb(locale, { status: "200" });
    })
    .catch(() => {
        cb(null, { status: "404" });
    });
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
