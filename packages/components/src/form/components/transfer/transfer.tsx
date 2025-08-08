import type { TransferProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTransferFieldProps } from './props'
import type { ProTransferSlots } from './slots'
import { get, toPath } from 'lodash-es'
import { NTransfer } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proTransferProps } from './props'

const name = 'ProTransfer'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<ProTransferFieldProps>(props, name)

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
        const copyedItem: any = { ...item }
        const label = get(item, labelField)
        const value = get(item, valueField)
        if (labelFieldPath.length > 0) {
          delete copyedItem[labelFieldPath[0]]
        }
        if (valueFieldPath.length > 0) {
          delete copyedItem[valueFieldPath[0]]
        }
        return {
          ...copyedItem,
          label,
          value,
        }
      })
    })

    const nTransferProps = computed<TransferProps>(() => {
      const { placeholder, ...rest } = mergedFieldProps.value
      const [s, t] = placeholder ?? []
      return {
        ...rest,
        value: field.value.value ?? null,
        options: normalizedOptions.value,
        sourceFilterPlaceholder: s as string,
        targetFilterPlaceholder: t as string,
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
      nTransferProps,
      mergedReadonly,
      proFormItemProps,
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
                <NTransfer
                  {...this.nTransferProps}
                  v-slots={this.$slots}
                >
                </NTransfer>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nTransferProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
