import type { SlotsType } from 'vue'
import type { InternalEditDataTableProps } from './props'
import type { ProEditDataTableSlots } from './slots'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { useForwardRef } from '../composables/use-forward-ref'
import { useProListField } from '../form/components/field'
import { ProFormItem } from '../form/components/form-item'
import EditDataTable from './components/edit-data-table'
import { proEditDataTableProps } from './props'
import style from './styles/index.cssr'

const name = 'ProEditDataTable'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proEditDataTableProps,
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props) {
    const forwardRef = useForwardRef()
    const mergedClsPrefix = useNaiveClsPrefix()

    const {
      field,
      mergedReadonly,
      overridedProps,
      proFormItemProps,
      mergedFieldProps,
    } = useProListField<InternalEditDataTableProps>(props, name)

    useMountStyle(
      name,
      'pro-edit-data-table',
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
      flexHeight: computed(() => overridedProps.value.flexHeight),
    }
  },
  render() {
    if (!this.field.show.value) {
      return null
    }
    return (
      <ProFormItem
        class={[
          `${this.mergedClsPrefix}-pro-edit-data-table-wrapper`,
          {
            [`${this.mergedClsPrefix}-pro-edit-data-table-wrapper--flex-height`]: this.flexHeight,
          },
        ]}
        {...this.proFormItemProps}
      >
        {{
          ...this.$slots,
          default: () => {
            return (
              <EditDataTable
                ref={this.forwardRef}
                class={[`${this.mergedClsPrefix}-pro-edit-data-table`]}
                {...this.mergedFieldProps}
                v-slots={this.$slots}
              />
            )
          },
        }}
      </ProFormItem>
    )
  },
})
