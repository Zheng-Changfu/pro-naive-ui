<markdown>
# 屏幕聚焦重新请求

通过设置 `options.refreshOnWindowFocus`，在浏览器窗口 `refocus` 和 `revisible` 时，会重新发起请求。你可以点击浏览器外部，再点击当前页面来体验效果（或者隐藏当前页面，重新展示），如果和上一次请求间隔大于 5000ms，则会重新请求一次。
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'

function getUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}

const { data, loading } = useRequest(getUsername, {
  refreshOnWindowFocus: true,
})
</script>

<template>
  <div>Username: {{ loading ? 'Loading' : data }}</div>
</template>
