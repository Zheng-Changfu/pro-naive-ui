<markdown>
# 接入菜单
使用 `useLayoutMenu` 接入菜单，支持 `ProLayout` 的多种布局模式下的菜单数据。提醒一下，
`useLayoutMenu` 和 `ProLayout` 组件是无关的，这意味着可以在任何地方使用，比如可以满足布局是高度定制的场景。
</markdown>

<script setup lang="tsx">
import type { ProLayoutMode } from 'pro-naive-ui'
import { useLayoutMenu } from 'pro-naive-ui'
import { computed, ref } from 'vue'
import Config from './config.vue'
import { menuOptions } from './menus'

const navFixed = ref(true)
const showNav = ref(true)
const showLogo = ref(true)
const isMobile = ref(false)
const showFooter = ref(true)
const showTabbar = ref(true)
const showSidebar = ref(true)
const footerFixed = ref(true)
const navHeight = ref(50)
const sidebarWidth = ref(224)
const tabbarHeight = ref(38)
const footerHeight = ref(50)
const sidebarMixedWidth = ref(80)
const sidebarCollapsedWidth = ref(58)
const mode = ref<ProLayoutMode>('vertical')
const {
  layout,
  collapsed,
  verticalLayout,
} = useLayoutMenu({
  mode,
  menus: menuOptions,
})

const isTwoColumnLayout = computed(() => ['two-column', 'mixed-two-two-column'].includes(mode.value))
const hasHorizontalMenu = computed(() => ['horizontal', 'mixed-two-column', 'mixed-sidebar'].includes(mode.value))
</script>

<template>
  <Config
    v-model:mode="mode"
    v-model:show-nav="showNav"
    v-model:show-logo="showLogo"
    v-model:is-mobile="isMobile"
    v-model:collapsed="collapsed"
    v-model:nav-fixed="navFixed"
    v-model:nav-height="navHeight"
    v-model:show-footer="showFooter"
    v-model:show-tabbar="showTabbar"
    v-model:show-sidebar="showSidebar"
    v-model:footer-fixed="footerFixed"
    v-model:footer-height="footerHeight"
    v-model:sidebar-width="sidebarWidth"
    v-model:tabbar-height="tabbarHeight"
    v-model:sidebar-mixed-width="sidebarMixedWidth"
    v-model:sidebar-collapsed-width="sidebarCollapsedWidth"
  />
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
      :sidebar-mixed-width="sidebarMixedWidth"
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
          <n-menu v-bind="layout.verticalMenuProps" :collapsed-width="isTwoColumnLayout ? sidebarMixedWidth : sidebarCollapsedWidth" />
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
      <template #default>
        <div v-for="item in 20" :key="item">
          main__content
        </div>
      </template>
    </pro-layout>
  </div>
</template>
