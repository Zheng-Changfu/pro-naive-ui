import type { CheckboxProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from './slots'
import { NCheckbox } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proCheckboxProps } from './props'

const name = 'ProCheckbox'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<CheckboxProps>(props, name)

    const nCheckboxProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        checked: field.value.value ?? false,
        disabled: mergedReadonly.value || mergedFieldProps.value.disabled,
      }
    })

    return {
      field,
      forwardRef,
      mergedReadonly,
      nCheckboxProps,
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
            const dom = (
              <NCheckbox
                ref={this.forwardRef}
                {...this.nCheckboxProps}
                v-slots={this.$slots}
              >
              </NCheckbox>
            )
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nCheckboxProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
