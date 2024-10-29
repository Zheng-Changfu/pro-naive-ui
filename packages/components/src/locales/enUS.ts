import type { PaginationInfo } from 'naive-ui'
import { createLocale, enUS as nEnUS } from 'naive-ui'
import { type FieldValueType, ValueTypeEnum } from '../form'

export const enUS = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title} Not Empty`
      },
    },
    fieldPlaceholder: (title: string, valueType: FieldValueType) => {
      switch (valueType) {
        case ValueTypeEnum.INPUT:
        case ValueTypeEnum.DIGIT:
        case ValueTypeEnum.MENTION:
        case ValueTypeEnum.PASSWORD:
        case ValueTypeEnum.PROGRESS:
        case ValueTypeEnum.AUTO_COMPLETE:
          return `Please Input ${title}`
        case ValueTypeEnum.DATE:
        case ValueTypeEnum.TIME:
        case ValueTypeEnum.SELECT:
        case ValueTypeEnum.CASCADER:
        case ValueTypeEnum.DATE_TIME:
        case ValueTypeEnum.DATE_YEAR:
        case ValueTypeEnum.DATE_WEEK:
        case ValueTypeEnum.DATE_MONTH:
        case ValueTypeEnum.TREE_SELECT:
        case ValueTypeEnum.DATE_QUARTER:
          return `Please Select ${title}`
        case ValueTypeEnum.DATE_RANGE:
        case ValueTypeEnum.DATE_TIME_RANGE:
          return ['Start Date', 'End Date']
        case ValueTypeEnum.DATE_YEAR_RANGE:
          return ['Start Year', 'End Year']
        case ValueTypeEnum.DATE_MONTH_RANGE:
          return ['Start Month', 'End Month']
        case ValueTypeEnum.DATE_QUARTER_RANGE:
          return ['Start Quarter', 'End Quarter']
      }
    },
  },
  ProFormList: {
    add: 'add',
    copyThisLine: 'copyThisLine',
    removeThisLine: 'removeThisLine',
  },
  ProUpload: {
    title: 'Upload',
  },
  ProCard: {
    collapse: (collapsed: boolean) => collapsed ? 'uncollapsed' : 'collapsed',
  },
  ProSearchForm: {
    reset: 'reset',
    search: 'search',
    collapse: (collapsed: boolean) => collapsed ? 'uncollapsed' : 'collapsed',
  },
  ProDataTable: {
    sortColumn: 'sort',
    settingDens: 'dens',
    indexColumn: 'Index',
    settingReset: 'reset',
    settingReload: 'reload',
    settingDensLarge: 'large',
    settingDensSmall: 'small',
    settingDensMedium: 'medium',
    settingColumn: 'columnSetting',
    settingShowColumn: 'showColumn',
    settingShowIndexColumn: 'showIndexColumn',
    paginationPrefix: ({ itemCount }: PaginationInfo) => `Total is ${itemCount}.`,
  },
} as any, nEnUS)
