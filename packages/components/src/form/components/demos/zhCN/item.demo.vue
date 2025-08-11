<markdown>
# 表单项
</markdown>

<script setup lang="tsx">
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { createProForm, uid } from 'pro-naive-ui'
import { computed, ref } from 'vue'

const readonly = ref(false)

const form = createProForm({
  initialValues: {
    'name': 'zcf',
    'password': 'zcf',
    'select': 0,
    'input-otp': '654321'.split(''),
    'select-multiple': [0, 2],
    'tree-select': 'Wait',
    'radio-group': 0,
    'radio-group-vertical': 1,
    'radio-button': 2,
    'checkbox-group': [0, 1, 2],
    'checkbox-group-vertical': [1, 2, 3],
    'checkbox-group-grid': [1, 2],
    'input-number': 3,
    'switch': true,
    'slider': 37,
    'rate': 3,
    'upload': [
      {
        id: uid(),
        name: 'naive',
        status: 'finished',
        url: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
      },
    ],
  },
  onSubmit: console.log,
})

const autoCompleteOptions = computed(() => {
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    // @ts-ignore
    const value = form.values.value['auto-complete']
    const prefix = (value ?? '').split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
})
</script>

<template>
  <n-switch v-model:value="readonly" class="mb-8px">
    <template #checked>
      编辑
    </template>
    <template #unchecked>
      只读
    </template>
  </n-switch>
  <pro-form
    :form="form"
    :readonly="readonly"
    label-width="auto"
  >
    <n-card title="文本类" embedded>
      <n-flex>
        <pro-input
          title="name"
          path="name"
        />
        <pro-password
          title="password"
          path="password"
        />
        <pro-mention
          title="mention"
          path="mention"
          :field-props="{
            options: [
              {
                label: 'zcf',
                value: 'zcf',
              },
              {
                label: 'star-kirby',
                value: 'star-kirby',
              },
            ],
          }"
        />
        <pro-auto-complete
          title="AutoComplete"
          path="auto-complete"
          :field-props="{
            options: autoCompleteOptions,
          }"
        />
        <pro-input-otp
          title="InputOtp"
          path="input-otp"
        />
      </n-flex>
    </n-card>
    <n-card title="选择类" embedded class="my-8px">
      <n-flex>
        <pro-select
          title="select"
          path="select"
          required
          :field-props="{
            class: 'w-150px',
            options: [
              { label: 'China', value: 0 },
              { label: 'U.S.A', value: 1 },
            ],
          }"
        />
        <pro-select
          title="select-multiple"
          path="select-multiple"
          required
          :field-props="{
            class: 'w-180px',
            multiple: true,
            options: [
              { label: 'Red', value: 0 },
              { label: 'Green', value: 1 },
              { label: 'Blue', value: 2 },
            ],
          }"
        />
        <pro-tree-select
          title="tree-select"
          path="tree-select"
          :field-props="{
            class: 'w-160px',
            options: [
              {
                label: 'Rubber Soul',
                key: 'Rubber Soul',
                children: [
                  {
                    label: 'Drive My Car',
                    key: 'Drive My Car',
                    disabled: true,
                  },
                  {
                    label: 'Wait',
                    key: 'Wait',
                  },
                ],
              },
              {
                label: 'Let It Be',
                key: 'Let It Be Album',
                children: [
                  {
                    label: 'For You Blue',
                    key: 'For You Blue',
                  },
                  {
                    label: 'Get Back',
                    key: 'Get Back',
                  },
                ],
              },
            ],
          }"
        />
        <pro-cascader
          title="cascader"
          path="cascader"
          required
          :field-props="{
            class: 'w-180px',
            options: [
              {
                label: 'Rubber Soul',
                value: 0,
                children: [
                  {
                    label: 'Drive My Car',
                    value: 1,
                    disabled: true,
                  },
                  {
                    label: 'Wait',
                    value: 2,
                  },
                ],
              },
              {
                label: 'Let It Be',
                value: 3,
                children: [
                  {
                    label: 'For You Blue',
                    value: 4,
                  },
                  {
                    label: 'Get Back',
                    value: 5,
                  },
                ],
              },
            ],
          }"
        />
        <pro-radio-group
          title="RadioGroup"
          path="radio-group"
          :field-props="{
            options: [
              { label: 'item1', value: 0 },
              { label: 'item2', value: 1 },
              { label: 'item3', value: 2 },
            ],
          }"
        />
        <pro-radio-group
          title="RadioGroupButton"
          path="radio-group"
          :field-props="{
            type: 'button',
            options: [
              { label: 'item1', value: 0 },
              { label: 'item2', value: 1 },
              { label: 'item3', value: 2 },
            ],
          }"
        />
        <pro-radio-group
          title="RadioGroup"
          path="radio-group-vertical"
          :field-props="{
            flexProps: {
              vertical: true,
            },
            options: [
              { label: 'item1', value: 0 },
              { label: 'item2', value: 1 },
              { label: 'item3', value: 2 },
            ],
          }"
        />
        <pro-checkbox
          title="checkbox"
          path="checkbox"
        >
          勾选
        </pro-checkbox>
        <pro-checkbox-group
          title="checkbox-group"
          path="checkbox-group"
          required
          :field-props="{
            options: [
              { label: 'A', value: 0 },
              { label: 'B', value: 1 },
              { label: 'C', value: 2 },
              { label: 'D', value: 3 },
            ],
          }"
        />
        <pro-checkbox-group
          title="checkbox-group"
          path="checkbox-group-vertical"
          required
          :field-props="{
            flexProps: {
              vertical: true,
            },
            options: [
              { label: 'A', value: 0 },
              { label: 'B', value: 1 },
              { label: 'C', value: 2 },
              { label: 'D', value: 3 },
            ],
          }"
        />
        <pro-color-picker
          title="颜色选择"
          path="color-picker"
          required
        />
      </n-flex>
    </n-card>
    <n-card title="其他" embedded>
      <n-flex>
        <pro-digit
          title="InputNumber"
          path="input-number"
        />
        <pro-switch
          title="Switch"
          path="switch"
        />
        <pro-slider
          title="Slider"
          path="slider"
          :field-props="{
            class: 'w-250px!',
            step: 'mark',
            marks: {
              0: '0°C',
              20: '20°C',
              37: '37°C',
              100: '100°C',
            },
          }"
        />
        <pro-rate
          title="Rate"
          path="rate"
        />
        <pro-dynamic-tags
          title="动态标签"
          path="dynamic-tags"
          required
        />
        <pro-upload
          title="上传"
          path="upload"
        />
        <pro-upload
          title="拖拽上传"
          path="drag-upload"
          :field-props="{
            multiple: true,
            action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
            directoryDnd: true,
          }"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <ArchiveIcon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
            </n-p>
          </n-upload-dragger>
        </pro-upload>
      </n-flex>
    </n-card>
    <n-flex class="mt-16px">
      <n-button attr-type="reset">
        重置
      </n-button>
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
