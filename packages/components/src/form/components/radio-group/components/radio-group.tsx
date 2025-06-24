import type { FlexProps, RadioGroupProps, RadioProps } from 'naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import type { ProRadioGroupSlots } from '../slots'
import { get, toPath } from 'lodash-es'
import { NFlex, NRadio, NRadioButton, NRadioGroup, radioGroupProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'RadioGroup',
  inheritAttrs: false,
  props: {
    labelField: String,
    valueField: String,
    flexProps: Object as PropType<FlexProps>,
    type: String as PropType<'button' | 'radio'>,
    options: Array as PropType<Array<RadioProps & ([x: string])>>,
    ...radioGroupProps,
  },
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup(props) {
    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const normalizedOptions = computed(() => {
      const {
        options = [],
        labelField = 'label',
        valueField = 'value',
      } = props

      const labelFieldPath = toPath(labelField)
      const valueFieldPath = toPath(labelField)

      return options.map((item) => {
        const copyedItem = { ...item }
        const label = get(item, labelField)
        const value = get(item, valueField)
        if (labelFieldPath.length > 0) {
          delete copyedItem[labelFieldPath[0] as any]
        }
        if (valueFieldPath.length > 0) {
          delete copyedItem[valueFieldPath[0] as any]
        }
        return {
          ...copyedItem,
          label,
          value,
        }
      })
    })

    const nRadioGroupProps = computed<RadioGroupProps>(() => {
      const {
        type,
        options,
        flexProps,
        labelField,
        valueField,
        value,
        ...rest
      } = props
      return {
        ...rest,
        value: value ?? null,
      }
    })

    const selectedLabel = computed(() => {
      const selectedValue = value.value
      const valueLabelOption = normalizedOptions.value.find(item => item.value === selectedValue)
      return valueLabelOption ? (valueLabelOption.label ?? selectedValue) : selectedValue
    })
    return {
      empty,
      value,
      readonly,
      emptyDom,
      selectedLabel,
      nRadioGroupProps,
      normalizedOptions,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : <span>{this.selectedLabel}</span>
    }
    else {
      dom = (
        <NRadioGroup
          {...this.$attrs}
          {...this.nRadioGroupProps}
        >
          {{
            default: () => {
              const { type, flexProps = {} } = this.$props
              if (type === 'button') {
                return this.normalizedOptions.map((item) => {
                  return <NRadioButton key={item.value} {...item} />
                })
              }
              return (
                <NFlex {...flexProps}>
                  {
                    this.normalizedOptions.map((item) => {
                      return <NRadio key={item.value} {...item} />
                    })
                  }
                </NFlex>
              )
            },
          }}
        </NRadioGroup>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: {
            ...this.nRadioGroupProps,
            options: this.normalizedOptions,
          },
        })
      : dom
  },
})
