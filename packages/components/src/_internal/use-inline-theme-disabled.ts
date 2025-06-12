import { inject } from 'vue'

export function useInlineThemeDisabled(): boolean {
  const NConfigProvider = inject('n-config-provider', null) as any
  return NConfigProvider?.inlineThemeDisabled ?? false
}
