# Vue3 Multilang Country Selector - 国际化功能

## 概述

Vue3 Multilang Country Selector 现在支持完整的国际化功能，包括：

- 🌐 **15+ 种语言支持** - 支持主要的世界语言
- 🏳️ **国家名称本地化** - 所有国家名称都有对应的翻译
- 🎯 **UI文本本地化** - 占位符、搜索提示、错误信息等都支持多语言
- 🔧 **灵活的配置** - 可以自定义翻译文本和语言

## 支持的语言

| 语言代码 | 语言名称 | 本地名称 |
|---------|---------|---------|
| `en` | English | English |
| `zh-CN` | Chinese (Simplified) | 简体中文 |
| `cht` | Chinese (Traditional) | 繁體中文 |
| `fr` | French | Français |
| `de` | German | Deutsch |
| `it` | Italian | Italiano |
| `ko` | Korean | 한국어 |
| `ja` | Japanese | 日本語 |
| `ro` | Romanian | Română |
| `es` | Spanish | Español |
| `tk` | Turkish | Türkçe |
| `pt` | Portuguese | Português |
| `el` | Greek | Ελληνικά |
| `vi` | Vietnamese | Tiếng Việt |
| `local` | Local Names | 本地名称 |

## 基本用法

### 设置语言

```vue
<template>
  <!-- 中文界面 -->
  <CountrySelector 
    v-model="selectedCountry"
    language="zh-CN"
  />
  
  <!-- 日文界面 -->
  <CountrySelector 
    v-model="selectedCountry"
    language="ja"
  />
</template>
```

### 自定义文本

```vue
<template>
  <CountrySelector 
    v-model="selectedCountry"
    language="zh-CN"
    placeholder="请选择您的国家"
    search-placeholder="输入国家名称搜索..."
    no-results-text="没有找到匹配的国家"
  />
</template>
```

## API 参考

### 新增的 Props

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `language` | `SupportedLanguage` | `'en'` | 显示语言 |
| `searchPlaceholder` | `string` | `undefined` | 自定义搜索框占位符 |
| `noResultsText` | `string` | `undefined` | 自定义无结果提示文本 |

### 工具函数

```typescript
import {
  getLocalizedCountries,
  getLocalizedUIText,
  getSupportedLanguages,
  isLanguageSupported
} from 'vue3-multilang-country-selector'

// 获取本地化的国家列表
const chineseCountries = getLocalizedCountries('zh-CN')

// 获取本地化的UI文本
const placeholder = getLocalizedUIText('placeholder', 'fr')

// 获取所有支持的语言
const languages = getSupportedLanguages()

// 检查语言是否支持
const isSupported = isLanguageSupported('zh-CN')
```

## 实现细节

### 翻译数据结构

```typescript
interface CountryTranslations {
  [countryName: string]: {
    [K in SupportedLanguage]: string
  }
}
```

### UI文本翻译

所有UI文本都支持多语言：

- 占位符文本 (`placeholder`)
- 搜索框占位符 (`searchPlaceholder`)
- 无结果提示 (`noResults`)
- 清除按钮提示 (`clear`)

### 动态语言切换

组件支持运行时动态切换语言：

```vue
<template>
  <div>
    <select v-model="currentLanguage">
      <option value="en">English</option>
      <option value="zh-CN">中文</option>
      <option value="ja">日本語</option>
    </select>
    
    <CountrySelector 
      v-model="selectedCountry"
      :language="currentLanguage"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentLanguage = ref('en')
const selectedCountry = ref('')
</script>
```

## 扩展支持

### 添加新语言

1. 在 `SupportedLanguage` 类型中添加新的语言代码
2. 在 `uiTranslations` 中添加对应的UI文本翻译
3. 在 `accurateTranslations` 中添加国家名称翻译

### 自定义翻译

你可以提供自定义的国家列表和翻译：

```vue
<template>
  <CountrySelector 
    v-model="selectedCountry"
    :countries="customCountries"
    language="zh-CN"
  />
</template>

<script setup>
const customCountries = [
  { code: 'US', name: '美利坚合众国', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CN', name: '中华人民共和国', flag: '🇨🇳', dialCode: '+86' }
]
</script>
```

## 演示页面

项目包含两个演示页面：

1. **主演示页面** (`index.html`) - 包含语言选择器和完整功能演示
2. **国际化演示页面** (`i18n-demo.html`) - 专门展示多语言功能

访问 `http://localhost:5174/i18n-demo.html` 查看国际化演示。

## 测试

国际化功能包含完整的单元测试：

```bash
npm test
```

测试覆盖：
- 语言属性设置
- UI文本本地化
- 搜索框占位符本地化
- 无结果提示本地化

## 性能考虑

- 翻译数据按需加载
- 计算属性缓存本地化结果
- 最小化重新渲染

## 浏览器兼容性

国际化功能支持所有现代浏览器，包括：
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
