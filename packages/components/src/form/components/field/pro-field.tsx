import type { SlotsType } from 'vue'
import type { ProFieldSlots } from './slots'
import { defineComponent } from 'vue'
import { ProFormItem } from '../form-item'
import { useProField } from './composables/use-pro-field'
import { proFieldProps } from './props'

const name = 'ProField'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proFieldProps,
  slots: Object as SlotsType<ProFieldSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField(props, name)

    return {
      mergedReadonly,
      mergedFieldProps,
      show: field.show,
      proFormItemProps,
    }
  },
  render() {
    if (!this.show) {
      return null
    }

    return (
      <ProFormItem {...this.proFormItemProps}>
        {{
          label: this.$slots.label,
          feedback: this.$slots.feedback,
          default: () => this.$slots.input({
            readonly: this.mergedReadonly,
            inputProps: this.mergedFieldProps,
          }),
        }}
      </ProFormItem>
    )
  },
})
