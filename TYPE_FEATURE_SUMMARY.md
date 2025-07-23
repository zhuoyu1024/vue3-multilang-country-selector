# Type Feature Summary

## 新增功能概述

为 Vue3 多语言国家选择器组件添加了 `type` 属性，用于控制 `modelValue` 返回的内容类型。

## 功能详情

### 新增属性

- **`type`**: `'country' | 'phone'` (默认: `'country'`)
  - `'country'`: 返回国家代码（如 'US', 'CN', 'JP'）
  - `'phone'`: 返回不带 "+" 的电话区号（如 '1', '86', '81'）

### 行为说明

#### type="country" (默认行为)
```vue
<CountrySelector 
  v-model="selectedCountry"
  type="country"
/>
```
- `modelValue` 返回: `'US'`, `'CN'`, `'JP'` 等国家代码
- 保持与之前版本的兼容性

#### type="phone" (新功能)
```vue
<CountrySelector 
  v-model="selectedPhone"
  type="phone"
/>
```
- `modelValue` 返回: `'1'`, `'86'`, `'81'` 等区号（不带+号）
- 适用于需要电话区号的场景

### 实现细节

1. **组件逻辑更新**:
   - 修改 `selectCountry` 函数，根据 `type` 属性决定返回值
   - 更新 `selectedCountry` 计算属性，支持根据区号查找国家
   - 添加 `isCountrySelected` 函数，正确判断选中状态

2. **数据处理**:
   - 原始数据中的 `dialCode` 保持带 "+" 格式（如 "+1", "+86"）
   - 当 `type="phone"` 时，自动移除 "+" 号返回纯数字区号
   - 查找时自动添加 "+" 号进行匹配

3. **测试覆盖**:
   - 添加了完整的测试用例覆盖新功能
   - 验证不同 `type` 值下的行为
   - 确保向后兼容性

### 使用示例

```vue
<template>
  <div>
    <!-- 获取国家代码 -->
    <CountrySelector 
      v-model="countryCode"
      type="country"
      :show-dial-code="true"
      @change="onCountryChange"
    />
    <p>选中的国家代码: {{ countryCode }}</p>
    
    <!-- 获取电话区号 -->
    <CountrySelector 
      v-model="phoneCode"
      type="phone"
      :show-dial-code="true"
      @change="onPhoneChange"
    />
    <p>选中的区号: +{{ phoneCode }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const countryCode = ref('') // 将是 'US', 'CN' 等
const phoneCode = ref('')   // 将是 '1', '86' 等

const onCountryChange = (country) => {
  console.log('选中国家:', country)
}

const onPhoneChange = (country) => {
  console.log('选中国家:', country)
}
</script>
```

### 文档更新

- ✅ 更新了英文 README.md
- ✅ 更新了中文 README.zh-CN.md
- ✅ 添加了详细的使用示例
- ✅ 更新了属性表格和事件说明

### 测试状态

- ✅ 所有现有测试通过
- ✅ 新功能测试覆盖完整
- ✅ 向后兼容性验证通过

## 总结

这个新功能为组件提供了更大的灵活性，用户可以根据具体需求选择返回国家代码或电话区号，同时保持了完全的向后兼容性。
