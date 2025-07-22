import type { App, DefineComponent } from 'vue';

// 基础类型定义
export interface Country {
  code: string;
  name: string;
  flag?: string;
  dialCode?: string;
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
  | 'local';

export interface CountrySelectorProps {
  modelValue?: string;
  placeholder?: string;
  searchable?: boolean;
  showFlag?: boolean;
  showDialCode?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  size?: 'small' | 'medium' | 'large';
  countries?: Country[];
  filterFunction?: (country: Country, query: string) => boolean;
  language?: SupportedLanguage;
  searchPlaceholder?: string;
  noResultsText?: string;
}

export interface CountrySelectorEmits {
  'update:modelValue': [value: string];
  'change': [country: Country | null];
  'search': [query: string];
}

// 组件声明
export declare const CountrySelector: DefineComponent<
  CountrySelectorProps,
  {},
  {},
  {},
  {},
  {},
  {},
  CountrySelectorEmits
>;

export declare const CountrySelectorComponent: DefineComponent<
  CountrySelectorProps,
  {},
  {},
  {},
  {},
  {},
  {},
  CountrySelectorEmits
>;

// 数据和工具函数
export declare const defaultCountries: Country[];

export declare function getLocalizedCountries(language?: SupportedLanguage): Country[];

export declare function getLocalizedUIText(key: string, language?: SupportedLanguage): string;

export declare function getSupportedLanguages(): SupportedLanguage[];

export declare function isLanguageSupported(language: string): language is SupportedLanguage;

// 插件安装函数
export declare function install(app: App): void;

// 默认导出（插件形式）
declare const _default: {
  install: typeof install;
};

export default _default;
