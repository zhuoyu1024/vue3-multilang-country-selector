import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CountrySelector from '../CountrySelector.vue'
import type { Country } from '../../types'

const mockCountries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' }
]

describe('CountrySelector', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(CountrySelector, {
      props: {
        countries: mockCountries
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.find('.country-selector').exists()).toBe(true)
    expect(wrapper.find('.country-selector__placeholder').text()).toBe('Select a country')
  })

  it('shows placeholder when no country is selected', () => {
    expect(wrapper.find('.country-selector__placeholder').exists()).toBe(true)
    expect(wrapper.find('.country-selector__selected').exists()).toBe(false)
  })

  it('displays selected country when modelValue is provided', async () => {
    await wrapper.setProps({ modelValue: 'US' })
    
    expect(wrapper.find('.country-selector__selected').exists()).toBe(true)
    expect(wrapper.find('.country-selector__name').text()).toBe('United States')
    expect(wrapper.find('.country-selector__flag').text()).toBe('🇺🇸')
  })

  it('shows dial code when showDialCode is true', async () => {
    await wrapper.setProps({ 
      modelValue: 'US',
      showDialCode: true 
    })
    
    expect(wrapper.find('.country-selector__dial-code').text()).toBe('+1')
  })

  it('hides flag when showFlag is false', async () => {
    await wrapper.setProps({ 
      modelValue: 'US',
      showFlag: false 
    })
    
    expect(wrapper.find('.country-selector__flag').exists()).toBe(false)
  })

  it('opens dropdown when clicked', async () => {
    await wrapper.find('.country-selector__input-wrapper').trigger('click')
    
    expect(wrapper.find('.country-selector__dropdown').exists()).toBe(true)
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('shows search input when searchable is true', async () => {
    await wrapper.find('.country-selector__input-wrapper').trigger('click')
    
    expect(wrapper.find('.country-selector__search-input').exists()).toBe(true)
  })

  it('hides search input when searchable is false', async () => {
    await wrapper.setProps({ searchable: false })
    await wrapper.find('.country-selector__input-wrapper').trigger('click')
    
    expect(wrapper.find('.country-selector__search-input').exists()).toBe(false)
  })

  it('filters countries based on search query', async () => {
    await wrapper.find('.country-selector__input-wrapper').trigger('click')
    
    const searchInput = wrapper.find('.country-selector__search-input')
    await searchInput.setValue('United')
    
    const options = wrapper.findAll('.country-selector__option')
    expect(options).toHaveLength(2) // United States and United Kingdom
  })

  it('emits update:modelValue when country is selected', async () => {
    await wrapper.find('.country-selector__input-wrapper').trigger('click')
    
    const firstOption = wrapper.find('.country-selector__option')
    await firstOption.trigger('click')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['US'])
  })

  it('emits change event when country is selected', async () => {
    await wrapper.find('.country-selector__input-wrapper').trigger('click')
    
    const firstOption = wrapper.find('.country-selector__option')
    await firstOption.trigger('click')
    
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0][0]).toEqual(mockCountries[0])
  })

  it('shows clear button when clearable is true and country is selected', async () => {
    await wrapper.setProps({ 
      modelValue: 'US',
      clearable: true 
    })
    
    expect(wrapper.find('.country-selector__clear').exists()).toBe(true)
  })

  it('clears selection when clear button is clicked', async () => {
    await wrapper.setProps({ 
      modelValue: 'US',
      clearable: true 
    })
    
    await wrapper.find('.country-selector__clear').trigger('click')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0]).toEqual([null])
  })

  it('applies correct size class', async () => {
    await wrapper.setProps({ size: 'large' })
    
    expect(wrapper.find('.country-selector--large').exists()).toBe(true)
  })

  it('applies disabled class when disabled', async () => {
    await wrapper.setProps({ disabled: true })
    
    expect(wrapper.find('.country-selector--disabled').exists()).toBe(true)
  })

  it('does not open dropdown when disabled', async () => {
    await wrapper.setProps({ disabled: true })

    await wrapper.find('.country-selector__input-wrapper').trigger('click')

    expect(wrapper.vm.isOpen).toBe(false)
  })

  it('accepts language prop', async () => {
    await wrapper.setProps({
      language: 'zh-CN'
    })

    // 测试语言属性是否被正确设置
    expect(wrapper.vm.language).toBe('zh-CN')
  })

  it('displays localized UI text', async () => {
    await wrapper.setProps({ language: 'zh-CN' })

    expect(wrapper.find('.country-selector__placeholder').text()).toBe('选择国家')
  })

  it('displays localized search placeholder', async () => {
    await wrapper.setProps({ language: 'zh-CN' })
    await wrapper.find('.country-selector__input-wrapper').trigger('click')

    const searchInput = wrapper.find('.country-selector__search-input')
    expect(searchInput.attributes('placeholder')).toBe('搜索国家...')
  })

  it('emits country code when type is country (default)', async () => {
    await wrapper.find('.country-selector__input-wrapper').trigger('click')

    const firstOption = wrapper.find('.country-selector__option')
    await firstOption.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['US'])
  })

  it('emits dial code without + when type is phone', async () => {
    await wrapper.setProps({ type: 'phone' })
    await wrapper.find('.country-selector__input-wrapper').trigger('click')

    const firstOption = wrapper.find('.country-selector__option')
    await firstOption.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1'])
  })

  it('displays selected country when type is phone and modelValue is dial code without +', async () => {
    await wrapper.setProps({
      type: 'phone',
      modelValue: '1'
    })

    expect(wrapper.find('.country-selector__selected').exists()).toBe(true)
    expect(wrapper.find('.country-selector__name').text()).toBe('United States')
  })

  it('shows correct selected option when type is phone', async () => {
    await wrapper.setProps({
      type: 'phone',
      modelValue: '44'
    })
    await wrapper.find('.country-selector__input-wrapper').trigger('click')

    const options = wrapper.findAll('.country-selector__option')
    const selectedOption = options.find(option =>
      option.classes().includes('country-selector__option--selected')
    )

    expect(selectedOption?.find('.country-selector__name').text()).toBe('United Kingdom')
  })
})
