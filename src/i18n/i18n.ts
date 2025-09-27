import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: {
    // gọi là namespace
    translation: {
      'all categories': 'All Categories',
      'filter search': 'Filter Search'
    }
  },
  vi: {
    translation: {
      'all categories': 'Tất cả danh mục',
      'filter search': 'Bộ lọc tìm kiếm'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
