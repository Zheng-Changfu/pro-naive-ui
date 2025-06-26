<markdown>
# 语言

使用 `naive-ui` 的 `createLocale` 方法对语言包进行了扩展
</markdown>

<script setup lang="tsx">
import type { NDateLocale, NLocale } from 'naive-ui'
import { dateZhCN } from 'naive-ui'
import { createProForm, zhCN } from 'pro-naive-ui'
import { ref } from 'vue'

const readonly = ref(false)
const form = createProForm()
const locale = ref<NLocale | null>(null)
const dateLocale = ref<NDateLocale | null>(null)
</script>

<template>
  <n-flex vertical>
    <n-flex>
      <n-button
        @click="
          () => {
            locale = null
            dateLocale = null
          }
        "
      >
        英文
      </n-button>
      <n-button
        @click="
          () => {
            locale = zhCN
            dateLocale = dateZhCN
          }
        "
      >
        中文
      </n-button>
      <n-button @click="readonly = !readonly">
        切换{{ readonly ? '编辑' : '只读' }}
      </n-button>
    </n-flex>
    <pro-config-provider :locale="locale" :date-locale="dateLocale">
      <pro-form :readonly="readonly" :form="form">
        <pro-date-week path="test" />
      </pro-form>
    </pro-config-provider>
  </n-flex>
</template>
