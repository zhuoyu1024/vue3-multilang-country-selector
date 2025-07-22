import { createApp, ref } from 'vue'
import { CountrySelector } from './index'
import type { Country } from './types'

const app = createApp({
  components: {
    CountrySelector
  },
  setup() {
    // 各种演示的选择器状态
    const selectedCountry1 = ref('')
    const selectedCountry2 = ref('')
    const selectedCountry3 = ref('')
    const selectedCountry4 = ref('')
    const selectedCountry5 = ref('')
    const selectedCountry6 = ref('')
    const selectedCountry7 = ref('')
    const selectedCountry8 = ref('')
    const selectedCountry9 = ref('CN') // 默认选择中国
    const selectedCountry10 = ref('')
    const selectedCountry11 = ref('')
    const selectedCountry12 = ref('')
    const selectedCountry13 = ref('')

    // 选择的国家信息
    const selectedInfo1 = ref<Country | null>(null)
    const selectedInfo2 = ref<Country | null>(null)

    // 事件处理函数
    const onCountryChange1 = (country: Country | null) => {
      selectedInfo1.value = country
      console.log('选择的国家1:', country)
    }

    const onCountryChange2 = (country: Country | null) => {
      selectedInfo2.value = country
      console.log('选择的国家2:', country)
    }

    return {
      selectedCountry1,
      selectedCountry2,
      selectedCountry3,
      selectedCountry4,
      selectedCountry5,
      selectedCountry6,
      selectedCountry7,
      selectedCountry8,
      selectedCountry9,
      selectedCountry10,
      selectedCountry11,
      selectedCountry12,
      selectedCountry13,
      selectedInfo1,
      selectedInfo2,
      onCountryChange1,
      onCountryChange2
    }
  }
})

app.mount('#app')
