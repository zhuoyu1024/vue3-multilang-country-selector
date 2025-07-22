# Vue3 多语言国家选择器

一个灵活且可定制的 Vue 3 多语言国家选择器组件，支持 TypeScript。

[English](./README.md) | 简体中文

## 特性

- 🌍 完整的国家列表，包含国旗和区号
- 🌐 **国际化 (i18n)** - 支持 15+ 种语言
- 🔍 可搜索的下拉菜单，支持自定义过滤函数
- 🎨 多种尺寸（小、中、大）
- 🎯 完整的 TypeScript 支持和类型定义
- ♿ 无障碍设计，支持键盘导航
- 🎪 可定制的外观和行为
- 📱 移动端友好的响应式设计
- 🧪 全面的测试覆盖

## 安装

```bash
npm install vue3-multilang-country-selector
```

## 基本用法

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

const selectedCountry = ref('')

const onCountryChange = (country: Country | null) => {
  console.log('选择的国家:', country)
}
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | 选中的国家代码 (ISO 3166-1 alpha-2) |
| `placeholder` | `string` | `'Select a country'` | 未选择时的占位符文本 |
| `searchable` | `boolean` | `true` | 启用/禁用搜索功能 |
| `showFlag` | `boolean` | `true` | 显示/隐藏国旗 |
| `showDialCode` | `boolean` | `false` | 显示/隐藏区号 |
| `disabled` | `boolean` | `false` | 禁用组件 |
| `clearable` | `boolean` | `true` | 显示/隐藏清除按钮 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |
| `countries` | `Country[]` | `defaultCountries` | 自定义国家列表 |
| `filterFunction` | `(country: Country, query: string) => boolean` | `undefined` | 自定义过滤函数 |
| `language` | `SupportedLanguage` | `'en'` | 国家名称和UI的显示语言 |
| `searchPlaceholder` | `string` | `undefined` | 自定义搜索框占位符 |
| `noResultsText` | `string` | `undefined` | 自定义无结果提示信息 |

## 事件

| 事件 | 参数 | 说明 |
|-------|---------|-------------|
| `update:modelValue` | `string` | 选中国家变化时触发 |
| `change` | `Country \| null` | 选中国家变化时触发 |
| `search` | `string` | 搜索查询变化时触发 |

## 类型定义

```typescript
interface Country {
  code: string        // ISO 3166-1 alpha-2 国家代码
  name: string        // 国家名称
  flag?: string       // 国旗 emoji
  dialCode?: string   // 国际区号
}
```

## 支持的语言

组件支持以下语言：

- `en` - English（英语）
- `zh-CN` - 简体中文
- `cht` - 繁體中文
- `fr` - Français（法语）
- `de` - Deutsch（德语）
- `it` - Italiano（意大利语）
- `ko` - 한국어（韩语）
- `ja` - 日本語（日语）
- `ro` - Română（罗马尼亚语）
- `es` - Español（西班牙语）
- `tk` - Türkçe（土耳其语）
- `pt` - Português（葡萄牙语）
- `el` - Ελληνικά（希腊语）
- `vi` - Tiếng Việt（越南语）
- `local` - 本地名称（使用原生国家名称）

## 使用示例

### 国际化

```vue
<template>
  <div>
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
    
    <!-- 法文界面 -->
    <CountrySelector 
      v-model="selectedCountry"
      language="fr"
    />
  </div>
</template>
```

### 显示区号

```vue
<CountrySelector 
  v-model="selectedCountry"
  :show-dial-code="true"
/>
```

### 自定义尺寸

```vue
<CountrySelector 
  v-model="selectedCountry"
  size="large"
/>
```

### 禁用搜索

```vue
<CountrySelector 
  v-model="selectedCountry"
  :searchable="false"
/>
```

### 自定义国家列表

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

### 自定义过滤函数

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

## 国际化工具函数

包还导出了国际化相关的工具函数：

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

## 全局注册

```typescript
import { createApp } from 'vue'
import Vue3MultilangCountrySelector from 'vue3-multilang-country-selector'

const app = createApp(App)
app.use(Vue3MultilangCountrySelector)
```

然后在模板中使用：

```vue
<template>
  <CountrySelector v-model="selectedCountry" />
</template>
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建库
npm run build:lib

# 运行测试
npm run test

# 代码检查
npm run lint
```

## 演示

项目包含两个演示页面：

1. **主演示页面** - 访问 `http://localhost:5174/`
2. **国际化演示页面** - 访问 `http://localhost:5174/i18n-demo.html`

## 许可证

MIT 许可证 - 详见 LICENSE 文件。

## 贡献

欢迎贡献代码！请随时提交 Pull Request。

## 更多文档

- [国际化功能详细说明](./INTERNATIONALIZATION.md)
- [API 参考文档](./README.md#props)
- [TypeScript 类型定义](./src/types.ts)
