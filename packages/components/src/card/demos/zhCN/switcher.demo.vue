<markdown>
# 自定义展开收起

如果你只是想修改文字，你可以通过[语言包](config-provider#edit-i18n.vue)完成功能
</markdown>

<script setup lang="ts"></script>

<template>
  <pro-card title="卡片">
    卡片内容
    <template #collapse="{ expanded }">
      <div v-if="expanded" class="c-red">
        折叠
      </div>
      <div v-else class="color-blue">
        打开
      </div>
    </template>
  </pro-card>
</template>
