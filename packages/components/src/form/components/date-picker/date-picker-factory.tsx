import type { DatePickerProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProDatePickerSlots } from './slots'
import { isArray } from 'lodash-es'
import { NDatePicker, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { isEmptyValue } from '../../../_utils/is-empty-value'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { useMergeFormat } from './composables/use-merge-format'
import { proDatePickerProps } from './props'
import { stringifyDate } from './utils/stringify-date'

export function createDatePickerFactory(name: string, type: DatePickerProps['type']) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: proDatePickerProps,
    slots: Object as SlotsType<ProDatePickerSlots>,
    setup(props) {
      const forwardRef = useForwardRef()

      const {
        field,
        mergedReadonly,
        proFormItemProps,
        mergedFieldProps,
      } = useProField<DatePickerProps>(props, name)

      const {
        empty,
        emptyDom,
      } = useFieldUtils(field)

      /**
       * 传递了 value-format 属性使用 v-model:formattedValue
       * 默认使用 v-model:value
       */
      const vModelProps = computed<DatePickerProps>(() => {
        const {
          valueFormat,
          onUpdateValue,
        } = mergedFieldProps.value
        if (valueFormat) {
          return {
            onUpdateFormattedValue: onUpdateValue,
            formattedValue: isEmptyValue(field.value.value) ? null : field.value.value,
          } as any
        }
        return {
          onUpdateValue,
          value: field.value.value ?? null,
        }
      })

      const convertedPlaceholder = computed(() => {
        const { placeholder } = mergedFieldProps.value
        if (!isArray(placeholder)) {
          return { placeholder }
        }
        const [sp, ep] = placeholder
        return {
          endPlaceholder: ep,
          startPlaceholder: sp,
        }
      })

      const nDatePickerProps = computed<DatePickerProps>(() => {
        const {
          value,
          placeholder,
          onUpdateValue,
          formattedValue,
          onUpdateFormattedValue,
          ...rest
        } = mergedFieldProps.value
        return {
          ...rest as any,
          ...vModelProps.value,
          ...convertedPlaceholder.value,
          type,
        }
      })

      const mergedFormat = useMergeFormat(nDatePickerProps)

      const dateText = computed(() => {
        return stringifyDate(
          field.value.value,
          mergedFormat.value,
        )
      })

      const arrayableDateText = computed(() => {
        return isArray(dateText.value)
      })

      return {
        field,
        empty,
        emptyDom,
        dateText,
        forwardRef,
        mergedReadonly,
        proFormItemProps,
        mergedFieldProps,
        nDatePickerProps,
        arrayableDateText,
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
                if (this.empty) {
                  dom = this.emptyDom
                }
                else if (this.arrayableDateText) {
                  const separator = this.$slots.separator?.() ?? this.mergedFieldProps.separator
                  const [s, e] = this.dateText as [string, string]
                  dom = (
                    <NFlex size="small">
                      <span>{s}</span>
                      {separator && <span>{separator}</span>}
                      <span>{e}</span>
                    </NFlex>
                  )
                }
                else {
                  dom = <span>{this.dateText}</span>
                }
              }
              else {
                dom = (
                  <NDatePicker
                    ref={this.forwardRef}
                    {...this.nDatePickerProps}
                    v-slots={this.$slots}
                  >
                  </NDatePicker>
                )
              }
              return this.$slots.input
                ? this.$slots.input({
                    inputDom: dom,
                    readonly: this.mergedReadonly,
                    inputProps: this.nDatePickerProps,
                  })
                : dom
            },
          }}
        </ProFormItem>
      )
    },
  })
}
