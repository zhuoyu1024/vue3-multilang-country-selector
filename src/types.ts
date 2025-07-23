export interface Country {
  code: string
  name: string
  flag?: string
  dialCode?: string
}

export type SupportedLanguage =
  | 'en'
  | 'zh-CN'
  | 'cht'
  | 'fr'
  | 'de'
  | 'it'
  | 'ko'
  | 'ja'
  | 'ro'
  | 'es'
  | 'tk'
  | 'pt'
  | 'el'
  | 'vi'
  | 'local'

export interface CountrySelectorProps {
  modelValue?: string
  placeholder?: string
  searchable?: boolean
  showFlag?: boolean
  showDialCode?: boolean
  disabled?: boolean
  clearable?: boolean
  size?: 'small' | 'medium' | 'large'
  countries?: Country[]
  filterFunction?: (country: Country, query: string) => boolean
  language?: SupportedLanguage
  searchPlaceholder?: string
  noResultsText?: string
  type?: 'phone' | 'country'
}

export interface CountrySelectorEmits {
  'update:modelValue': [value: string]
  'change': [country: Country | null]
  'search': [query: string]
}
