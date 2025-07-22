# Vue3 多语言国家选择器 - 国际化功能

[English](./INTERNATIONALIZATION.md) | 简体中文

## 概述

Vue3 多语言国家选择器现在支持完整的国际化功能，包括：

- 🌐 **15+ 种语言支持** - 支持主要的世界语言
- 🏳️ **国家名称本地化** - 所有国家名称都有对应的翻译
- 🎯 **UI文本本地化** - 占位符、搜索提示、错误信息等都支持多语言
- 🔧 **灵活的配置** - 可以自定义翻译文本和语言

## 支持的语言

| 语言代码 | 语言名称 | 本地名称 |
|---------|---------|---------|
| `en` | 英语 | English |
| `zh-CN` | 简体中文 | 简体中文 |
| `cht` | 繁体中文 | 繁體中文 |
| `fr` | 法语 | Français |
| `de` | 德语 | Deutsch |
| `it` | 意大利语 | Italiano |
| `ko` | 韩语 | 한국어 |
| `ja` | 日语 | 日本語 |
| `ro` | 罗马尼亚语 | Română |
| `es` | 西班牙语 | Español |
| `tk` | 土耳其语 | Türkçe |
| `pt` | 葡萄牙语 | Português |
| `el` | 希腊语 | Ελληνικά |
| `vi` | 越南语 | Tiếng Việt |
| `local` | 本地名称 | 本地名称 |

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

### 动态语言切换

```vue
<template>
  <div>
    <select v-model="currentLanguage">
      <option value="en">English</option>
      <option value="zh-CN">简体中文</option>
      <option value="ja">日本語</option>
      <option value="fr">Français</option>
    </select>
    
    <CountrySelector 
      v-model="selectedCountry"
      :language="currentLanguage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentLanguage = ref('zh-CN')
const selectedCountry = ref('')
</script>
```

## API 参考

### 新增的属性

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
const placeholder = getLocalizedUIText('placeholder', 'zh-CN') // "选择国家"

// 获取所有支持的语言
const languages = getSupportedLanguages()

// 检查语言是否支持
const isSupported = isLanguageSupported('zh-CN') // true
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

- **占位符文本** (`placeholder`) - "选择国家"、"Select a country" 等
- **搜索框占位符** (`searchPlaceholder`) - "搜索国家..."、"Search countries..." 等
- **无结果提示** (`noResults`) - "未找到国家"、"No countries found" 等
- **清除按钮提示** (`clear`) - "清除选择"、"Clear selection" 等

### 国家名称翻译

每个国家都有对应的多语言翻译，例如：

```typescript
'United States': {
  en: 'United States',
  'zh-CN': '美国',
  'zh-TW': '美國',
  fr: 'États-Unis',
  de: 'Vereinigte Staaten',
  ja: 'アメリカ合衆国',
  ko: '미국'
  // ... 其他语言
}
```

## 高级用法

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

<script setup lang="ts">
const customCountries = [
  { code: 'US', name: '美利坚合众国', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CN', name: '中华人民共和国', flag: '🇨🇳', dialCode: '+86' },
  { code: 'JP', name: '日本国', flag: '🇯🇵', dialCode: '+81' }
]
</script>
```

### 混合使用多种语言

```vue
<template>
  <div class="language-demo">
    <h3>多语言演示</h3>
    
    <div class="selector-group">
      <label>英语版本：</label>
      <CountrySelector 
        v-model="selectedCountry1"
        language="en"
      />
    </div>
    
    <div class="selector-group">
      <label>中文版本：</label>
      <CountrySelector 
        v-model="selectedCountry2"
        language="zh-CN"
      />
    </div>
    
    <div class="selector-group">
      <label>日语版本：</label>
      <CountrySelector 
        v-model="selectedCountry3"
        language="ja"
      />
    </div>
  </div>
</template>
```

## 扩展支持

### 添加新语言

如果你需要添加新的语言支持：

1. **更新类型定义**：在 `SupportedLanguage` 类型中添加新的语言代码
2. **添加UI文本翻译**：在 `uiTranslations` 中添加对应的UI文本翻译
3. **添加国家名称翻译**：在 `accurateTranslations` 中添加国家名称翻译

示例：

```typescript
// 1. 更新类型
export type SupportedLanguage = 
  | 'en' 
  | 'zh-CN' 
  | 'ja'
  | 'your-new-language' // 添加新语言

// 2. 添加UI翻译
export const uiTranslations = {
  // ... 其他语言
  'your-new-language': {
    placeholder: 'Your translated placeholder',
    searchPlaceholder: 'Your translated search placeholder',
    noResults: 'Your translated no results text',
    clear: 'Your translated clear text'
  }
}

// 3. 添加国家翻译
export const accurateTranslations = {
  'United States': {
    // ... 其他语言
    'your-new-language': 'Your translated country name'
  }
  // ... 其他国家
}
```

## 演示页面

项目包含专门的国际化演示页面：

- **主演示页面**：`http://localhost:5174/` - 包含语言选择器
- **国际化演示页面**：`http://localhost:5174/i18n-demo.html` - 展示多种语言并排显示

## 测试

国际化功能包含完整的单元测试：

```bash
npm test
```

测试覆盖内容：
- 语言属性设置
- UI文本本地化
- 搜索框占位符本地化
- 无结果提示本地化
- 动态语言切换

## 性能优化

- **按需加载**：翻译数据按需加载，不会影响初始包大小
- **计算属性缓存**：使用 Vue 的计算属性缓存本地化结果
- **最小化重新渲染**：语言切换时只更新必要的部分

## 浏览器兼容性

国际化功能支持所有现代浏览器：
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 常见问题

### Q: 如何添加自定义的国家翻译？
A: 你可以通过 `countries` 属性传入自定义的国家列表，每个国家对象的 `name` 字段就是显示的名称。

### Q: 可以只翻译部分国家吗？
A: 可以。如果某个国家没有对应语言的翻译，组件会回退到英文名称。

### Q: 如何实现右到左（RTL）语言支持？
A: 目前组件主要支持从左到右的语言。如需RTL支持，可以通过CSS进行调整。

### Q: 翻译数据会影响包大小吗？
A: 翻译数据会增加一些包大小，但我们已经优化了数据结构。你也可以通过自定义国家列表来减少不需要的翻译数据。

## 贡献翻译

如果你发现翻译有误或想要添加新的语言支持，欢迎提交 Pull Request！

翻译贡献指南：
1. Fork 项目
2. 添加或修改翻译数据
3. 运行测试确保功能正常
4. 提交 Pull Request

我们特别欢迎母语使用者来改进翻译质量！
