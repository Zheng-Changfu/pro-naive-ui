import type { ComputedRef, Ref } from 'vue'
import { useSsrAdapter } from '@css-render/vue3-ssr'
import { hash } from 'css-render'
import { c } from 'naive-ui'
import { inject, ref, watchEffect } from 'vue'

export function useThemeClass(
  componentName: string,
  hashRef: Ref<string> | undefined,
  cssVarsRef: ComputedRef<Record<string, string>>,
  props: { themeOverrides?: unknown, builtinThemeOverrides?: unknown },
): {
    themeClass: Ref<string>
    onRender: () => void
  } {
  const NConfigProvider = inject('n-config-provider', null) as any

  const mergedThemeHashRef = NConfigProvider?.mergedThemeHashRef
  const styleMountTarget = NConfigProvider?.styleMountTarget

  const themeClassRef = ref('')
  const ssrAdapter = useSsrAdapter()

  let renderCallback: (() => void) | undefined

  const hashClassPrefix = `__${componentName}`
  const mountStyle = (): void => {
    let finalThemeHash = hashClassPrefix
    const hashValue = hashRef ? hashRef.value : undefined
    const themeHash = mergedThemeHashRef?.value
    if (themeHash)
      finalThemeHash += `-${themeHash}`
    if (hashValue)
      finalThemeHash += `-${hashValue}`
    const { themeOverrides, builtinThemeOverrides } = props
    if (themeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(themeOverrides))}`
    }
    if (builtinThemeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(builtinThemeOverrides))}`
    }
    themeClassRef.value = finalThemeHash
    renderCallback = () => {
      const cssVars = cssVarsRef.value
      let style = ''
      for (const key in cssVars) {
        style += `${key}: ${cssVars[key]};`
      }

      c(`.${finalThemeHash}`, style).mount({
        id: finalThemeHash,
        ssr: ssrAdapter,
        parent: styleMountTarget,
      })
      renderCallback = undefined
    }
  }

  watchEffect(() => {
    mountStyle()
  })

  return {
    themeClass: themeClassRef,
    onRender: () => {
      renderCallback?.()
    },
  }
}
