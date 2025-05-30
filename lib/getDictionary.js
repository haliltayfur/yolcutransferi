// /lib/getDictionary.js
export const getDictionary = async (locale) => {
  try {
    return require(`../locales/${locale}.json`);
  } catch (e) {
    return require(`../locales/tr.json`);
  }
};
