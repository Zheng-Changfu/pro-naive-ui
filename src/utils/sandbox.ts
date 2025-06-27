export const appCode = `<template>
  <pro-config-provider :locale="zhCN">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <n-dialog-provider>
              <Demo />
            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </pro-config-provider>
</template>

<script setup lang="ts">
import { zhCN } from 'pro-naive-ui'
import Demo from './Demo.vue'
</script>
`
