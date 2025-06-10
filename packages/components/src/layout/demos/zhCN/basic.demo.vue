<markdown>
# 基本展示
</markdown>

<script lang="tsx">
import type { ProLayoutMode } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'
import Config from './config.vue'
import TestContentRerender from './test-rerender/content.vue'
import TestFooterRerender from './test-rerender/footer.vue'
import TestHeaderCenterRerender from './test-rerender/header-center.vue'
import TestHeaderLeftRerender from './test-rerender/header-left.vue'
import TestHeaderRightRerender from './test-rerender/header-right.vue'
import TestLogoRerender from './test-rerender/logo.vue'
import TestSidebarExtraRerender from './test-rerender/sidebar-extra.vue'
import TestSidebarRerender from './test-rerender/sidebar.vue'
import TestTabbarRerender from './test-rerender/tabbar.vue'

export default defineComponent({
  components: {
    Config,
    TestLogoRerender,
    TestFooterRerender,
    TestTabbarRerender,
    TestContentRerender,
    TestSidebarRerender,
    TestHeaderLeftRerender,
    TestHeaderRightRerender,
    TestSidebarExtraRerender,
    TestHeaderCenterRerender,
  },
  setup() {
    const navFixed = ref(true)
    const showNav = ref(true)
    const collapsed = ref(true)
    const showFooter = ref(true)
    const showTabbar = ref(true)
    const showSidebar = ref(true)
    const footerFixed = ref(true)
    const navHeight = ref(50)
    const sidebarWidth = ref(224)
    const tabbarHeight = ref(38)
    const footerHeight = ref(50)
    const sidebarMixedWidth = ref(58)
    const sidebarCollapsedWidth = ref(58)
    const mode = ref<ProLayoutMode>('vertical')
    return {
      mode,
      showNav,
      navFixed,
      collapsed,
      navHeight,
      showFooter,
      showTabbar,
      showSidebar,
      footerFixed,
      sidebarWidth,
      tabbarHeight,
      footerHeight,
      sidebarMixedWidth,
      sidebarCollapsedWidth,
    }
  },
})
</script>

<template>
  <Config
    v-model:mode="mode"
    v-model:collapsed="collapsed"
    v-model:show-nav="showNav"
    v-model:show-footer="showFooter"
    v-model:show-tabbar="showTabbar"
    v-model:show-sidebar="showSidebar"
    v-model:footer-fixed="footerFixed"
    v-model:nav-fixed="navFixed"
    v-model:footer-height="footerHeight"
    v-model:sidebar-width="sidebarWidth"
    v-model:tabbar-height="tabbarHeight"
    v-model:nav-height="navHeight"
    v-model:sidebar-mixed-width="sidebarMixedWidth"
    v-model:sidebar-collapsed-width="sidebarCollapsedWidth"
  />
  <div class="h-500px mt-12px">
    <pro-layout
      v-model:collapsed="collapsed"
      :mode="mode"
      :show-nav="showNav"
      :show-footer="showFooter"
      :show-tabbar="showTabbar"
      :show-sidebar="showSidebar"
      :footer-fixed="footerFixed"
      :nav-fixed="navFixed"
      :footer-height="footerHeight"
      :sidebar-width="sidebarWidth"
      :tabbar-height="tabbarHeight"
      :nav-height="navHeight"
      :sidebar-mixed-width="sidebarMixedWidth"
      :sidebar-collapsed-width="sidebarCollapsedWidth"
    >
      <template #logo>
        <TestLogoRerender />
      </template>
      <template #header-left>
        <TestHeaderLeftRerender />
      </template>
      <template #header-center>
        <TestHeaderCenterRerender />
      </template>
      <template #header-right>
        <TestHeaderRightRerender />
      </template>
      <template #sidebar>
        <TestSidebarRerender />
      </template>
      <template #sidebar-extra>
        <TestSidebarExtraRerender />
      </template>
      <template #tabbar>
        <TestTabbarRerender />
      </template>
      <template #footer>
        <TestFooterRerender />
      </template>
      <template #default>
        <TestContentRerender />
      </template>
    </pro-layout>
  </div>
</template>
