import { createDatePickerFactory } from './date-picker-factory'

export {
  useMergeFormat,
} from './composables/use-merge-format'

export const ProDate = createDatePickerFactory('ProDate', 'date')
export const ProDateWeek = createDatePickerFactory('ProDateWeek', 'week')
export const ProDateYear = createDatePickerFactory('ProDateYear', 'year')
export const ProDateMonth = createDatePickerFactory('ProDateMonth', 'month')
export const ProDateTime = createDatePickerFactory('ProDateTime', 'datetime')
export const ProDateRange = createDatePickerFactory('ProDateRange', 'daterange')
export const ProDateQuarter = createDatePickerFactory('ProDateQuarter', 'quarter')
export const ProDateYearRange = createDatePickerFactory('ProDateYearRange', 'yearrange')
export const ProDateMonthRange = createDatePickerFactory('ProDateMonthRange', 'monthrange')
export const ProDateTimeRange = createDatePickerFactory('ProDateTimeRange', 'datetimerange')
export const ProDateQuarterRange = createDatePickerFactory('ProDateQuarterRange', 'quarterrange')

export type {
  ProDatePickerInst,
} from './inst'

export {
  proDatePickerProps,
  type ProDatePickerProps,
} from './props'

export * from './slots'
