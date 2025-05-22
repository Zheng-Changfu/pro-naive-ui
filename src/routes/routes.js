export const zhDocRoutes = [
  {
    path: 'introduction',
    component: () => import('../pages/docs/introduction/zhCN/index.md'),
  },
  {
    path: 'installation',
    component: () => import('../pages/docs/installation/zhCN/index.md'),
  },
  {
    path: 'supported-platforms',
    component: () => import('../pages/docs/supported-platforms/zhCN/index.md'),
  },
  {
    path: 'i18n',
    component: () => import('../pages/docs/i18n/zhCN/index.md'),
  },
  {
    path: 'changelog',
    component: () => import('../pages/docs/changelog/zhCN/index.vue'),
  },
  // {
  //   path: 'ssr',
  //   component: () => import('../pages/docs/ssr/zhCN/index.md'),
  // },
  // {
  //   path: 'nuxtjs',
  //   component: () => import('../pages/docs/nuxtjs/zhCN/index.md'),
  // },
  // {
  //   path: 'vitepress',
  //   component: () => import('../pages/docs/vitepress/zhCN/index.md'),
  // },
  // {
  //   path: 'vite-ssge',
  //   component: () => import('../pages/docs/vite-ssge/zhCN/index.md'),
  // },
]

export const zhComponentRoutes = [
  {
    path: 'card',
    component: () => import('../../packages/components/src/card/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'plain',
    component: () => import('../../packages/components/src/plains/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'config-provider',
    component: () => import('../../packages/components/src/config-provider/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'modal',
    component: () => import('../../packages/components/src/modal/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'form',
    component: () => import('../../packages/components/src/form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'field',
    component: () => import('../../packages/components/src/form/components/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'form-list',
    component: () => import('../../packages/components/src/form-list/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'modal-form',
    component: () => import('../../packages/components/src/modal-form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'drawer-form',
    component: () => import('../../packages/components/src/drawer-form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'search-form',
    component: () => import('../../packages/components/src/search-form/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'data-table',
    component: () => import('../../packages/components/src/data-table/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'edit-data-table',
    component: () => import('../../packages/components/src/edit-data-table/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'layout',
    component: () => import('../../packages/components/src/layout/demos/zhCN/index.demo-entry.md'),
  },
  {
    path: 'use-request',
    component: () => import('../../packages/components/src/composables/demos/use-request/zhCN/index.demo-entry.md'),
  },
  {
    path: 'use-n-data-table',
    component: () => import('../../packages/components/src/composables/demos/use-n-data-table/zhCN/index.demo-entry.md'),
  },
]

export const routes = [
  {
    name: 'home',
    path: '/:lang/:theme',
    component: () => import('../pages/home/index.vue'),
  },
  {
    name: 'zhDocs',
    path: '/zh-CN/:theme/docs',
    component: () => import('../pages/Layout.vue'),
    children: zhDocRoutes,
  },
  {
    name: 'zhComponents',
    path: '/zh-CN/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: zhComponentRoutes,
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
      params: {
        lang: 'zh-CN',
        theme: 'os-theme',
      },
    },
  },
]
