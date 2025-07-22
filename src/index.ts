import type { App } from 'vue'
import CountrySelector from './components/CountrySelector.vue'
import type { Country, CountrySelectorProps, CountrySelectorEmits, SupportedLanguage } from './types'
import { defaultCountries, getLocalizedCountries } from './data/countries'
import { getLocalizedUIText, getSupportedLanguages, isLanguageSupported } from './utils/i18n'

// Export the component
export { CountrySelector }

// Export types
export type { Country, CountrySelectorProps, CountrySelectorEmits, SupportedLanguage }

// Export data and utilities
export {
  defaultCountries,
  getLocalizedCountries,
  getLocalizedUIText,
  getSupportedLanguages,
  isLanguageSupported
}

// Plugin install function
export function install(app: App): void {
  app.component('CountrySelector', CountrySelector)
}

// Default export for plugin usage
export default {
  install
}

// Auto-install when used via script tag (for Vue 3)
if (typeof window !== 'undefined') {
  const globalVue = (window as any).Vue
  if (globalVue && globalVue.createApp) {
    // Vue 3 global build
    globalVue.use?.({ install })
  }
}
