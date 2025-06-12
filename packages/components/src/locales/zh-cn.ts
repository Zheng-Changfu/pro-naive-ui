import { createLocale, zhCN as nZhCN } from 'naive-ui'

export const zhCN = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title}不能为空`
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
          return `请输入${title}`
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
          return `请选择${title}`
        case 'ProDateRange':
        case 'ProDateTimeRange':
          return ['开始日期', '结束日期']
        case 'ProDateYearRange':
          return ['开始年份', '结束年份']
        case 'ProDateMonthRange':
          return ['开始月份', '结束月份']
        case 'ProDateQuarterRange':
          return ['开始季度', '结束季度']
      }
    },
  },
  ProFormList: {
    add: '添加一行数据',
    copyThisLine: '复制此项',
    removeThisLine: '删除此项',
  },
  ProUpload: {
    title: '上传',
  },
  ProCard: {
    collapse: (collapsed: boolean) => collapsed ? '展开' : '收起',
  },
  ProSwitch: {
    checked: '打开',
    unchecked: '关闭',
  },
  ProModalForm: {
    reset: '取消',
    submit: '确认',
  },
  ProDrawerContent: {
    reset: '取消',
    submit: '确认',
  },
  ProSearchForm: {
    reset: '重置',
    search: '查询',
    collapse: (collapsed: boolean) => collapsed ? '展开' : '收起',
  },
  ProDataTable: {
    sortColumn: '排序',
    indexColumn: '序号',
  },
  ProEditDataTable: {
    add: '添加一行数据',
  },
  ProCopyableText: {
    copy: '复制',
    copied: '复制成功',
  },
} as any, nZhCN)
