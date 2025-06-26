<markdown>
# 列表动画

你可以对整个容器自定义，使其变得更加灵活，比如你想给列表加个动画
</markdown>

<script setup lang="tsx">
import { ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd'
import { createProForm } from 'pro-naive-ui'

const form = createProForm({
  initialValues: {
    userInfo: [
      { name: 'zcf', age: 26 },
      { name: 'zzx', age: 0.5 },
      { name: 'cxh', age: 28 },
    ],
  },
})
</script>

<template>
  <pro-form :form="form">
    <n-card embedded>
      <pro-form-list
        title="用户信息"
        path="userInfo"
        :copy-button-props="false"
        :creator-button-props="false"
        :remove-button-props="false"
      >
        <template #default="{ index, action }">
          <n-flex>
            <pro-input
              title="姓名"
              path="name"
            />
            <pro-digit
              title="年龄"
              path="age"
            />
            <n-flex align="flex-end" class="h-52px">
              <n-button text @click="() => action.moveUp(index)">
                <template #icon>
                  <n-icon>
                    <ArrowUpOutlined />
                  </n-icon>
                </template>
              </n-button>
              <n-button text @click="() => action.moveDown(index)">
                <template #icon>
                  <n-icon>
                    <ArrowDownOutlined />
                  </n-icon>
                </template>
              </n-button>
            </n-flex>
          </n-flex>
        </template>
        <template #container="{ listDom, creatorButtonDom }">
          <n-flex vertical>
            <transition-group
              tag="div"
              name="fade"
              move-class="transition duration-500 ease-[cubic-bezier(0.55,0,0.1,1)]"
              enter-active-class="transition duration-500 ease-[cubic-bezier(0.55,0,0.1,1)]"
              leave-active-class="transition duration-500 ease-[cubic-bezier(0.55,0,0.1,1)]"
              enter-from-class="opacity-0 scale-y-1 translate-x-30px"
              leave-to-class="opacity-0 scale-y-1 translate-x-30px"
            >
              <template v-for="comp in listDom" :key="comp.key">
                <div>
                  <component :is="comp" />
                </div>
              </template>
            </transition-group>
            <component :is="creatorButtonDom" />
          </n-flex>
        </template>
      </pro-form-list>
    </n-card>
  </pro-form>
</template>
