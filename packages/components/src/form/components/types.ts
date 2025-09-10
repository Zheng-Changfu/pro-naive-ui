import type { IsAny, Merge, Paths } from 'type-fest'
import type { MaybeFunction, UnwrapSlots } from '../../types'
import type { ProAutoCompleteProps, ProAutoCompleteSlots } from './auto-complete'
import type { ProCascaderProps, ProCascaderSlots } from './cascader'
import type { ProCheckboxProps, ProCheckboxSlots } from './checkbox'
import type { ProCheckboxGroupProps, ProCheckboxGroupSlots } from './checkbox-group'
import type { ProColorPickerProps, ProColorPickerSlots } from './color-picker'
import type { ProDatePickerProps, ProDatePickerSlots } from './date-picker'
import type { ProDigitProps, ProDigitSlots } from './digit'
import type { ProDynamicTagsProps, ProDynamicTagsSlots } from './dynamic-tags'
import type { ProFieldSharedProps } from './field'
import type { BuiltinFieldEnum, BuiltinFieldType } from './field/enums'
import type { ProInputProps, ProInputSlots } from './input'
import type { ProInputOtpProps, ProInputOtpSlots } from './input-otp'
import type { ProMentionProps, ProMentionSlots } from './mention'
import type { ProRadioGroupProps, ProRadioGroupSlots } from './radio-group'
import type { ProRateProps, ProRateSlots } from './rate'
import type { ProSelectProps, ProSelectSlots } from './select'
import type { ProSliderProps, ProSliderSlots } from './slider'
import type { ProSwitchProps, ProSwitchSlots } from './switch'
import type { ProTimePickerProps, ProTimePickerSlots } from './time-picker'
import type { ProTransferProps, ProTransferSlots } from './transfer'
import type { ProTreeSelectProps, ProTreeSelectSlots } from './tree-select'
import type { ProUploadProps, ProUploadSlots } from './upload'

interface ProBaseFieldColumn<Values = any, ProFieldPropsParameters extends any[] = any[]> {
  /**
   * 字段路径
   */
  path?: IsAny<Values> extends true ? string : Paths<Values>
  /**
   * 透传给 ProField 组件的 props
   */
  proFieldProps?: MaybeFunction<ProFieldSharedProps, ProFieldPropsParameters>
}

interface AutoCompleteColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.AUTO_COMPLETE}`
  fieldSlots?: UnwrapSlots<ProAutoCompleteSlots>
  fieldProps?: MaybeFunction<NonNullable<ProAutoCompleteProps['fieldProps']>, FieldPropsParameters>
}

interface CheckboxColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.CHECKBOX}`
  fieldSlots?: UnwrapSlots<ProCheckboxSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCheckboxProps['fieldProps']>, FieldPropsParameters>
}

interface CascaderColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.CASCADER}`
  fieldSlots?: UnwrapSlots<ProCascaderSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCascaderProps['fieldProps']>, FieldPropsParameters>
}

interface CheckboxGroupColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.CHECKBOX_GROUP}`
  fieldSlots?: UnwrapSlots<ProCheckboxGroupSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCheckboxGroupProps['fieldProps']>, FieldPropsParameters>
}

interface ColorPickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.COLOR_PICKER}`
  fieldSlots?: UnwrapSlots<ProColorPickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProColorPickerProps['fieldProps']>, FieldPropsParameters>
}

interface DigitColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.DIGIT}`
  fieldSlots?: UnwrapSlots<ProDigitSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDigitProps['fieldProps']>, FieldPropsParameters>
}

interface DynamicTagsColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.DYNAMIC_TAGS}`
  fieldSlots?: UnwrapSlots<ProDynamicTagsSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDynamicTagsProps['fieldProps']>, FieldPropsParameters>
}

interface InputColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?:
    | `${BuiltinFieldEnum.INPUT}`
    | `${BuiltinFieldEnum.PASSWORD}`
    | `${BuiltinFieldEnum.TEXTAREA}`
  fieldSlots?: UnwrapSlots<ProInputSlots>
  fieldProps?: MaybeFunction<NonNullable<ProInputProps['fieldProps']>, FieldPropsParameters>
}

interface InputOtpColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.INPUT_OTP}`
  fieldSlots?: UnwrapSlots<ProInputOtpSlots>
  fieldProps?: MaybeFunction<NonNullable<ProInputOtpProps['fieldProps']>, FieldPropsParameters>
}

interface MentionColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.MENTION}`
  fieldSlots?: UnwrapSlots<ProMentionSlots>
  fieldProps?: MaybeFunction<NonNullable<ProMentionProps['fieldProps']>, FieldPropsParameters>
}

interface RadioGroupColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.RADIO_GROUP}`
  fieldSlots?: UnwrapSlots<ProRadioGroupSlots>
  fieldProps?: MaybeFunction<NonNullable<ProRadioGroupProps['fieldProps']>, FieldPropsParameters>
}

