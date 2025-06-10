import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeArray } from '../_utils/call'
import type { ProDataTableProps } from '../data-table'
import type { ActionGuard, ProEditDataTableColumns, RecordCreatorProps } from './types'
import { keysOf } from '../_utils/keys-of'
import { simplyOmit } from '../_utils/simply-omit'
import { proDataTableProps } from '../data-table'
import { proListFieldSharedProps } from '../form'

/**
 * v-model:editable-keys
 */
export const vModelEditableKeysProps = {
  'editableKeys': Array as PropType<Array<RowKey>>,
  'onUpdateEditableKeys': [Function, Array] as PropType<MaybeArray<(keys: Array<RowKey>) => void>>,
  'onUpdate:editableKeys': [Function, Array] as PropType<MaybeArray<(keys: Array<RowKey>) => void>>,
} as const

export const internalEditDataTableProps = {
  /**
   * 编辑表格被 form 接管数据源
   */
  ...simplyOmit(proDataTableProps, [
    'data',
  ]),
  /**
   * v-model:editable-keys
   */
  ...vModelEditableKeysProps,
  /**
   * 新建功能的配置，false 不显示
   */
  recordCreatorProps: {
    type: [Object, Boolean] as PropType<RecordCreatorProps | false>,
    default: undefined,
  },
  /**
   * 最多行数，多于该数则无法继续新增
   */
  max: Number,
  /**
   * 操作拦截器
   */
  actionGuard: Object as PropType<ActionGuard>,
  /**
   * 重写类型
   */
  columns: Array as PropType<ProEditDataTableColumns>,
  /**
   * 有冲突的属性可以写在 fieldProps 中，会透传给 pro-data-table
   */
  fieldProps: Object as PropType<ProDataTableProps>,
} as const

export const proEditDataTableProps = {
  ...internalEditDataTableProps,
  /**
   * 表格被包装成一个表单控件，支持表单控件的功能
   */
  ...proListFieldSharedProps,
} as const

export const internalEditDataTablePropKeys = keysOf(internalEditDataTableProps)
export type ProEditDataTableProps = ExtractPublicPropTypes<typeof proEditDataTableProps>
export type InternalEditDataTableProps = ExtractPublicPropTypes<typeof internalEditDataTableProps>
