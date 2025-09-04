import type { CheckboxGroupProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProCheckboxGroupFieldProps } from './props'
import type { ProCheckboxGroupSlots } from './slots'
import { get, toPath } from 'lodash-es'
import { NCheckbox, NCheckboxGroup, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proCheckboxGroupProps } from './props'

const name = 'ProCheckboxGroup'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proCheckboxGroupProps,
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<ProCheckboxGroupFieldProps>(props, name)

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

    const nCheckboxGroupProps = computed<CheckboxGroupProps>(() => {
      const {
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

    const selectedLabels = computed(() => {
      const selectedValue = field.value.value ?? []
      return normalizedOptions.value
        .filter(item => selectedValue.includes(item.value))
        .map(item => item.label)
    })

    return {
      field,
      empty,
      emptyDom,
      selectedLabels,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
      normalizedOptions,
      nCheckboxGroupProps,
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
                : <span>{this.selectedLabels.join('，')}</span>
            }
            else {
              dom = (
                <NCheckboxGroup {...this.nCheckboxGroupProps}>
                  {{
                    default: () => {
                      const flexProps = this.mergedFieldProps.flexProps ?? {}
                      return (
                        <NFlex {...flexProps}>
                          {
                            this.normalizedOptions.map((item) => {
                              return <NCheckbox key={item.value} {...item} />
                            })
                          }
                        </NFlex>
                      )
                    },
                  }}
                </NCheckboxGroup>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: {
                    ...this.nCheckboxGroupProps,
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
