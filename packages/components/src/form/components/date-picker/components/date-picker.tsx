import type { DatePickerProps, TimePickerProps } from 'naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import type { ProDatePickerSlots } from '../slots'
import { isArray } from 'lodash-es'
import { datePickerProps, NDatePicker, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { isEmptyValue } from '../../../../_utils/is-empty-value'
import { useFieldUtils } from '../../field'
import { useInjectDatePickerInstStore } from '../inst'
import { useMergeFormat } from './composables/use-merge-format'
import { stringifyDate } from './utils/stringify-date'

export default defineComponent({
  name: 'DatePicker',
  inheritAttrs: false,
  /**
   * 支持 value 传递字符串
   */
  props: {
    ...datePickerProps,
    placeholder: [String, Array],
    value: [String, Number, Array] as PropType<string | number | Array<string | number> | null>,
    formattedValue: [String, Number] as PropType<string | number | Array<string | number> | null>,
  },
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectDatePickerInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const mergedFormat = useMergeFormat(props as any)

    /**
     * 传递了 value-format 属性使用 v-model:formattedValue
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

    const convertedPlaceholder = computed(() => {
      const { placeholder } = props
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
      const { value, onUpdateValue, placeholder, ...rest } = props
      return {
        ...rest as any,
        ...vModelProps.value,
        ...convertedPlaceholder.value,
      }
    })

    const dateText = computed(() => {
      return stringifyDate(
        value.value,
        mergedFormat.value,
      )
    })

    const arrayableDateText = computed(() => {
      return isArray(dateText.value)
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
      dateText,
      nDatePickerProps,
      arrayableDateText,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
      if (this.empty) {
        dom = this.emptyDom
      }
      else if (this.arrayableDateText) {
        const separator = this.$slots.separator?.() ?? this.$props.separator
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
          ref="instRef"
          {...this.$attrs}
          {...this.nDatePickerProps}
          v-slots={this.$slots}
        >
        </NDatePicker>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nDatePickerProps,
        })
      : dom
  },
})
