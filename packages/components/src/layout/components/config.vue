<script setup lang='tsx'>
const collapsed = defineModel<boolean>('collapsed')
const showNav = defineModel<boolean>('showNav')
const showFooter = defineModel<boolean>('showFooter')
const showTabbar = defineModel<boolean>('showTabbar')
const showSidebar = defineModel<boolean>('showSidebar')
const footerFixed = defineModel<boolean>('footerFixed')
const navFixed = defineModel<boolean>('navFixed')
const sidebarWidth = defineModel<number>('sidebarWidth')
const tabbarHeight = defineModel<number>('tabbarHeight')
const navHeight = defineModel<number>('navHeight')
const footerHeight = defineModel<number>('footerHeight')
const sidebarMixedWidth = defineModel<number>('sidebarMixedWidth')
const sidebarCollapsedWidth = defineModel<number>('sidebarCollapsedWidth')
</script>

<template>
  <div class="grid grid-cols-3 gap-8px">
    <div>
      <div>折叠/展开</div>
      <n-switch v-model:value="collapsed" />
    </div>
    <div>
      <div>显示侧边栏</div>
      <n-switch v-model:value="showSidebar" />
    </div>
    <div>
      <div>侧边栏宽度</div>
      <n-input-number v-model:value="sidebarWidth" />
    </div>
    <div>
      <div>侧边栏混合宽度</div>
      <n-input-number v-model:value="sidebarMixedWidth" />
    </div>
    <div>
      <div>侧边栏折叠后宽度</div>
      <n-input-number v-model:value="sidebarCollapsedWidth" />
    </div>
    <div>
      <div>显示导航栏</div>
      <n-switch v-model:value="showNav" />
    </div>
    <div>
      <div>导航栏高度</div>
      <n-input-number v-model:value="navHeight" />
    </div>
    <div>
      <div>导航栏是否固定</div>
      <n-switch v-model:value="navFixed" />
    </div>
    <div>
      <div>显示标签栏</div>
      <n-switch v-model:value="showTabbar" />
    </div>
    <div>
      <div>标签栏高度</div>
      <n-input-number v-model:value="tabbarHeight" />
    </div>
    <div>
      <div>底部高度</div>
      <n-input-number v-model:value="footerHeight" />
    </div>
    <div>
      <div>是否显示底部</div>
      <n-switch v-model:value="showFooter" />
    </div>
    <div>
      <div>底部是否固定</div>
      <n-switch v-model:value="footerFixed" />
    </div>
  </div>
</template>
