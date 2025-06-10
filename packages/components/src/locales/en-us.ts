import { createLocale, enUS as nEnUS } from 'naive-ui'

export const enUS = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title} Not Empty`
      },
    },
    placeholder: (title: string, componentName: string) => {
      switch (componentName) {
        case 'ProInput':
        case 'ProDigit':
        case 'ProMention':
        case 'ProPassword':
        case 'ProTextarea':
        case 'ProAutoComplete':
          return `Please Input ${title}`
        case 'ProDate':
        case 'ProTime':
        case 'ProSelect':
        case 'ProCascader':
        case 'ProDateTime':
        case 'ProDateYear':
        case 'ProDateWeek':
        case 'ProDateMonth':
        case 'ProTreeSelect':
        case 'ProDateQuarter':
          return `Please Select ${title}`
        case 'ProDateRange':
        case 'ProDateTimeRange':
          return ['Start Date', 'End Date']
        case 'ProDateYearRange':
          return ['Start Year', 'End Year']
        case 'ProDateMonthRange':
          return ['Start Month', 'End Month']
        case 'ProDateQuarterRange':
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
  ProSwitch: {
    checked: 'open',
    unchecked: 'close',
  },
  ProModalForm: {
    reset: 'cancel',
    submit: 'submit',
  },
  ProDrawerContent: {
    reset: 'cancel',
    submit: 'submit',
  },
  ProSearchForm: {
    reset: 'reset',
    search: 'search',
    collapse: (collapsed: boolean) => collapsed ? 'uncollapsed' : 'collapsed',
  },
  ProDataTable: {
    sortColumn: 'sort',
    indexColumn: 'Index',
  },
  ProEditDataTable: {
    add: 'add',
  },
  ProCopyableText: {
    copy: 'copy',
    copied: 'copied',
  },
} as any, nEnUS)
