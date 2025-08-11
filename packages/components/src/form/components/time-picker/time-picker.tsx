import type { TimePickerProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTimePickerSlots } from './slots'
import { NTimePicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { isEmptyValue } from '../../../_utils/is-empty-value'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { stringifyDate } from '../date-picker/utils/stringify-date'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { useMergeFormat } from './composables/use-merge-format'
import { proTimePickerProps } from './props'

const name = 'ProTime'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proTimePickerProps,
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<TimePickerProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const mergedFormat = useMergeFormat(mergedFieldProps.value)

    const vModelProps = computed<TimePickerProps>(() => {
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

    const nTimePickerProps = computed<TimePickerProps>(() => {
      const {
        value,
        onUpdateValue,
        formattedValue,
        onUpdateFormattedValue,
        ...rest
      } = mergedFieldProps.value
      return {
        ...rest as any,
        ...vModelProps.value,
      }
    })

    const displayDateText = computed(() => {
      return stringifyDate(
        field.value.value,
        mergedFormat.value,
      )
    })

    return {
      field,
      empty,
      emptyDom,
      forwardRef,
      mergedReadonly,
      proFormItemProps,
      nTimePickerProps,
      displayDateText,
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
                : <span>{this.displayDateText}</span>
            }
            else {
              dom = (
                <NTimePicker
                  ref={this.forwardRef}
                  {...this.nTimePickerProps}
                  v-slots={this.$slots}
                >
                </NTimePicker>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nTimePickerProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
