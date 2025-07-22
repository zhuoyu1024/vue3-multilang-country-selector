import type { SupportedLanguage } from '../types'
import { accurateTranslations } from '../data/accurate-translations'

// 默认的UI文本翻译
export const uiTranslations = {
  en: {
    placeholder: 'Select a country',
    searchPlaceholder: 'Search countries...',
    noResults: 'No countries found',
    clear: 'Clear selection'
  },
  'zh-CN': {
    placeholder: '选择国家',
    searchPlaceholder: '搜索国家...',
    noResults: '未找到国家',
    clear: '清除选择'
  },
  cht: {
    placeholder: '選擇國家',
    searchPlaceholder: '搜尋國家...',
    noResults: '未找到國家',
    clear: '清除選擇'
  },
  fr: {
    placeholder: 'Sélectionner un pays',
    searchPlaceholder: 'Rechercher des pays...',
    noResults: 'Aucun pays trouvé',
    clear: 'Effacer la sélection'
  },
  de: {
    placeholder: 'Land auswählen',
    searchPlaceholder: 'Länder suchen...',
    noResults: 'Keine Länder gefunden',
    clear: 'Auswahl löschen'
  },
  it: {
    placeholder: 'Seleziona un paese',
    searchPlaceholder: 'Cerca paesi...',
    noResults: 'Nessun paese trovato',
    clear: 'Cancella selezione'
  },
  ko: {
    placeholder: '국가 선택',
    searchPlaceholder: '국가 검색...',
    noResults: '국가를 찾을 수 없습니다',
    clear: '선택 지우기'
  },
  ja: {
    placeholder: '国を選択',
    searchPlaceholder: '国を検索...',
    noResults: '国が見つかりません',
    clear: '選択をクリア'
  },
  ro: {
    placeholder: 'Selectează o țară',
    searchPlaceholder: 'Caută țări...',
    noResults: 'Nu s-au găsit țări',
    clear: 'Șterge selecția'
  },
  es: {
    placeholder: 'Seleccionar un país',
    searchPlaceholder: 'Buscar países...',
    noResults: 'No se encontraron países',
    clear: 'Limpiar selección'
  },
  tk: {
    placeholder: 'Ülke seçin',
    searchPlaceholder: 'Ülke ara...',
    noResults: 'Ülke bulunamadı',
    clear: 'Seçimi temizle'
  },
  pt: {
    placeholder: 'Selecionar um país',
    searchPlaceholder: 'Pesquisar países...',
    noResults: 'Nenhum país encontrado',
    clear: 'Limpar seleção'
  },
  el: {
    placeholder: 'Επιλέξτε μια χώρα',
    searchPlaceholder: 'Αναζήτηση χωρών...',
    noResults: 'Δεν βρέθηκαν χώρες',
    clear: 'Καθαρισμός επιλογής'
  },
  vi: {
    placeholder: 'Chọn một quốc gia',
    searchPlaceholder: 'Tìm kiếm quốc gia...',
    noResults: 'Không tìm thấy quốc gia',
    clear: 'Xóa lựa chọn'
  },
  local: {
    placeholder: 'Select a country',
    searchPlaceholder: 'Search countries...',
    noResults: 'No countries found',
    clear: 'Clear selection'
  }
}

/**
 * 获取国家的本地化名称
 */
export function getLocalizedCountryName(countryName: string, language: SupportedLanguage): string {
  const translations = accurateTranslations[countryName]
  if (!translations) {
    return countryName // 如果没有翻译，返回原名称
  }
  
  return translations[language] || translations.en || countryName
}

/**
 * 获取UI文本的本地化版本
 */
export function getLocalizedUIText(key: keyof typeof uiTranslations.en, language: SupportedLanguage): string {
  const translations = uiTranslations[language] || uiTranslations.en
  return translations[key] || uiTranslations.en[key]
}

/**
 * 获取支持的语言列表
 */
export function getSupportedLanguages(): SupportedLanguage[] {
  return Object.keys(uiTranslations) as SupportedLanguage[]
}

/**
 * 检查语言是否被支持
 */
export function isLanguageSupported(language: string): language is SupportedLanguage {
  return getSupportedLanguages().includes(language as SupportedLanguage)
}
