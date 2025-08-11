import type { TreeSelectOption } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTreeSelectSlots } from './slots'
import { get, isArray, noop } from 'lodash-es'
import { NFlex, NTreeSelect } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proTreeSelectProps } from './props'

type Key = string | number

const name = 'ProTreeSelect'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proTreeSelectProps as any,
  slots: Object as SlotsType<ProTreeSelectSlots>,
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

    const nTreeSelectProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null,
      }
    })

    const optionKeyToInfoMap = computed(() => {
      const {
        options = [],
        keyField = 'key',
        childrenField = 'children',
      } = mergedFieldProps.value

      const map = new Map<Key, {
        option: TreeSelectOption
        parentValue: Key | null
      }>()

      eachTree(
        options as TreeSelectOption[],
        (item, _, { parent }) => {
          const key = get(item, keyField) as Key
          map.set(key, {
            option: item,
            parentValue: get(parent, keyField, null) as Key | null,
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
        const labelNodes = findLabelNodesByKey(value as Key)
        labels.push(...labelNodes)
      }
      return labels
    })

    function findLabelNodesByKey(key: Key) {
      const {
        renderTag,
        renderLabel,
        showPath = false,
        separator = ' / ',
        labelField = 'label',
      } = mergedFieldProps.value

      const labels: VNodeChild[] = []
      let info = optionKeyToInfoMap.value.get(key)
      while (info) {
        let label = get(info.option, labelField) as VNodeChild
        if (renderTag) {
          label = renderTag({ option: info.option, handleClose: noop })
        }
        if (renderLabel) {
          label = renderLabel({ option: info.option, checked: true, selected: true })
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
        info = optionKeyToInfoMap.value.get(info.parentValue as any)
      }
      return labels
    }
    return {
      field,
      empty,
      emptyDom,
      forwardRef,
      selectedLabels,
      mergedReadonly,
      proFormItemProps,
      nTreeSelectProps,
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
                <NTreeSelect
                  ref={this.forwardRef}
                  {...this.nTreeSelectProps}
                  v-slots={this.$slots}
                >
                </NTreeSelect>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nTreeSelectProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
