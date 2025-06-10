import type { CreateRowKey } from 'naive-ui/es/data-table/src/interface'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProCardProps } from '../card'
import type { ProDataTableColumns, ProDataTableDragSortOptions } from './types'
import { dataTableProps } from 'naive-ui'
import { keysOf } from '../_utils/keys-of'

export const proDataTableExtendProps = {
  /**
   * 表格标题
   */
  title: String,
  /**
   * 提示文字，显示在标题的右边
   */
  tooltip: [String, Array] as PropType<string | string[]>,
  /**
   * 包裹表格卡片的配置
   */
  tableCardProps: Object as PropType<ProCardProps>,
  /**
   * 拖拽排序选项
   */
  dragSortOptions: Object as PropType<ProDataTableDragSortOptions>,
} as const

export const proDataTableProps = {
  ...dataTableProps,
  ...proDataTableExtendProps,
  /**
   * 重写类型
   */
  columns: Array as PropType<ProDataTableColumns>,
  /**
   * 重写类型
   */
  rowKey: [String, Function] as PropType<string | CreateRowKey<any>>,
} as const

export const proDataTablePropKeys = keysOf(proDataTableProps)
export type ProDataTableProps = ExtractPublicPropTypes<typeof proDataTableProps>
export type ProDataTableExtendProps = ExtractPublicPropTypes<typeof proDataTableExtendProps>
