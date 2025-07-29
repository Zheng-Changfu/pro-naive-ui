import type { Ref } from 'vue'
import type { CreateProFormOptions, ExtendProForm } from '../../form/composables/create-pro-form'
import { ref } from 'vue'
import { extendProForm, useInjectProForm } from '../../form/composables/create-pro-form'

export type CreateProModalFormReturn<Values = any> = ExtendProForm<
  Values,
  {
    /**
     * 打开弹窗
     */
    open: () => void
    /**
     * 关闭弹窗
     */
    close: () => void
    /**
     * 显示状态
     */
    show: Ref<boolean>
  }
>
export function createProModalForm<Values = any>(options: CreateProFormOptions<Values> = {}): CreateProModalFormReturn<Values> {
  const show = ref(false)
  return extendProForm(options, {
    show,
    open: () => {
      show.value = true
    },
    close: () => {
      show.value = false
    },
  }, { })
}

export function useInjectProModalForm<Values = any>() {
  return useInjectProForm() as any as CreateProModalFormReturn<Values> | null
}
