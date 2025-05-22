import { NSpace, NTag } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

export function renderMenuLabel(option) {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label
  }
  return h(
    RouterLink,
    {
      to: option.path,
    },
    { default: () => option.label },
  )
}

function renderNewTag(isZh) {
  return h(
    NTag,
    { type: 'success', size: 'small', round: true, bordered: false },
    { default: isZh ? () => '新' : () => 'New' },
  )
}

function renderItemExtra(rawItem, isZh) {
  if (!rawItem.enSuffix || !isZh) {
    return rawItem.isNew ? renderNewTag : undefined
  }
  const renderEn = () =>
    h(
      NSpace,
      { inline: true, size: 6, wrapItem: false, align: 'center' },
      { default: () => [rawItem.en, renderNewTag(isZh)] },
    )
  return rawItem.isNew ? renderEn : rawItem.en
}
function getItemExtraString(rawItem, isZh) {
  if (!rawItem.enSuffix || !isZh) {
    return ''
  }
  else {
    return rawItem.en
  }
}

function appendCounts(item) {
  if (!item.children) {
    item.count = 1
    return item
  }
  if (item.children) {
    item.children.forEach(appendCounts)
    item.count = item.children.reduce((sum, item) => sum + item.count, 0)
    if (item.type === 'group') {
      item.en += ` (${item.count})`
      item.zh += ` (${item.count})`
    }
    return item
  }
}

function createItems(lang, theme, prefix, items) {
  const isZh = lang === 'zh-CN'
  const langKey = isZh ? 'zh' : 'en'
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      key: rawItem.en,
      label: rawItem[langKey] || rawItem.en,
      extra: renderItemExtra(rawItem, isZh),
      extraString: getItemExtraString(rawItem, isZh),
      path: rawItem.path
        ? `/${lang}/${theme}${prefix}${rawItem.path}`
        : undefined,
    }
    if (rawItem.children) {
      item.children = createItems(lang, theme, prefix, rawItem.children)
    }
    return item
  })
}

export function createDocumentationMenuOptions({ lang, theme }) {
  return createItems(lang, theme, '/docs', [
    {
      en: 'Introduction',
      zh: '介绍',
      type: 'group',
      children: [
        {
          en: 'Pro Naive UI',
          zh: 'Pro Naive UI',
          path: '/introduction',
        },
      ],
    },
    {
      en: 'Getting Started',
      zh: '快速上手',
      type: 'group',
      children: [
        {
          en: 'Installation',
          zh: '安装',
          path: '/installation',
        },
        {
          en: 'Supported Platforms',
          zh: '支持的平台',
          path: '/supported-platforms',
        },
      ],
    },
    {
      en: 'Guides',
      zh: '指南',
      type: 'group',
      children: [
        // {
        //   en: 'Server-Sider Rendering',
        //   zh: '服务端渲染 SSR',
        //   path: '/ssr',
        // },
        {
          en: 'Internationalization',
          zh: '国际化',
          path: '/i18n',
        },
      ],
    },
    {
      en: 'Version',
      zh: '版本',
      type: 'group',
      children: [
        {
          en: 'Change Log',
          zh: '变更日志',
          path: '/changelog',
        },
      ],
    },
  ])
}

export function createComponentMenuOptions({ lang, theme }) {
  return createItems(lang, theme, '/components', [
    appendCounts({
      zh: '表单组件',
      en: 'Data Input Components',
      type: 'group',
      children: [
        {
          en: 'ProForm',
          zh: '表单',
          enSuffix: true,
          path: '/form',
        },
        {
          en: 'ProField',
          zh: '表单项',
          enSuffix: true,
          path: '/field',
        },
        {
          en: 'ProFormList',
          zh: '结构化列表',
          enSuffix: true,
          path: '/form-list',
        },
        {
          en: 'ProModalForm',
          zh: '弹窗表单',
          enSuffix: true,
          path: '/modal-form',
        },
        {
          en: 'ProDrawerForm',
          zh: '抽屉表单',
          enSuffix: true,
          path: '/drawer-form',
        },
        {
          en: 'ProSearchForm',
          zh: '查询表单',
          enSuffix: true,
          path: '/search-form',
        },
      ],
    }),
    appendCounts({
      zh: '其他组件',
      en: 'Other Components',
      type: 'group',
      children: [
        {
          en: 'ProCard',
          zh: '卡片',
          enSuffix: true,
          path: '/card',
        },
        {
          en: 'ProModal',
          zh: '模态框',
          enSuffix: true,
          path: '/modal',
        },
        {
          en: 'PlainComponent',
          zh: '简约组件',
          enSuffix: true,
          path: '/plain',
        },
        {
          en: 'ProConfigProvider',
          zh: '全局配置',
          enSuffix: true,
          path: '/config-provider',
        },
        {
          en: 'ProDataTable',
          zh: '数据表格',
          enSuffix: true,
          path: '/data-table',
        },
        {
          en: 'ProEditDataTable',
          zh: '编辑表格',
          enSuffix: true,
          path: '/edit-data-table',
          isNew: true,
        },
        {
          en: 'ProLayout',
          zh: '布局',
          enSuffix: true,
          path: '/layout',
        },
        // {
        //   en: 'ProTree',
        //   zh: '树',
        //   enSuffix: true,
        //   path: '/tree',
        // },
        // {
        //   en: 'ProButton',
        //   zh: '按钮',
        //   enSuffix: true,
        //   path: '/button',
        // },
      ],
    }),
    appendCounts({
      zh: 'Composables',
      en: 'Composables',
      type: 'group',
      children: [
        {
          zh: 'useRequest',
          en: 'useRequest',
          path: '/use-request',
          enSuffix: false,
        },
        {
          zh: 'useNDataTable',
          en: 'useNDataTable',
          path: '/use-n-data-table',
          enSuffix: false,
        },
      ],
    }),
  ])
}
