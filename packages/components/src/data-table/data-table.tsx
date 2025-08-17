import type { DataTableProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProCardProps } from '../card'
import type { ProDataTableInst } from './inst'
import type { ProDataTableProps } from './props'
import type { ProDataTableSlots } from './slots'
import { NDataTable } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { resolveSlotWithProps, resolveWrappedSlot } from '../_utils/resolve-slot'
import { ProCard } from '../card'
import { useOmitProps, useOverrideProps } from '../composables'
import { useColumns } from './composables/use-columns'
import { useDraggableSort } from './composables/use-draggable-sort'
import { useNDataTableInst } from './composables/use-n-data-table-inst'
import { proDataTableExtendProps, proDataTableProps } from './props'
import style from './styles/index.cssr'
import { resolveRowKey } from './utils/resolve-row-key'

const name = 'ProDataTable'
export default defineComponent({
  name,
  props: proDataTableProps,
  slots: Object as SlotsType<ProDataTableSlots>,
  setup(props, { slots, expose }) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps<ProDataTableProps>(
      name,
      props,
    )

    const dataTableProps = useOmitProps(
      overridedProps,
      proDataTableExtendProps,
    )

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
      nDataTableInst,
    } = useNDataTableInst()

    const {
      isDragging,
      dragHandleId,
    } = useDraggableSort(overridedProps)

    const {
      columns,
    } = useColumns(overridedProps, { dragHandleId })

    const nDataTableProps = computed<DataTableProps>(() => {
      return {
        ...dataTableProps.value,
        columns: columns.value,
        rowKey: row => resolveRowKey(row, dataTableProps.value.rowKey),
      }
    })

    const tableCardExistHeader = computed(() => {
      const {
        title,
        tooltip,
        tableCardProps = {},
      } = overridedProps.value

      return !!(
        title
        || tooltip
        || slots.title
        || slots.toolbar
        || (tableCardProps ?? {}).title
        || tableCardProps.tooltip
        || tableCardProps.headerExtra
      )
    })

    const nTableCardProps = computed<ProCardProps>(() => {
      const {
        title,
        tooltip,
        tableCardProps = {},
      } = overridedProps.value

      return {
        title,
        tooltip,
        triggerAreas: [],
        segmented: false,
        showCollapse: false,
        bordered: tableCardExistHeader.value,
        ...tableCardProps,
        contentStyle: {
          ...(tableCardExistHeader.value ? {} : { padding: 0 }),
          // @ts-ignore
          ...(tableCardProps.contentStyle ?? {}),
        },
      }
    })

    useMountStyle(
      name,
      'pro-data-table',
      style,
    )

    const exposed: ProDataTableInst = {
      sort,
      page,
      filter,
      filters,
      scrollTo,
      clearFilter,
      clearSorter,
      downloadCsv,
      clearFilters,
    }
    expose(exposed)
    return {
      isDragging,
      nDataTableInst,
      nDataTableProps,
      nTableCardProps,
      mergedClsPrefix,
      flexHeight: computed(() => overridedProps.value.flexHeight),
    }
  },
  render() {
    const { mergedClsPrefix } = this
    return (
      <div class={[
        `${mergedClsPrefix}-pro-data-table`,
        {
          [`${mergedClsPrefix}-pro-data-table--tr-dragging`]: this.isDragging,
          [`${mergedClsPrefix}-pro-data-table--flex-height`]: this.flexHeight,
        },
      ]}
      >
        <ProCard {...this.nTableCardProps}>
          {{
            'header': this.$slots.title,
            'header-extra': this.$slots.toolbar,
            'default': () => {
              const tableDom = (
                <NDataTable
                  ref="nDataTableInst"
                  {...this.nDataTableProps}
                  v-slots={this.$slots}
                />
              )
              return [
                resolveWrappedSlot(this.$slots.extra, (children) => {
                  return children
                    ? <div class={[`${mergedClsPrefix}-pro-data-table__extra`]}>{children}</div>
                    : null
                }),
                resolveSlotWithProps(this.$slots.table, { tableDom }, () => tableDom),
              ]
            },
          }}
        </ProCard>
      </div>
    )
  },
})
