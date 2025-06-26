<markdown>
  # 提示和禁用时的提示
</markdown>

<script setup lang="tsx">
import { ref } from 'vue'

const disabled = ref(false)
</script>

<template>
  <NFlex>
    <NSwitch v-model:value="disabled" />
    <ProButton tooltip="单行提示" :disabled="disabled">
      单行提示
    </ProButton>
    <ProButton :tooltip="['提示1', '提示2']" :disabled="disabled">
      多行提示
    </ProButton>
    <ProButton disabled-tooltip="禁用时的提示" :disabled="disabled">
      禁用时的单行提示
    </ProButton>
    <ProButton :disabled-tooltip="['禁用时的提示1', '禁用时的提示2']" :disabled="disabled">
      禁用时的多行提示
    </ProButton>
    <ProButton tooltip="单行提示" disabled-tooltip="禁用时的提示" :disabled="disabled">
      禁用时和非禁用时的提示
    </ProButton>
  </NFlex>
</template>
