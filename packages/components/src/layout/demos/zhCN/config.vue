<script setup lang='tsx'>
import type { ProLayoutMode } from 'pro-naive-ui'

const mode = defineModel<ProLayoutMode>('mode')
const showNav = defineModel<boolean>('showNav')
const isMobile = defineModel<boolean>('isMobile')
const showLogo = defineModel<boolean>('showLogo')
const navFixed = defineModel<boolean>('navFixed')
const navHeight = defineModel<number>('navHeight')
const collapsed = defineModel<boolean>('collapsed')
const showFooter = defineModel<boolean>('showFooter')
const showTabbar = defineModel<boolean>('showTabbar')
const showSidebar = defineModel<boolean>('showSidebar')
const footerFixed = defineModel<boolean>('footerFixed')
const sidebarWidth = defineModel<number>('sidebarWidth')
const tabbarHeight = defineModel<number>('tabbarHeight')
const footerHeight = defineModel<number>('footerHeight')
const sidebarCollapsedWidth = defineModel<number>('sidebarCollapsedWidth')

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
</template>
