<markdown>
# 接入菜单
</markdown>

<script lang="tsx">
import type { ProLayoutMode } from 'pro-naive-ui'
import { useLayoutMenu } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'
import TestContentRerender from './test-rerender/content.vue'
import TestLogoRerender from './test-rerender/logo.vue'
import { menuOptions } from './test-rerender/menus'

export default defineComponent({
  components: {
    TestLogoRerender,
    TestContentRerender,
  },
  setup() {
    const mode = ref<ProLayoutMode>('sidebar')

    const {
      layout,
      activeKey,
      collapsed,
      expandedKeys,
    } = useLayoutMenu({
      mode,
      menus: menuOptions,
    })

    return {
      mode,
      layout,
      activeKey,
      collapsed,
      expandedKeys,
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
      <template #header-center>
        <n-menu v-bind="layout.horizontalMenuProps" />
      </template>
      <template #sidebar>
        <h3>2</h3>
        <n-scrollbar class="flex-[1_0_0]">
          <n-menu v-bind="layout.verticalMenuProps" />
        </n-scrollbar>
        <h3>2</h3>
      </template>
      <template #sidebar-extra>
        <h3>3</h3>
        <n-scrollbar class="flex-[1_0_0]">
          <n-menu v-bind="layout.verticalExtraMenuProps" />
        </n-scrollbar>
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
