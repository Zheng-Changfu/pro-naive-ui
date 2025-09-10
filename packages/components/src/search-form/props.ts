import type { FormItemProps, GridItemProps, GridProps } from 'naive-ui'
import type { Simplify } from 'type-fest'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProButtonProps } from '../button'
import type { CreateProSearchFormReturn } from './composables/create-pro-search-form'
import type { ProSearchFormColumns } from './types'
import { gridProps } from 'naive-ui'
import { simplyOmit } from '../_utils/simply-omit'
import { proFormProps } from '../form'

export const proSearchFormExtendProps = {
  /**
   * 表单项集合
   */
  columns: Array as PropType<ProSearchFormColumns>,
  /**
   * 重置按钮的属性，false 不显示
   */
  resetButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 查询按钮的属性，false 不显示
   */
  searchButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 展开收起按钮的属性，false 不显示
   */
  collapseButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 透传给 NGrid 的属性，某些属性有冲突时可能有用
   */
  gridProps: {
    type: Object as PropType<Simplify<Omit<
      GridProps,
      | 'collapsed'
    >>>,
  },
  /**
   * 是否显示后缀(收起、重置、查询)
   */
  showSuffixGridItem: {
    type: Boolean,
    default: true,
  },
  /**
   * 后缀(收起、重置、查询) GridItem 的属性
   */
  suffixGridItemProps: Object as PropType<Omit<GridItemProps, 'suffix'>>,
  /**
   * 后缀(收起、重置、查询) FormItem 的属性
   */
  suffixFormItemProps: Object as PropType<FormItemProps>,
} as const

export const proSearchFormProps = {
  ...simplyOmit(gridProps, [
    'collapsed',
  ]),
  ...proFormProps,
  ...proSearchFormExtendProps,
  /**
   * 重写默认值
   */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: 80,
  },
  /**
   * 重写默认值
   */
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'left',
  },
  /**
   * 重写默认值
   */
  xGap: {
    type: [String, Number] as PropType<string | number>,
    default: 24,
  },
  /**
   * 重写默认值
   */
  responsive: {
    type: String as PropType<'self' | 'screen'>,
    default: 'screen',
  },
  /**
   * 重写默认值
   */
  cols: {
    type: [String, Number] as PropType<string | number>,
    default: '1 s:2 l:3',
  },
  /**
   * 查询表单控制器
   */
  form: {
    type: Object as PropType<CreateProSearchFormReturn>,
    required: true,
  },
} as const

export type ProSearchFormProps = ExtractPublicPropTypes<typeof proSearchFormProps>
export type ProSearchFormExtendProps = ExtractPublicPropTypes<typeof proSearchFormExtendProps>
