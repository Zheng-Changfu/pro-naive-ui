import type { ColorPickerProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProColorPickerSlots } from './slots'
import { NColorPicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proColorPickerProps } from './props'

const name = 'ProColorPicker'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proColorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<ColorPickerProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nColorPickerProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null,
        disabled: mergedReadonly.value || mergedFieldProps.value.disabled,
      }
    })

    return {
      field,
      empty,
      emptyDom,
      mergedReadonly,
      proFormItemProps,
      nColorPickerProps,
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
            const slots = {
              ...this.$slots,
              label: this.$slots['picker-label'],
            }
            let dom: VNodeChild
            if (this.mergedReadonly && this.empty) {
              dom = this.emptyDom
            }
            else {
              dom = (
                <NColorPicker
                  {...this.nColorPickerProps}
                  v-slots={slots}
                >
                </NColorPicker>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nColorPickerProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
