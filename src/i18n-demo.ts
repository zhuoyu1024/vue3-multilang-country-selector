import { createApp, ref } from 'vue'
import { CountrySelector } from './index'
import type { Country } from './types'

const app = createApp({
  components: {
    CountrySelector
  },
  setup() {
    // 各种语言的选择器状态
    const selectedCountry1 = ref('')
    const selectedCountry2 = ref('')
    const selectedCountry3 = ref('')
    const selectedCountry4 = ref('')
    const selectedCountry5 = ref('')
    const selectedCountry6 = ref('')

    // 选择的国家信息
    const selectedInfo1 = ref<Country | null>(null)
    const selectedInfo2 = ref<Country | null>(null)
    const selectedInfo3 = ref<Country | null>(null)
    const selectedInfo4 = ref<Country | null>(null)
    const selectedInfo5 = ref<Country | null>(null)
    const selectedInfo6 = ref<Country | null>(null)

    // 事件处理函数
    const onCountryChange1 = (country: Country | null) => {
      selectedInfo1.value = country
    }

    const onCountryChange2 = (country: Country | null) => {
      selectedInfo2.value = country
    }

    const onCountryChange3 = (country: Country | null) => {
      selectedInfo3.value = country
    }

    const onCountryChange4 = (country: Country | null) => {
      selectedInfo4.value = country
    }

    const onCountryChange5 = (country: Country | null) => {
      selectedInfo5.value = country
    }

    const onCountryChange6 = (country: Country | null) => {
      selectedInfo6.value = country
    }

    return {
      selectedCountry1,
      selectedCountry2,
      selectedCountry3,
      selectedCountry4,
      selectedCountry5,
      selectedCountry6,
      selectedInfo1,
      selectedInfo2,
      selectedInfo3,
      selectedInfo4,
      selectedInfo5,
      selectedInfo6,
      onCountryChange1,
      onCountryChange2,
      onCountryChange3,
      onCountryChange4,
      onCountryChange5,
      onCountryChange6
    }
  }
})

app.mount('#app')
