<markdown>
# 基本展示
</markdown>

<script lang="tsx">
import type { ProLayoutMode } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'
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
    const mode = ref<ProLayoutMode>('vertical')
    return {
      mode,
    }
  },
})
</script>

<template>
  <div class="h-500px">
    <pro-layout :mode="mode">
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
  <n-select
    v-model:value="mode"
    :options="[
      { label: '竖向布局', value: 'vertical' },
      { label: '横向布局', value: 'horizontal' },
      { label: '双栏布局', value: 'two-column' },
      { label: '混合双栏布局', value: 'mixed-two-column' },
      { label: '侧边栏布局', value: 'sidebar' },
      { label: '全内容布局', value: 'full-content' },
      { label: '混合侧边栏布局', value: 'mixed-sidebar' },
    ]"
  />
</template>
