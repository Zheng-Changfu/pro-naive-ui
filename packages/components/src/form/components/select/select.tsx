import type { SelectProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProSelectSlots } from './slots'
import { get, isArray, isFunction, noop } from 'lodash-es'
import { NFlex, NSelect } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proSelectProps } from './props'

const name = 'ProSelect'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<SelectProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const selectedLabels = computed(() => {
      const {
        renderTag,
        renderLabel,
        options = [],
        labelField = 'label',
        valueField = 'value',
        childrenField = 'children',
      } = mergedFieldProps.value

      const labels: VNodeChild[] = []
      const selectedValue = isArray(field.value.value) ? field.value.value : [field.value.value]
      eachTree(
        options,
        (item) => {
          const value = get(item, valueField)
          if (selectedValue.includes(value)) {
            let label = get(item, labelField) as VNodeChild
            if (renderTag) {
              label = renderTag({ option: item as any, handleClose: noop })
            }
            if (renderLabel) {
              label = renderLabel(item as any, true)
            }
            if (isFunction(label)) {
              label = label(item, true)
            }
            if (label) {
              labels.push(<span>{label}</span>)
            }
          }
        },
        childrenField,
      )
      return labels
    })

    const nSelectProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null,
      }
    })
    return {
      field,
      empty,
      emptyDom,
      forwardRef,
      nSelectProps,
      selectedLabels,
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
                : (
                    <NFlex size="small">
                      {this.selectedLabels}
                    </NFlex>
                  )
            }
            else {
              dom = (
                <NSelect
                  ref={this.forwardRef}
                  {...this.nSelectProps}
                  v-slots={this.$slots}
                >
                </NSelect>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nSelectProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
