<template>
  <div class="country-selector" :class="[`country-selector--${size}`, { 'country-selector--disabled': disabled }]">
    <div class="country-selector__input-wrapper" @click="toggleDropdown">
      <div class="country-selector__input">
        <div v-if="selectedCountry" class="country-selector__selected">
          <span v-if="showFlag" class="country-selector__flag">{{ selectedCountry.flag }}</span>
          <span class="country-selector__name">{{ selectedCountry.name }}</span>
          <span v-if="showDialCode" class="country-selector__dial-code">{{ selectedCountry.dialCode }}</span>
        </div>
        <div v-else class="country-selector__placeholder">
          {{ localizedPlaceholder }}
        </div>
        <div class="country-selector__actions">
          <button
            v-if="clearable && selectedCountry"
            type="button"
            class="country-selector__clear"
            @click.stop="clearSelection"
          >
            ×
          </button>
          <div class="country-selector__arrow" :class="{ 'country-selector__arrow--open': isOpen }">
            ▼
          </div>
        </div>
      </div>
    </div>

    <transition name="country-selector-dropdown">
      <div v-if="isOpen" class="country-selector__dropdown">
        <div v-if="searchable" class="country-selector__search">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            class="country-selector__search-input"
            :placeholder="localizedSearchPlaceholder"
            @input="onSearch"
          />
        </div>
        <div class="country-selector__options">
          <div
            v-for="country in filteredCountries"
            :key="country.code"
            class="country-selector__option"
            :class="{ 'country-selector__option--selected': isCountrySelected(country) }"
            @click="selectCountry(country)"
          >
            <span v-if="showFlag" class="country-selector__flag">{{ country.flag }}</span>
            <span class="country-selector__name">{{ country.name }}</span>
            <span v-if="showDialCode" class="country-selector__dial-code">{{ country.dialCode }}</span>
          </div>
          <div v-if="filteredCountries.length === 0" class="country-selector__no-results">
            {{ localizedNoResultsText }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Country, CountrySelectorProps, CountrySelectorEmits } from '../types'
import { getLocalizedCountries } from '../data/countries'
import { getLocalizedUIText } from '../utils/i18n'

const props = withDefaults(defineProps<CountrySelectorProps>(), {
  searchable: true,
  showFlag: true,
  showDialCode: false,
  disabled: false,
  clearable: true,
  size: 'medium',
  language: 'en',
  type: 'country'
})

const emit = defineEmits<CountrySelectorEmits>()

const isOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement>()

// 国际化计算属性
const localizedCountries = computed(() => {
  if (props.countries) {
    return props.countries
  }
  return getLocalizedCountries(props.language)
})

const localizedPlaceholder = computed(() => {
  return props.placeholder || getLocalizedUIText('placeholder', props.language!)
})

const localizedSearchPlaceholder = computed(() => {
  return props.searchPlaceholder || getLocalizedUIText('searchPlaceholder', props.language!)
})

const localizedNoResultsText = computed(() => {
  return props.noResultsText || getLocalizedUIText('noResults', props.language!)
})

const selectedCountry = computed(() => {
  if (!props.modelValue) return null

  if (props.type === 'phone') {
    // 当type为phone时，modelValue是不带+的电话区号，需要根据区号查找国家
    const dialCodeWithPlus = '+' + props.modelValue
    return localizedCountries.value.find(country => country.dialCode === dialCodeWithPlus) || null
  } else {
    // 当type为country时，modelValue是国家代码
    return localizedCountries.value.find(country => country.code === props.modelValue) || null
  }
})

const filteredCountries = computed(() => {
  if (!searchQuery.value) return localizedCountries.value

  const query = searchQuery.value.toLowerCase()

  if (props.filterFunction) {
    return localizedCountries.value.filter(country => props.filterFunction!(country, query))
  }

  return localizedCountries.value.filter(country =>
    country.name.toLowerCase().includes(query) ||
    country.code.toLowerCase().includes(query) ||
    (country.dialCode && country.dialCode.includes(query))
  )
})

const toggleDropdown = () => {
  if (props.disabled) return
  
  isOpen.value = !isOpen.value
  
  if (isOpen.value && props.searchable) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const isCountrySelected = (country: Country) => {
  if (!props.modelValue) return false

  if (props.type === 'phone') {
    // 比较时需要将modelValue加上+号与dialCode比较
    const dialCodeWithPlus = '+' + props.modelValue
    return country.dialCode === dialCodeWithPlus
  } else {
    return country.code === props.modelValue
  }
}

const selectCountry = (country: Country) => {
  let value = ''
  if (props.type === 'phone') {
    // 当type为phone时，返回不带+号的区号
    value = country.dialCode ? country.dialCode.replace('+', '') : ''
  } else {
    value = country.code
  }
  emit('update:modelValue', value)
  emit('change', country)
  isOpen.value = false
  searchQuery.value = ''
}

const clearSelection = () => {
  emit('update:modelValue', '')
  emit('change', null)
}

const onSearch = () => {
  emit('search', searchQuery.value)
}

const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.country-selector')) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(() => props.modelValue, () => {
  searchQuery.value = ''
})
</script>

<style scoped>
.country-selector {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.country-selector--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.country-selector__input-wrapper {
  cursor: pointer;
}

.country-selector--disabled .country-selector__input-wrapper {
  cursor: not-allowed;
}

.country-selector__input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.country-selector__input:hover {
  border-color: #9ca3af;
}

.country-selector__input:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.country-selector--small .country-selector__input {
  padding: 6px 10px;
  font-size: 14px;
}

.country-selector--large .country-selector__input {
  padding: 12px 16px;
  font-size: 16px;
}

.country-selector__selected,
.country-selector__placeholder {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.country-selector__placeholder {
  color: #9ca3af;
}

.country-selector__flag {
  font-size: 1.2em;
}

.country-selector__name {
  flex: 1;
}

.country-selector__dial-code {
  color: #6b7280;
  font-size: 0.9em;
}

.country-selector__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.country-selector__clear {
  background: none;
  border: none;
  font-size: 18px;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.country-selector__clear:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.country-selector__arrow {
  color: #9ca3af;
  font-size: 12px;
  transition: transform 0.2s;
}

.country-selector__arrow--open {
  transform: rotate(180deg);
}

.country-selector__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  max-height: 300px;
  overflow: hidden;
}

.country-selector__search {
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
  box-sizing: border-box;
}

.country-selector__search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.country-selector__search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.country-selector__options {
  max-height: 250px;
  overflow-y: auto;
}

.country-selector__option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.country-selector__option:hover {
  background-color: #f3f4f6;
}

.country-selector__option--selected {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.country-selector__no-results {
  padding: 16px;
  text-align: center;
  color: #9ca3af;
  font-style: italic;
}

/* Dropdown animation */
.country-selector-dropdown-enter-active,
.country-selector-dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.country-selector-dropdown-enter-from,
.country-selector-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
