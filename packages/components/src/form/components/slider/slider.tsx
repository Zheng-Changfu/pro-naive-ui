import type { SliderProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProSliderSlots } from './slots'
import { NSlider } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proSliderProps } from './props'

const name = 'ProSlider'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proSliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<SliderProps>(props, name)

    const {
      readonlyText,
    } = useFieldUtils(field)

    const nSliderProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null as any,
      }
    })

    return {
      field,
      readonlyText,
      nSliderProps,
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
              dom = this.readonlyText
            }
            else {
              dom = (
                <NSlider
                  {...this.nSliderProps}
                  v-slots={this.$slots}
                >
                </NSlider>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nSliderProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
