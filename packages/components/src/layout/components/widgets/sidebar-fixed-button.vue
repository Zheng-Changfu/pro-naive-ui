<script setup lang="ts">
import { PushpinFilled, PushpinOutlined } from '@vicons/antd'

const expandOnHover = defineModel<boolean>('expandOnHover')

function toggleFixed() {
  expandOnHover.value = !expandOnHover.value
}
</script>

<template>
  <div
    class="flex-center hover:text-foreground text-foreground/60 hover:bg-accent-hover bg-accent absolute bottom-2 right-3 z-10 cursor-pointer rounded-sm p-[5px] transition-all duration-300"
    @click="toggleFixed"
  >
    <n-icon v-if="!expandOnHover" size="small">
      <PushpinOutlined />
    </n-icon>
    <n-icon v-else size="small">
      <PushpinFilled />
    </n-icon>
  </div>
</template>
