<script lang="ts">
import { useMemo } from 'vooks'
// Frame component for components & docs page
import { computed, defineComponent, ref, toRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useComponentOptions, useDocOptions } from '../store'
import { renderMenuLabel } from '../store/menu-options'
import AdBanner from '../utils/AdBanner.vue'
import { useIsMobile, useIsTablet } from '../utils/composables'
import { findMenuValue } from '../utils/route'
import SiteFooter from './home/Footer.vue'

export default defineComponent({
  components: {
    SiteFooter,
    AdBanner,
  },
  setup() {
    const route = useRoute()
    const layoutInstRef = ref(null) as any
    const docOptionsRef = useDocOptions()
    const componentOptionsRef = useComponentOptions()
    const optionsRef = computed(() => {
      const a = route.path.includes('/docs/')
        ? docOptionsRef.value
        : componentOptionsRef.value
      return a
    },

    )

    const menuValueRef = computed(() => {
      return findMenuValue(optionsRef.value, route.path)
    })
    watch(toRef(route, 'path'), (value, oldValue) => {
      const langAndThemeReg = /\/(zh-CN)\/(light|dark|os-theme)/g
      // only theme & lang change do not restore the scroll status
      if (
        value.replace(langAndThemeReg, '')
        !== oldValue.replace(langAndThemeReg, '')
      ) {
        layoutInstRef.value.scrollTo(0, 0)
      }
    })
    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()

    return {
      layoutScrollbarProps: {
        containerClass: 'document-scroll-container',
      },
      renderMenuLabel,
      showSider: useMemo(() => {
        return !isMobileRef.value && !isTabletRef.value
      }),
      layoutInstRef,
      options: optionsRef,
      menuValue: menuValueRef,
      isMobile: isMobileRef,
    }
  },
})
</script>

<template>
  <n-layout
    id="doc-layout"
    :has-sider="showSider"
    :position="isMobile ? 'static' : 'absolute'"
    :style="{
      top: isMobile ? '' : 'var(--header-height)',
    }"
  >
    <n-layout-sider
      v-if="showSider"
      :native-scrollbar="false"
      :collapsed-width="0"
      collapse-mode="transform"
      trigger-style="top: 240px;"
      collapsed-trigger-style="top: 240px; right: -20px;"
      bordered
      show-trigger="arrow-circle"
    >
      <!-- 广告横幅 -->
      <AdBanner
        href="https://naive-ui-pro.pro-components.cn/"
        title="Naive UI Pro"
        subtitle="配套的中后台管理模板"
      />
      <n-menu
        :value="menuValue"
        :options="options"
        :render-label="renderMenuLabel"
      />
    </n-layout-sider>
    <n-layout
      ref="layoutInstRef"
      :scrollbar-props="layoutScrollbarProps"
      :native-scrollbar="false"
      :position="isMobile || showSider ? 'static' : 'absolute'"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <router-view />
      <SiteFooter />
    </n-layout>
  </n-layout>
</template>
