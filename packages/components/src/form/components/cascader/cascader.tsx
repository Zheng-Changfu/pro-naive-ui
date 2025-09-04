import type { CascaderOption } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProCascaderSlots } from './slots'
import { get, isArray } from 'lodash-es'
import { NCascader, NFlex } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proCascaderProps } from './props'

type ValueAtom = string | number

const name = 'ProCascader'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proCascaderProps,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nCascaderProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null,
      }
    })

    const optionValueToInfoMap = computed(() => {
      const {
        options = [],
        valueField = 'value',
        childrenField = 'children',
      } = mergedFieldProps.value

      const map = new Map<ValueAtom, {
        option: CascaderOption
        parentValue: ValueAtom | null
      }>()

      eachTree(
        options as CascaderOption[],
        (item, _, { parent }) => {
          const value = get(item, valueField) as ValueAtom
          map.set(value, {
            option: item,
            parentValue: get(parent, valueField, null) as ValueAtom | null,
          })
        },
        childrenField,
      )
      return map
    })

    const selectedLabels = computed(() => {
      const labels: VNodeChild[] = []
      const selectedValue = isArray(field.value.value) ? field.value.value : [field.value.value]
      for (const value of selectedValue) {
        const labelNodes = findLabelNodesByValue(value as ValueAtom)
        labels.push(...labelNodes)
      }
      return labels
    })

    function findLabelNodesByValue(value: ValueAtom) {
      const {
        renderLabel,
        showPath = true,
        separator = ' / ',
        labelField = 'label',
      } = mergedFieldProps.value

      const labels: VNodeChild[] = []
      let info = optionValueToInfoMap.value.get(value)
      while (info) {
        let label = get(info.option, labelField) as VNodeChild
        if (renderLabel) {
          label = renderLabel(info.option, true)
        }
        if (label) {
          if (labels.length) {
            labels.unshift(separator)
          }
          labels.unshift(<span>{label}</span>)
        }
        if (!showPath) {
          break
        };
        info = optionValueToInfoMap.value.get(info.parentValue as any)
      }
      return labels
    }

    return {
      field,
      empty,
      emptyDom,
      forwardRef,
      mergedReadonly,
      nCascaderProps,
      selectedLabels,
      proFormItemProps,
      mergedFieldProps,
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
                <NCascader
                  ref={this.forwardRef}
                  {...this.nCascaderProps}
                  v-slots={this.$slots}
                >
                </NCascader>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nCascaderProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
