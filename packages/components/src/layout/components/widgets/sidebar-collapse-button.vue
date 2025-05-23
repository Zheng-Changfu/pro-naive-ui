<script setup lang="ts">
import { VerticalLeftOutlined, VerticalRightOutlined } from '@vicons/antd'

const collapsed = defineModel<boolean>('collapsed')
function handleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div
    class="flex-center hover:text-foreground text-foreground/60 hover:bg-accent-hover bg-accent absolute bottom-2 left-3 z-10 cursor-pointer rounded-sm p-1"
    @click.stop="handleCollapsed"
  >
    <n-icon v-if="collapsed" size="small">
      <VerticalLeftOutlined />
    </n-icon>
    <n-icon v-else size="small">
      <VerticalRightOutlined />
    </n-icon>
  </div>
</template>
