import { toString } from 'lodash-es'
import { computed } from 'vue'
import { useLocale } from '../../../../locales'

export function useMergePlaceholder(componentName: string, props: Record<string, any>) {
  const {
    t,
  } = useLocale('ProForm')

  const mergedTitle = computed<string>(() => {
    return props.title ?? props.label
  })

  return computed(() => {
    if (props.placeholder !== undefined) {
      return props.placeholder
    }
    const localePlaceholder = t('placeholder')
    return localePlaceholder(toString(mergedTitle.value), componentName)
  })
}
