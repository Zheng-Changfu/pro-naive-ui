import type { TreeSelectInst, TreeSelectOption } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTreeSelectSlots } from '../slots'
import { get, isArray, noop } from 'lodash-es'
import { NFlex, NTreeSelect, treeSelectProps } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent, ref } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectTreeSelectInstStore } from '../inst'

type Key = string | number

export default defineComponent({
  name: 'TreeSelect',
  // 这个 props 类型复杂会导致构建类型声明文件失败，先用 any 解决
  props: treeSelectProps as any,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  inheritAttrs: false,
  setup(props) {
    const instRef = ref<TreeSelectInst>()

    const {
      registerInst,
    } = useInjectTreeSelectInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const nTreeSelectProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null,
      }
    })

    const optionKeyToInfoMap = computed(() => {
      const {
        options = [],
        keyField = 'key',
        childrenField = 'children',
      } = props

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
      const selectedValue = isArray(value.value) ? value.value : [value.value]
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
      } = props

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

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
      blurInput: () => instRef.value?.blurInput(),
      focusInput: () => instRef.value?.focusInput(),
      getCheckedData: () => instRef.value!.getCheckedData(),
      getIndeterminateData: () => instRef.value!.getIndeterminateData(),
    })
    return {
      empty,
      instRef,
      readonly,
      emptyDom,
      selectedLabels,
      nTreeSelectProps,
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
        <NTreeSelect
          ref="instRef"
          {...this.$attrs}
          {...this.nTreeSelectProps}
          v-slots={this.$slots}
        >
        </NTreeSelect>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nTreeSelectProps,
        })
      : dom
  },
})