interface RateColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.RATE}`
  fieldSlots?: UnwrapSlots<ProRateSlots>
  fieldProps?: MaybeFunction<NonNullable<ProRateProps['fieldProps']>, FieldPropsParameters>
}

interface SelectColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.SELECT}`
  fieldSlots?: UnwrapSlots<ProSelectSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSelectProps['fieldProps']>, FieldPropsParameters>
}

interface SliderColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.SLIDER}`
  fieldSlots?: UnwrapSlots<ProSliderSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSliderProps['fieldProps']>, FieldPropsParameters>
}

interface SwitchColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.SWITCH}`
  fieldSlots?: UnwrapSlots<ProSwitchSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSwitchProps['fieldProps']>, FieldPropsParameters>
}

interface TimePickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.TIME}`
  fieldSlots?: UnwrapSlots<ProTimePickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTimePickerProps['fieldProps']>, FieldPropsParameters>
}

interface TransferColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.TRANSFER}`
  fieldSlots?: UnwrapSlots<ProTransferSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTransferProps['fieldProps']>, FieldPropsParameters>
}

interface UploadColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.UPLOAD}`
  fieldSlots?: UnwrapSlots<ProUploadSlots>
  fieldProps?: MaybeFunction<NonNullable<ProUploadProps['fieldProps']>, FieldPropsParameters>
}

interface DatePickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?:
    | `${BuiltinFieldEnum.DATE}`
    | `${BuiltinFieldEnum.DATE_TIME}`
    | `${BuiltinFieldEnum.DATE_WEEK}`
    | `${BuiltinFieldEnum.DATE_YEAR}`
    | `${BuiltinFieldEnum.DATE_MONTH}`
    | `${BuiltinFieldEnum.DATE_RANGE}`
    | `${BuiltinFieldEnum.DATE_QUARTER}`
    | `${BuiltinFieldEnum.DATE_TIME_RANGE}`
    | `${BuiltinFieldEnum.DATE_YEAR_RANGE}`
    | `${BuiltinFieldEnum.DATE_MONTH_RANGE}`
    | `${BuiltinFieldEnum.DATE_QUARTER_RANGE}`
  fieldSlots?: UnwrapSlots<ProDatePickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDatePickerProps['fieldProps']>, FieldPropsParameters>
}

interface TreeSelectColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  field?: `${BuiltinFieldEnum.TREE_SELECT}`
  fieldSlots?: UnwrapSlots<ProTreeSelectSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTreeSelectProps['fieldProps']>, FieldPropsParameters>
}

/**
 * 让用户可以扩展 ProFieldColumn 的类型
 */
export interface ProFieldCustomColumn {}

/**
 * 方便用户符合直觉的扩展类型，这里做一下包装
 */
type WrapProFieldCustomColumn<
  Column = any,
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> = Column extends {
  field?: infer F
  fieldProps?: infer P
  fieldSlots?: infer S
}
  ? Merge<ProBaseFieldColumn<Values, ProFieldPropsParameters>, {
    field?: F
    fieldSlots?: UnwrapSlots<S>
    fieldProps?: MaybeFunction<NonNullable<P>, FieldPropsParameters>
  }>
  : never

/**
 * 通用字段解释
 *  field: 渲染哪个字段组件
 *  fieldProps: 透传给字段组件的 props
 *  fieldSlots: 透传给字段组件的 slots
 *  proFieldProps: 透传给 ProField 组件的 props (ProField 是一个中间层组件，管理值以及控制渲染，处理完后下发给 FormItem 以及表单项组件)
 */
export type ProFieldColumn<
  Values = any,
  ExtraProps extends object = object,
  FunctionalFieldPropsParameters extends any[] = any[],
  FunctionalProFieldPropsParameters extends any[] = any[],
> =
  | Merge<RateColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<DigitColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<InputColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<SelectColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<SliderColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<SwitchColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<UploadColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<MentionColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<CascaderColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<TransferColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<CheckboxColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<InputOtpColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<RadioGroupColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<TimePickerColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<DatePickerColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<TreeSelectColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<ColorPickerColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<DynamicTagsColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<AutoCompleteColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<CheckboxGroupColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | (
    ProFieldCustomColumn extends { column: infer CustomColumn }
      ? Merge<WrapProFieldCustomColumn<CustomColumn, Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
      : never
  )

export type ProFieldColumnType = BuiltinFieldType
