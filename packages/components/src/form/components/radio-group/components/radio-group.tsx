import type { FlexProps, RadioGroupProps, RadioProps } from 'naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import type { ProRadioGroupSlots } from '../slots'
import { get, omit } from 'lodash-es'
import { NFlex, NRadio, NRadioGroup, radioGroupProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { resolveSlot } from '../../../../_utils/resolveSlot'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'RadioGroup',
  inheritAttrs: false,
  props: {
    labelField: String,
    valueField: String,
    flexProps: Object as PropType<FlexProps>,
    options: Array as PropType<Array<RadioProps & ([x: string])>>,
    ...radioGroupProps,
  },
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup(props) {
    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const normalizedOptions = computed(() => {
      const {
        options = [],
        labelField = 'label',
        valueField = 'value',
      } = props

      return options.map((item) => {
        const label = get(item, labelField)
        const value = get(item, valueField)
        return {
          ...omit(item, [labelField, valueField]),
          label,
          value,
        }
      })
    })

    const nRadioGroupProps = computed<RadioGroupProps>(() => {
      const {
        options,
        flexProps,
        labelField,
        valueField,
        ...rest
      } = props
      return rest
    })

    const selectedLabel = computed(() => {
      const selectedValue = value.value
      const valueLabelOption = normalizedOptions.value.find(item => item.value === selectedValue)
      return valueLabelOption ? (valueLabelOption.label ?? selectedValue) : selectedValue
    })
    return {
      empty,
      value,
      readonly,
      emptyText,
      selectedLabel,
      nRadioGroupProps,
      normalizedOptions,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyText
        : this.$slots.default
          ? this.value
          : this.selectedLabel
    }
    else {
      dom = (
        <NRadioGroup
          {...this.$attrs}
          {...this.nRadioGroupProps}
        >
          {{
            default: () => {
              return resolveSlot(this.$slots.default, () => [
                <NFlex {...(this.$props.flexProps ?? {})}>
                  {
                    this.normalizedOptions.map((item) => {
                      return <NRadio key={item.value} {...item} />
                    })
                  }
                </NFlex>,
              ])
            },
          }}
        </NRadioGroup>
      )
    }

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.nRadioGroupProps,
      })
      : dom
  },
})
