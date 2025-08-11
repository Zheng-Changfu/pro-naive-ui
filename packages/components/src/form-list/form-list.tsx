import type { SlotsType } from 'vue'
import type { ProFormListInternalProps } from './props'
import type { ProFormListSlots } from './slots'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { useForwardRef } from '../composables/use-forward-ref'
import { useProListField } from '../form/components/field'
import { ProFormItem } from '../form/components/form-item'
import FormList from './components/form-list'
import { proFormListProps } from './props'
import style from './styles/index.cssr'

const name = 'ProFormList'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props) {
    const forwardRef = useForwardRef()
    const mergedClsPrefix = useNaiveClsPrefix()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProListField<ProFormListInternalProps>(props, name)

    useMountStyle(
      name,
      'pro-form-list',
      style,
      mergedClsPrefix,
    )

    return {
      field,
      forwardRef,
      mergedReadonly,
      mergedClsPrefix,
      proFormItemProps,
      mergedFieldProps,
    }
  },
  render() {
    if (!this.field.show.value) {
      return
    }
    return (
      <ProFormItem
        class={[`${this.mergedClsPrefix}-pro-form-list-wrapper`]}
        {...this.proFormItemProps}
      >
        {{
          ...this.$slots,
          default: () => {
            return (
              <FormList
                ref={this.forwardRef}
                {...this.mergedFieldProps}
                v-slots={this.$slots}
              >
              </FormList>
            )
          },
        }}
      </ProFormItem>
    )
  },
})
