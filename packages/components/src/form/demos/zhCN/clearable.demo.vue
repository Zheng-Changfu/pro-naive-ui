<markdown>
# 表单可清空

我们开发了一个组件 `pro-form-clearable-provider` 来完成这个功能，请包裹在需要被清空的表单项组件上即可，它是通过 `pro-config-provider` 组件的 [prop-overrides](config-provider#prop-overrides.vue) 实现
</markdown>

<script lang="ts">
import { createProForm } from 'pro-naive-ui'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm()
    const readonly = ref(false)

    return {
      form,
      readonly,
      autoCompleteOptions: computed(() => {
        const value = form.values.value['auto-complete']
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = (value ?? '').split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix,
          }
        })
      }),
    }
  },
})
</script>

<template>
  <pro-form-clearable-provider>
    <pro-form :form="form" label-width="auto" :readonly>
      <n-grid :cols="2" x-gap="16">
        <n-gi>
          <pro-date title="date" path="date" />
        </n-gi>
        <n-gi>
          <pro-rate title="rate" path="rate" />
        </n-gi>
        <n-gi>
          <pro-time title="time" path="time" />
        </n-gi>
        <n-gi>
          <pro-input title="input" path="input" />
        </n-gi>
        <n-gi>
          <pro-digit title="digit" path="digit" />
        </n-gi>
        <n-gi>
          <pro-select
            title="select"
            path="select"
            :field-props="{
              options: [
                { label: '北京', value: 0 },
                { label: '上海', value: 1 },
              ],
            }"
          />
        </n-gi>
        <n-gi>
          <pro-cascader
            title="cascader"
            path="cascader"
            :field-props="{
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
        </n-gi>
        <n-gi>
          <pro-password title="password" path="password" />
        </n-gi>
        <n-gi>
          <pro-textarea title="textarea" path="textarea" />
        </n-gi>
        <n-gi>
          <pro-date-time title="date-time" path="date-time" />
        </n-gi>
        <n-gi>
          <pro-date-year title="date-year" path="date-year" />
        </n-gi>
        <n-gi>
          <pro-date-week title="date-week" path="date-week" />
        </n-gi>
        <n-gi>
          <pro-date-month title="date-month" path="date-month" />
        </n-gi>
        <n-gi>
          <pro-date-range title="date-range" path="date-range" />
        </n-gi>
        <n-gi>
          <pro-date-quarter title="date-quarter" path="date-quarter" />
        </n-gi>
        <n-gi>
          <pro-date-year-range title="date-year-range" path="date-year-range" />
        </n-gi>
        <n-gi>
          <pro-date-time-range title="date-time-range" path="date-time-range" />
        </n-gi>
        <n-gi>
          <pro-date-month-range title="date-month-range" path="date-month-range" />
        </n-gi>
        <n-gi>
          <pro-date-quarter-range title="date-quarter-range" path="date-quarter-range" />
        </n-gi>
        <n-gi>
          <pro-tree-select
            title="tree-select"
            path="tree-select"
            :field-props="{
              showPath: true,
              options: [
                {
                  label: 'Rubber Soul',
                  key: 0,
                  children: [
                    {
                      label: 'Drive My Car',
                      key: 1,

                    },
                    {
                      label: 'Wait',
                      key: 2,
                    },
                  ],
                },
                {
                  label: 'Let It Be',
                  key: 3,
                  children: [
                    {
                      label: 'For You Blue',
                      key: 4,
                    },
                    {
                      label: 'Get Back',
                      key: 5,
                    },
                  ],
                },
              ],
            }"
          />
        </n-gi>
        <n-gi>
          <pro-auto-complete
            title="auto-complete"
            path="auto-complete"
            :field-props="{
              options: autoCompleteOptions,
            }"
          />
        </n-gi>
      </n-grid>
      <n-flex>
        <n-switch v-model:value="readonly" class="mb-8px">
          <template #checked>
            编辑
          </template>
          <template #unchecked>
            只读
          </template>
        </n-switch>
        <n-button attr-type="reset">
          重置
        </n-button>
        <n-button type="primary" attr-type="submit">
          提交
        </n-button>
      </n-flex>
    </pro-form>
  </pro-form-clearable-provider>
</template>
