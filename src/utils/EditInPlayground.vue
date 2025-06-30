<script lang="ts">
import type { PropType } from 'vue'
import { strFromU8, strToU8, zlibSync } from 'fflate'
import { defineComponent } from 'vue'
import { playgroundUrl } from './playground-url'
import { appCode } from './sandbox'

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

function safeDecodeURIComponent(data: string): string {
  try {
    return decodeURIComponent(data)
  }
  catch (e) {
    console.error('Error decoding URI component:', e)
    return data
  }
}

function serialized(data: string): string {
  const code = safeDecodeURIComponent(data)
  const originCode = {
    'App.vue': appCode,
    'Demo.vue': code,
  }
  return utoa(JSON.stringify(originCode))
}

export default defineComponent({
  name: 'CopyCodeButton',
  props: {
    code: {
      type: String,
      required: true,
    },
    size: String as PropType<any>,
    depth: String,
  },
  setup(props) {
    return {
      handleClick() {
        const serializedState = serialized(props.code)
        window.open(`${playgroundUrl}/#${serializedState}`, '_blank')
      },
    }
  },
})
</script>

<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    :depth="depth"
    @click="handleClick"
  >
    <template #icon>
      <n-icon size="14">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
          <g fill="none">
            <path d="M14.854 1.854a.5.5 0 1 0-.708-.708l-8 8L6 10l.854-.146l8-8zM4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-5a.5.5 0 0 0-1 0v5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h5.005a.5.5 0 0 0 0-1H4.5z" fill="currentColor" />
          </g>
        </svg>
      </n-icon>
    </template>
  </n-button>
</template>
