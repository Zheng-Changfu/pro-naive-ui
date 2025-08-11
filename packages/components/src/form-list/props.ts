import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProFormListInst } from './inst'
import { keysOf } from '../_utils/keys-of'
import { proListFieldSharedProps } from '../form'

export interface ActionGuard {
  /**
   * 添加行之前触发的回调，可以阻止添加
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  beforeAddRow: (opt: { index: number, insertIndex: number, total: number }) => boolean | Promise<boolean>
  /**
   * 添加行之后触发的回调
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  afterAddRow: (opt: { index: number, insertIndex: number, total: number }) => void
  /**
   * 删除行之前触发的回调，可以阻止删除
   * @param index 当前行索引
   * @param total 当前列表总行数
   */
  beforeRemoveRow: (opt: { index: number, total: number }) => boolean | Promise<boolean>
  /**
   * 删除行之后触发的回调
   * @param index 当前行索引
   * @param total 当前列表总行数
   */
  afterRemoveRow: (opt: { index: number, total: number }) => void
}

export type ActionRender = (opt: {
  row: any
  index: number
  total: number
  actionDom: VNodeChild
  action: ProFormListInst
}) => VNodeChild

export type ItemRender = (opt: {
  row: any
  index: number
  total: number
  itemDom: VNodeChild
  actionDom: VNodeChild
  action: ProFormListInst
}) => VNodeChild

export type ContainerRender = (opt: {
  listDom: VNodeChild
  creatorButtonDom: VNodeChild
}) => VNodeChild

export const internalFormListProps = {
/**
 * 添加一行按钮显示在顶部还是底部
 *  顶部：每次添加数据都添加在首行
 *  底部：每次添加数据都添加在尾行
 * @default 'bottom'
 */
  position: String as PropType<'top' | 'bottom'>,
  /**
   * 最少行数，删除时如果少于该数则无法删除
   */
  min: Number,
  /**
   * 最多行数，新增或复制时多于该数则无法新增或复制
   */
  max: Number,
  /**
   * 只显示第一行的 label
   */
  onlyShowFirstItemLabel: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 新增一行的默认值
   */
  creatorInitialValue: Function as PropType<() => Record<string, any>>,
  /**
   * 新增一行按钮的属性，false 不显示
   */
  creatorButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 复制按钮的属性，false 不显示
   */
  copyButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 删除按钮的属性，false 不显示
   */
  removeButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 列表操作的拦截器
   */
  actionGuard: Object as PropType<Partial<ActionGuard>>,
} as const

export const proFormListProps = {
  /**
   * FormList 本身也是一个字段，可以被校验
   */
  ...proListFieldSharedProps,
  ...internalFormListProps,
} as const

export const internalFormListPropKeys = keysOf(internalFormListProps)
export type ProFormListProps = ExtractPublicPropTypes<typeof proFormListProps>
export type ProFormListInternalProps = ExtractPublicPropTypes<typeof internalFormListProps>
