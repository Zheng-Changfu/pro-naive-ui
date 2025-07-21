import type { TimePickerProps } from 'naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import type { ProTimePickerSlots } from '../slots'
import { NTimePicker, timePickerProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { isEmptyValue } from '../../../../_utils/is-empty-value'
import { stringifyDate } from '../../date-picker/components/utils/stringify-date'
import { useFieldUtils } from '../../field'
import { useInjectTimePickerInstStore } from '../inst'
import { useMergeFormat } from './composables/use-merge-format'

export default defineComponent({
  name: 'TimePicker',
  inheritAttrs: false,
  /**
   * 支持 value 传递字符串
   */
  props: {
    ...timePickerProps,
    value: [String, Number] as PropType<string | number | null>,
    formattedValue: [String, Number] as PropType<string | number | null>,
  },
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectTimePickerInstStore()!

    const {
      value,
      empty,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const mergedFormat = useMergeFormat(props as any)

    /**
     * 传递了 value-format 使用 v-model:formattedValue
     * 默认使用 v-model:value
     */
    const vModelProps = computed<TimePickerProps>(() => {
      const {
        value,
        valueFormat,
        onUpdateValue,
      } = props

      if (valueFormat) {
        return {
          onUpdateFormattedValue: onUpdateValue,
          formattedValue: isEmptyValue(value) ? null : value,
        } as any
      }

      return {
        onUpdateValue,
        value: value ?? null,
      }
    })

    const nTimePickerProps = computed<TimePickerProps>(() => {
      const { value, onUpdateValue, ...rest } = props
      return {
        ...rest as any,
        ...vModelProps.value,
      }
    })

    const displayDateText = computed(() => {
      return stringifyDate(
        value.value,
        mergedFormat.value,
      )
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
    })
    return {
      empty,
      instRef,
      readonly,
      emptyDom,
      displayDateText,
      nTimePickerProps,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : <span>{this.displayDateText}</span>
    }
    else {
      dom = (
        <NTimePicker
          ref="instRef"
          {...this.$attrs}
          {...this.nTimePickerProps}
          v-slots={this.$slots}
        >
        </NTimePicker>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nTimePickerProps,
        })
      : dom
  },
})
