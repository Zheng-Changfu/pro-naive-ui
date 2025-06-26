<markdown>
# 手动控制展开/收起
</markdown>

<script setup lang="tsx">
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <n-switch v-model:value="show" class="mb-8px">
    <template #checked>
      收起
    </template>
    <template #unchecked>
      展开
    </template>
  </n-switch>
  <pro-card title="卡片" :show="show">
    卡片内容
  </pro-card>
</template>
