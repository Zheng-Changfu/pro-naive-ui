import type { Ref } from 'vue'
import type { CreateProFormOptions, ExtendProForm } from '../../form/composables/create-pro-form'
import { isBoolean } from 'lodash-es'
import { ref } from 'vue'
import { extendProForm, useInjectProForm } from '../../form/composables/create-pro-form'

export type CreateProSearchFormReturn<Values = any> = ExtendProForm<
  Values,
  {
    /**
     * 是否收起
     */
    collapsed: Ref<boolean>
    /**
     * 切换收起
     * @param collapsed 传递了此参数，根据参数切换
     */
    toggleCollapse: (collapsed?: boolean) => void
  }
>

export interface CreateProSearchFormOptions<Values> extends CreateProFormOptions<Values> {
  /**
   * 默认是否收起
   * @default false
   */
  defaultCollapsed?: boolean
}

export function createProSearchForm<Values = any>(options: CreateProSearchFormOptions<Values> = {}): CreateProSearchFormReturn<Values> {
  const collapsed = ref(options.defaultCollapsed ?? false)

  return extendProForm(options, {
    collapsed,
    toggleCollapse: (value?: boolean) => {
      collapsed.value = isBoolean(value)
        ? value
        : !collapsed.value
    },
  }, { })
}

export function useInjectProSearchForm<Values = any>() {
  return useInjectProForm() as any as CreateProSearchFormReturn<Values> | undefined
}
