<markdown>
# 触发展开的区域
</markdown>

<script setup lang="tsx">
import { computed, ref } from 'vue'

const main = ref(true)
const arrow = ref(true)

const triggerAreas = computed(() => {
  const areas: Array<'main' | 'arrow'> = []
  if (main.value)
    areas.push('main')
  if (arrow.value)
    areas.push('arrow')
  return areas
})
</script>

<template>
  <n-flex vertical>
    <n-flex>
      <n-tag v-model:checked="main" checkable>
        main
      </n-tag>
      <n-tag v-model:checked="arrow" checkable>
        arrow
      </n-tag>
    </n-flex>
  </n-flex>
  <pro-card title="卡片" :trigger-areas="triggerAreas">
    卡片内容
  </pro-card>
</template>
