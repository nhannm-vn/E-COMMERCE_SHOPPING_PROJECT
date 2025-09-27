import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    // gọi là namespace
    translation: {
      'all categories': 'All Categories'
    }
  },
  vi: {
    translation: {
      'all categories': 'Tất cả danh mục'
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
