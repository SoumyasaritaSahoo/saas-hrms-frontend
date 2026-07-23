export const i18n = {
  defaultLocale: 'en',

  locales: ['en', 'hi'],

  langDirection: {
    en: 'ltr',
    hi: 'ltr',
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
