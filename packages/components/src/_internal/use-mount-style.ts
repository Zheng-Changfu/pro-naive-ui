import type { CNode } from 'css-render'
import type { Ref } from 'vue'
import { useSsrAdapter } from '@css-render/vue3-ssr'
import { computed, inject, onBeforeMount } from 'vue'

export function useMountStyle(
  resolveId: string,
  mountId: string,
  style: CNode | undefined,
  clsPrefixRef?: Ref<string | undefined> | undefined,
) {
  const ssrAdapter = useSsrAdapter()
  const cssrAnchorMetaName = 'naive-ui-style'
  const NConfigProvider = inject<any>('n-config-provider', null)
  if (style) {
    const mountStyle = (): void => {
      const clsPrefix = clsPrefixRef?.value
      style.mount({
        id: mountId,
        head: true,
        ssr: ssrAdapter,
        anchorMetaName: cssrAnchorMetaName,
        parent: NConfigProvider?.styleMountTarget,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined,
        },
      })
    }
    if (ssrAdapter) {
      mountStyle()
    }
    else {
      onBeforeMount(mountStyle)
    }
  }

  return computed(() => {
    return NConfigProvider?.mergedThemeOverridesRef.value?.[resolveId] ?? {}
  })
}
