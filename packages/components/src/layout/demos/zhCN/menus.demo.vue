<markdown>
# 接入菜单
使用 `useLayoutMenu` 接入菜单，支持 `ProLayout` 的多种布局模式下的菜单数据。提醒一下，
`useLayoutMenu` 和 `ProLayout` 组件是无关的，这意味着可以在任何地方使用，比如可以满足布局是高度定制的场景。
</markdown>

<script setup lang="tsx">
import type { MenuOption } from 'naive-ui'
import type { ProLayoutMode } from 'pro-naive-ui'
import type { Component } from 'vue'
import {
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { useLayoutMenu } from 'pro-naive-ui'
import { computed, h, ref } from 'vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '回家',
    key: 'go-back-home',
    icon: renderIcon(HomeIcon),
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '鼠',
        key: 'rat',
        icon: renderIcon(BookIcon),
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '叙事者',
        key: 'narrator',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '羊男',
        key: 'sheep-man',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]

const navFixed = ref(true)
const showNav = ref(true)
const showLogo = ref(true)
const isMobile = ref(false)
const showFooter = ref(true)
const showTabbar = ref(true)
const collapsed = ref(false)
const showSidebar = ref(true)
const footerFixed = ref(true)
const navHeight = ref(50)
const sidebarWidth = ref(224)
const tabbarHeight = ref(38)
const footerHeight = ref(50)
const sidebarCollapsedWidth = ref(58)
const mode = ref<ProLayoutMode>('vertical')

const {
  layout,
  verticalLayout,
} = useLayoutMenu({
  mode,
  menus: menuOptions,
})

const hasHorizontalMenu = computed(() => ['horizontal', 'mixed-two-column', 'mixed-sidebar'].includes(mode.value))

function updateMode(v: ProLayoutMode) {
  mode.value = v
  isMobile.value = v === 'mobile'
}
</script>

<template>
  <div class="grid grid-cols-3 gap-8px">
    <div>
      <div>侧边栏宽度</div>
      <n-input-number v-model:value="sidebarWidth" />
    </div>
    <div>
      <div>侧边栏折叠后宽度</div>
      <n-input-number v-model:value="sidebarCollapsedWidth" />
    </div>
    <div>
      <div>导航栏高度</div>
      <n-input-number v-model:value="navHeight" />
    </div>
    <div>
      <div>标签栏高度</div>
      <n-input-number v-model:value="tabbarHeight" />
    </div>
    <div>
      <div>布局模式</div>
      <n-select
        :value="mode"
        :options="[
          { label: '竖向布局', value: 'vertical' },
          { label: '横向布局', value: 'horizontal' },
          { label: '双栏布局', value: 'two-column' },
          { label: '混合双栏布局', value: 'mixed-two-column' },
          { label: '侧边栏布局', value: 'sidebar' },
          { label: '全内容布局', value: 'full-content' },
          { label: '混合侧边栏布局', value: 'mixed-sidebar' },
          { label: '移动端布局', value: 'mobile' },
        ]"
        @update:value="updateMode"
      />
    </div>
    <div>
      <div>底部高度</div>
      <n-input-number v-model:value="footerHeight" />
    </div>
    <div>
      <div>折叠/展开</div>
      <n-switch v-model:value="collapsed" />
    </div>
    <div>
      <div>显示侧边栏</div>
      <n-switch v-model:value="showSidebar" />
    </div>
    <div>
      <div>显示顶栏</div>
      <n-switch v-model:value="showNav" />
    </div>
    <div>
      <div>顶栏是否固定</div>
      <n-switch v-model:value="navFixed" />
    </div>
    <div>
      <div>显示标签栏</div>
      <n-switch v-model:value="showTabbar" />
    </div>
    <div>
      <div>是否显示底部</div>
      <n-switch v-model:value="showFooter" />
    </div>
    <div>
      <div>底部是否固定</div>
      <n-switch v-model:value="footerFixed" />
    </div>
    <div>
      <div>是否显示 logo</div>
      <n-switch v-model:value="showLogo" />
    </div>
  </div>
  <div class="h-500px mt-12px">
    <pro-layout
      v-model:collapsed="collapsed"
      :mode="mode"
      :show-nav="showNav"
      :show-logo="showLogo"
      :is-mobile="isMobile"
      :nav-fixed="navFixed"
      :nav-height="navHeight"
      :show-footer="showFooter"
      :show-tabbar="showTabbar"
      :show-sidebar="showSidebar"
      :footer-fixed="footerFixed"
      :footer-height="footerHeight"
      :sidebar-width="sidebarWidth"
      :tabbar-height="tabbarHeight"
      :sidebar-collapsed-width="sidebarCollapsedWidth"
      logo-class="flex justify-center"
    >
      <template #logo>
        logo
      </template>
      <template #nav-left>
        <span>left</span>
        <n-popover v-if="isMobile" trigger="click" style="padding: 0;">
          <template #trigger>
            <n-button type="primary" size="small">
              菜单
            </n-button>
          </template>
          <n-scrollbar class="flex-[1_0_0]">
            <n-menu v-bind="verticalLayout.verticalMenuProps" :collapsed="false" />
          </n-scrollbar>
        </n-popover>
      </template>
      <template #nav-center>
        <n-menu v-if="hasHorizontalMenu" v-bind="layout.horizontalMenuProps" />
      </template>
      <template #sidebar>
        <n-scrollbar class="flex-[1_0_0]">
          <n-menu v-bind="layout.verticalMenuProps" :collapsed-width="sidebarCollapsedWidth" />
        </n-scrollbar>
        <n-divider />
        <n-avatar
          :style="{
            color: 'yellow',
            backgroundColor: 'red',
          }"
        >
          M
        </n-avatar>
      </template>
      <template #sidebar-extra>
        <div class="flex justify-center font-bold">
          糖....
        </div>
        <n-divider />
        <n-scrollbar class="flex-[1_0_0]">
          <n-menu v-bind="layout.verticalExtraMenuProps" :collapsed-width="sidebarCollapsedWidth" />
        </n-scrollbar>
      </template>
      <template #tabbar>
        <div>tabbar</div>
      </template>
      <template #footer>
        <div>footer</div>
      </template>
      <div v-for="item in 20" :key="item">
        main__content
      </div>
    </pro-layout>
  </div>
</template>
