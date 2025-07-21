<markdown>
# 基本展示
</markdown>

<script setup lang="tsx">
import type { ProLayoutMode } from 'pro-naive-ui'
import { ref } from 'vue'

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
const sidebarCollapsedWidth = ref(58)
const mode = ref<ProLayoutMode>('vertical')

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
      <div v-for="item in 20" :key="item">
        main__content
      </div>
    </pro-layout>
  </div>
</template>
