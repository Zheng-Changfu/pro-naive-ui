<markdown>
# 拖拽

这玩意有时候还是需要的
</markdown>

<script setup lang="tsx">
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
</script>

<template>
  <n-flex>
    <n-button @click="show1 = true">
      card 预设
    </n-button>
    <n-button @click="show2 = true">
      dialog 预设
    </n-button>
    <n-button @click="show3 = true">
      无预设(使用 pro-card 组件)
    </n-button>
    <n-button @click="show4 = true">
      无预设(自定义 header)
    </n-button>
  </n-flex>
  <pro-modal
    v-model:show="show1"
    class="w-600px"
    preset="card"
    title="card"
    draggable
  >
    <div>这是一段内容...</div>
    <div>这是一段内容...</div>
    <div>这是一段内容...</div>
  </pro-modal>
  <pro-modal
    v-model:show="show2"
    preset="dialog"
    title="Dialog 预设"
  >
    <div>这是一段内容...</div>
    <div>这是一段内容...</div>
    <div>这是一段内容...</div>
  </pro-modal>
  <pro-modal
    v-model:show="show3"
  >
    <template #default="{ draggableClass }">
      <pro-card
        closable
        class="w-600px"
        title="无预设(使用 pro-card 组件)"
        :trigger-areas="[]"
        :show-collapse="false"
        :header-class="draggableClass"
        @close="show3 = false"
      >
        <div>这是一段内容...</div>
        <div>这是一段内容...</div>
        <div>这是一段内容...</div>
      </pro-card>
    </template>
  </pro-modal>
  <pro-modal v-model:show="show4">
    <template #default="{ draggableClass }">
      <div aria-hidden="true" class="bg-#fff w-600px px-24px py-12px rounded">
        <div class="font-bold text-18px mb-24px" :class="draggableClass">
          无预设(自定义 header)
        </div>
        <div>这是一段内容...</div>
        <div>这是一段内容...</div>
        <div>这是一段内容...</div>
      </div>
    </template>
  </pro-modal>
</template>
