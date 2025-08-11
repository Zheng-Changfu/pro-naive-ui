import type { SlotsType, VNodeChild } from 'vue'
import type { ProDataTableProps } from '../../data-table'
import type { ProEditDataTableInst } from '../inst'
import type { ProEditDataTableSlots } from '../slots'
import { useInjectField } from 'pro-composables'
import { computed, defineComponent, provide } from 'vue'
import { keep } from '../../_utils/keep'
import { resolveSlotWithProps } from '../../_utils/resolve-slot'
import { ProDataTable } from '../../data-table'
import { proDataTablePropKeys } from '../../data-table/props'
import { useFieldUtils } from '../../form'
import { editDataTableInjectionKey, provideProEditDataTableInst } from '../context'
import { internalEditDataTableProps } from '../props'
import { useColumns } from './composables/use-columns'
import { useEditable } from './composables/use-editable'
import { useProDataTableInst } from './composables/use-pro-data-table-inst'
import CreatorButton from './creator-button'

export default defineComponent({
  name: 'EditDataTable',
  props: internalEditDataTableProps,
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props, { expose }) {
    const {
      sort,
      page,
      filter,
      filters,
      scrollTo,
      clearSorter,
      downloadCsv,
      clearFilter,
      clearFilters,
      proDataTableInst,
    } = useProDataTableInst()

    const {
      columns,
    } = useColumns(props)

    const {
      editableKeys,
    } = useEditable(props)

    const {
      readonly,
    } = useFieldUtils()

    const {
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
      value: list,
    } = useInjectField(true)!

    const proDataTableProps = computed<ProDataTableProps>(() => {
      return {
        ...keep(props, proDataTablePropKeys),
        ...keep(props.fieldProps ?? {}, proDataTablePropKeys),
        data: list.value,
        ref: proDataTableInst,
        columns: columns.value,
        tableCardProps: {
          bordered: false,
          ...(props.tableCardProps ?? {}),
        },
      }
    })

    const showCreatorButton = computed(() => {
      const { max, recordCreatorProps } = props
      return readonly.value !== true
        && recordCreatorProps !== false
        && list.value.length < (max ?? Number.POSITIVE_INFINITY)
    })

    const exposed: ProEditDataTableInst = {
      // #region pro-data-table 方法
      sort,
      page,
      filter,
      filters,
      scrollTo,
      clearSorter,
      downloadCsv,
      clearFilter,
      clearFilters,
      // #endregion
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
    }

    expose(exposed)
    provideProEditDataTableInst(exposed)
    provide(editDataTableInjectionKey, {
      editableKeys,
    })
    return {
      showCreatorButton,
      proDataTableProps,
    }
  },
  render() {
    return (
      <ProDataTable {...this.proDataTableProps}>
        {{
          ...this.$slots,
          table: (params: { tableDom: VNodeChild }) => {
            const editTableDom = [
              params.tableDom,
              this.showCreatorButton && (
                <CreatorButton
                  rowKey={this.$props.rowKey}
                  actionGuard={this.$props.actionGuard}
                  childrenKey={this.$props.childrenKey}
                  recordCreatorProps={this.$props.recordCreatorProps}
                />
              ),
            ]
            return resolveSlotWithProps(this.$slots.table, { tableDom: editTableDom }, () => editTableDom)
          },
        }}
      </ProDataTable>
    )
  },
})
