<template>
  <div class="container">
    <h1>Vue3 Multilang Country Selector Demo</h1>
    <p>A flexible and customizable multilingual country selector component for Vue 3</p>

    <div class="language-selector">
      <label for="language">Language / 语言:</label>
      <select id="language" v-model="currentLanguage" @change="onLanguageChange">
        <option value="en">English</option>
        <option value="zh-CN">简体中文</option>
        <option value="cht">繁體中文</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
        <option value="ko">한국어</option>
        <option value="ja">日本語</option>
        <option value="es">Español</option>
        <option value="pt">Português</option>
      </select>
    </div>

    <div class="demo-section">
      <h2>Basic Usage</h2>
      <p>Simple country selector with default settings</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Default</h3>
          <CountrySelector
            v-model="selectedCountry1"
            :language="currentLanguage"
            @change="onCountryChange1"
          />
          <div v-if="selectedInfo1" class="selected-info">
            Selected: {{ selectedInfo1.name }} ({{ selectedInfo1.code }})
          </div>
        </div>

        <div class="demo-item">
          <h3>With Dial Code</h3>
          <CountrySelector
            v-model="selectedCountry2"
            :language="currentLanguage"
            :show-dial-code="true"
            @change="onCountryChange2"
          />
          <div v-if="selectedInfo2" class="selected-info">
            Selected: {{ selectedInfo2.name }} {{ selectedInfo2.dialCode }}
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>Sizes</h2>
      <p>Different sizes available</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Small</h3>
          <CountrySelector
            v-model="selectedCountry3"
            :language="currentLanguage"
            size="small"
          />
        </div>

        <div class="demo-item">
          <h3>Medium (Default)</h3>
          <CountrySelector
            v-model="selectedCountry4"
            :language="currentLanguage"
            size="medium"
          />
        </div>

        <div class="demo-item">
          <h3>Large</h3>
          <CountrySelector
            v-model="selectedCountry5"
            :language="currentLanguage"
            size="large"
          />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>Type Options</h2>
      <p>Control what value is returned by modelValue: country code or phone dial code (without +)</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>Country Code (Default)</h3>
          <CountrySelector
            v-model="selectedCountryCode"
            :language="currentLanguage"
            type="country"
            :show-dial-code="true"
            @change="onCountryCodeChange"
          />
          <div v-if="selectedCountryCodeInfo" class="selected-info">
            Value: {{ selectedCountryCode }}<br>
            Country: {{ selectedCountryCodeInfo.name }}
          </div>
        </div>

        <div class="demo-item">
          <h3>Phone Dial Code (without +)</h3>
          <CountrySelector
            v-model="selectedPhoneCode"
            :language="currentLanguage"
            type="phone"
            :show-dial-code="true"
            @change="onPhoneCodeChange"
          />
          <div v-if="selectedPhoneCodeInfo" class="selected-info">
            Value: {{ selectedPhoneCode }}<br>
            Country: {{ selectedPhoneCodeInfo.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>Customization</h2>
      <p>Various customization options</p>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>No Search</h3>
          <CountrySelector
            v-model="selectedCountry6"
            :language="currentLanguage"
            :searchable="false"
          />
        </div>

        <div class="demo-item">
          <h3>No Clear Button</h3>
          <CountrySelector
            v-model="selectedCountry7"
            :language="currentLanguage"
            :clearable="false"
          />
        </div>

        <div class="demo-item">
          <h3>No Flags</h3>
          <CountrySelector
            v-model="selectedCountry8"
            :language="currentLanguage"
            :show-flag="false"
          />
        </div>

        <div class="demo-item">
          <h3>Disabled</h3>
          <CountrySelector
            v-model="selectedCountry9"
            :language="currentLanguage"
            :disabled="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CountrySelector } from './index'
import type { Country, SupportedLanguage } from './types'

// 语言状态
const currentLanguage = ref<SupportedLanguage>('en')

// 选择器状态
const selectedCountry1 = ref('')
const selectedCountry2 = ref('')
const selectedCountry3 = ref('')
const selectedCountry4 = ref('')
const selectedCountry5 = ref('')
const selectedCountry6 = ref('')
const selectedCountry7 = ref('')
const selectedCountry8 = ref('')
const selectedCountry9 = ref('US')

// Type demo states
const selectedCountryCode = ref('')
const selectedPhoneCode = ref('')
const selectedCountryCodeInfo = ref<Country | null>(null)
const selectedPhoneCodeInfo = ref<Country | null>(null)

const selectedInfo1 = ref<Country | null>(null)
const selectedInfo2 = ref<Country | null>(null)

const onCountryChange1 = (country: Country | null) => {
  selectedInfo1.value = country
}

const onCountryChange2 = (country: Country | null) => {
  selectedInfo2.value = country
}

const onCountryCodeChange = (country: Country | null) => {
  selectedCountryCodeInfo.value = country
}

const onPhoneCodeChange = (country: Country | null) => {
  selectedPhoneCodeInfo.value = country
}

const onLanguageChange = () => {
  // 语言切换时可以添加额外的逻辑
  console.log('Language changed to:', currentLanguage.value)
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.language-selector {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.language-selector label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
}

.language-selector select {
  width: 200px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  color: #374151;
}

.language-selector select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  color: #1f2937;
  margin-bottom: 16px;
}

.demo-section p {
  color: #6b7280;
  margin-bottom: 20px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.demo-item {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.demo-item h3 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 16px;
}

.selected-info {
  margin-top: 12px;
  padding: 12px;
  background: #eff6ff;
  border-radius: 6px;
  font-size: 14px;
  color: #1e40af;
}
</style>
