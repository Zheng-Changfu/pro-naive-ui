<markdown>
# 基本展示
</markdown>

<script lang="tsx">
import type { ProLayoutMode } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'
import Config from './config.vue'

export default defineComponent({
  components: {
    Config,
  },
  setup() {
    const navFixed = ref(true)
    const showNav = ref(true)
    const showLogo = ref(true)
    const isMobile = ref(false)
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
      showLogo,
      isMobile,
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
    >
      <template #logo>
        <div>logo</div>
      </template>
      <template #nav-left>
        <div>left</div>
      </template>
      <template #nav-center>
        <div>center</div>
      </template>
      <template #nav-right>
        <div>right</div>
      </template>
      <template #sidebar>
        <div>sidebar</div>
      </template>
      <template #sidebar-extra>
        <div>sidebarExtra</div>
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
