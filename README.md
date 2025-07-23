# Vue3 Multilang Country Selector

A flexible and customizable multilingual country selector component for Vue 3 with TypeScript support.

English | [简体中文](./README.zh-CN.md)

## Features

- 🌍 Complete list of countries with flags and dial codes
- 🌐 **Internationalization (i18n)** - Support for 15+ languages
- 🔍 Searchable dropdown with customizable filter function
- 🎨 Multiple sizes (small, medium, large)
- 🎯 TypeScript support with full type definitions
- ♿ Accessible design with keyboard navigation
- 🎪 Customizable appearance and behavior
- 📱 Mobile-friendly responsive design
- 🧪 Comprehensive test coverage

## Installation

```bash
npm install vue3-multilang-country-selector
```

## Basic Usage

```vue
<template>
  <div>
    <CountrySelector 
      v-model="selectedCountry"
      @change="onCountryChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CountrySelector } from 'vue3-multilang-country-selector'
import type { Country } from 'vue3-multilang-country-selector'
import 'vue3-multilang-country-selector/lib/style.css'

const selectedCountry = ref('')

const onCountryChange = (country: Country | null) => {
  console.log('Selected country:', country)
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Selected value (country code or dial code based on `type`) |
| `type` | `'country' \| 'phone'` | `'country'` | Determines what value is returned: country code (e.g., 'US') or dial code without + (e.g., '1') |
| `placeholder` | `string` | `'Select a country'` | Placeholder text when no country is selected |
| `searchable` | `boolean` | `true` | Enable/disable search functionality |
| `showFlag` | `boolean` | `true` | Show/hide country flags |
| `showDialCode` | `boolean` | `false` | Show/hide country dial codes |
| `disabled` | `boolean` | `false` | Disable the component |
| `clearable` | `boolean` | `true` | Show/hide clear button |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `countries` | `Country[]` | `defaultCountries` | Custom list of countries |
| `filterFunction` | `(country: Country, query: string) => boolean` | `undefined` | Custom filter function |
| `language` | `SupportedLanguage` | `'en'` | Display language for country names and UI |
| `searchPlaceholder` | `string` | `undefined` | Custom search input placeholder |
| `noResultsText` | `string` | `undefined` | Custom no results message |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when selected country changes (value depends on `type` prop) |
| `change` | `Country \| null` | Emitted when selected country changes |
| `search` | `string` | Emitted when search query changes |

## Types

```typescript
interface Country {
  code: string        // ISO 3166-1 alpha-2 country code
  name: string        // Country name
  flag?: string       // Country flag emoji
  dialCode?: string   // Country dial code
}
```

## Supported Languages

The component supports the following languages:

- `en` - English
- `zh-CN` - 简体中文 (Simplified Chinese)
- `cht` - 繁體中文 (Traditional Chinese)
- `fr` - Français (French)
- `de` - Deutsch (German)
- `it` - Italiano (Italian)
- `ko` - 한국어 (Korean)
- `ja` - 日本語 (Japanese)
- `ro` - Română (Romanian)
- `es` - Español (Spanish)
- `tk` - Türkçe (Turkish)
- `pt` - Português (Portuguese)
- `el` - Ελληνικά (Greek)
- `vi` - Tiếng Việt (Vietnamese)
- `local` - Local names (uses native country names)

## Examples

### Internationalization

```vue
<template>
  <div>
    <!-- Chinese (Simplified) -->
    <CountrySelector
      v-model="selectedCountry"
      language="zh-CN"
    />

    <!-- Japanese -->
    <CountrySelector
      v-model="selectedCountry"
      language="ja"
    />

    <!-- French -->
    <CountrySelector
      v-model="selectedCountry"
      language="fr"
    />
  </div>
</template>
```

### Return Type Options

```vue
<template>
  <div>
    <!-- Default: Returns country code (e.g., 'US', 'CN') -->
    <CountrySelector
      v-model="selectedCountryCode"
      type="country"
      :show-dial-code="true"
    />

    <!-- Returns dial code without + (e.g., '1', '86') -->
    <CountrySelector
      v-model="selectedDialCode"
      type="phone"
      :show-dial-code="true"
    />
  </div>
</template>

<script setup lang="ts">
const selectedCountryCode = ref('') // Will be 'US', 'CN', etc.
const selectedDialCode = ref('')    // Will be '1', '86', etc.
</script>
```

### With Dial Codes

```vue
<CountrySelector
  v-model="selectedCountry"
  :show-dial-code="true"
/>
```

### Custom Size

```vue
<CountrySelector 
  v-model="selectedCountry"
  size="large"
/>
```

### Without Search

```vue
<CountrySelector 
  v-model="selectedCountry"
  :searchable="false"
/>
```

### Custom Countries List

```vue
<template>
  <CountrySelector 
    v-model="selectedCountry"
    :countries="customCountries"
  />
</template>

<script setup lang="ts">
import type { Country } from 'vue3-multilang-country-selector'

const customCountries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' }
]
</script>
```

### Custom Filter Function

```vue
<CountrySelector 
  v-model="selectedCountry"
  :filter-function="customFilter"
/>

<script setup lang="ts">
const customFilter = (country: Country, query: string) => {
  return country.name.toLowerCase().includes(query.toLowerCase()) ||
         country.code.toLowerCase().includes(query.toLowerCase())
}
</script>
```

## Internationalization Utilities

The package also exports utility functions for internationalization:

```typescript
import {
  getLocalizedCountries,
  getLocalizedUIText,
  getSupportedLanguages,
  isLanguageSupported
} from 'vue3-multilang-country-selector'

// Get localized country list
const chineseCountries = getLocalizedCountries('zh-CN')

// Get localized UI text
const placeholder = getLocalizedUIText('placeholder', 'fr') // "Sélectionner un pays"

// Get all supported languages
const languages = getSupportedLanguages()

// Check if language is supported
const isSupported = isLanguageSupported('zh-CN') // true
```

## Global Registration

```typescript
import { createApp } from 'vue'
import Vue3MultilangCountrySelector from 'vue3-multilang-country-selector'

const app = createApp(App)
app.use(Vue3MultilangCountrySelector)
```

Then use in templates:

```vue
<template>
  <CountrySelector v-model="selectedCountry" />
</template>
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Run tests
npm run test

# Run linting
npm run lint
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
