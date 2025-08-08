import type { RadioGroupProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProRadioGroupFieldProps } from './props'
import type { ProRadioGroupSlots } from './slots'
import { get, toPath } from 'lodash-es'
import { NFlex, NRadio, NRadioButton, NRadioGroup } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proRadioGroupProps } from './props'

const name = 'ProRadioGroup'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proRadioGroupProps,
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<ProRadioGroupFieldProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const normalizedOptions = computed(() => {
      const {
        options = [],
        labelField = 'label',
        valueField = 'value',
      } = mergedFieldProps.value

      const labelFieldPath = toPath(labelField)
      const valueFieldPath = toPath(valueField)

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
        ...rest
      } = mergedFieldProps.value
      return {
        ...rest,
        value: field.value.value ?? null,
      }
    })

    const selectedLabel = computed(() => {
      const selectedValue = field.value.value
      const valueLabelOption = normalizedOptions.value.find(item => item.value === selectedValue)
      return valueLabelOption ? (valueLabelOption.label ?? selectedValue) : selectedValue
    })

    return {
      field,
      empty,
      emptyDom,
      selectedLabel,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
      nRadioGroupProps,
      normalizedOptions,
    }
  },
  render() {
    if (!this.field.show.value) {
      return
    }
    return (
      <ProFormItem {...this.proFormItemProps}>
        {{
          ...this.$slots,
          default: () => {
            let dom: VNodeChild
            if (this.mergedReadonly) {
              dom = this.empty
                ? this.emptyDom
                : <span>{this.selectedLabel}</span>
            }
            else {
              dom = (
                <NRadioGroup {...this.nRadioGroupProps}>
                  {{
                    default: () => {
                      const { type, flexProps = {} } = this.mergedFieldProps
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
                  readonly: this.mergedReadonly,
                  inputProps: {
                    ...this.nRadioGroupProps,
                    options: this.normalizedOptions,
                  },
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
