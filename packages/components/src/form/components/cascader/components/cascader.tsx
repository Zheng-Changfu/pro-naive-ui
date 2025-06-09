import type { CascaderOption } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProCascaderSlots } from '../slots'
import { get, isArray } from 'lodash-es'
import { cascaderProps, NCascader, NFlex } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectCascaderInstStore } from '../inst'

type ValueAtom = string | number

export default defineComponent({
  name: 'Cascader',
  inheritAttrs: false,
  // 这个 props 类型复杂会导致构建类型声明文件失败，先用 any 解决
  props: cascaderProps as any,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectCascaderInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const nNCascaderProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null,
      }
    })

    const optionValueToInfoMap = computed(() => {
      const {
        options = [],
        valueField = 'value',
        childrenField = 'children',
      } = props

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
      const selectedValue = isArray(value.value) ? value.value : [value.value]
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
      } = props

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

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
      getCheckedData: () => instRef.value?.getCheckedData() as any,
      getIndeterminateData: () => instRef.value?.getIndeterminateData() as any,
    })

    return {
      empty,
      value,
      instRef,
      readonly,
      emptyDom,
      selectedLabels,
      nNCascaderProps,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
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
          ref="instRef"
          {...this.$attrs}
          {...this.nNCascaderProps}
          v-slots={this.$slots}
        >
        </NCascader>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nNCascaderProps,
        })
      : dom
  },
})
