import type { App } from 'vue'
import CountrySelectorVue from './components/CountrySelector.vue'
import type { Country, CountrySelectorProps, CountrySelectorEmits, SupportedLanguage } from './types'
import { defaultCountries, getLocalizedCountries } from './data/countries'
import { getLocalizedUIText, getSupportedLanguages, isLanguageSupported } from './utils/i18n'

// Export the component - for <script setup> components, direct export works
export const CountrySelector = CountrySelectorVue
export { CountrySelectorVue as CountrySelectorComponent }

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
  app.component('CountrySelector', CountrySelectorVue)
}

// Default export for plugin usage
export default {
  install
}

// Auto-install when used via script tag (for Vue 3)
if (typeof window !== 'undefined') {
  const globalVue = (window as any).Vue
  if (globalVue && globalVue.createApp) {
    // Vue 3 global build - auto install is not needed for UMD
    // Users should manually register components or use the plugin
  }
}
