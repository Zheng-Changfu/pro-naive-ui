import { getCurrentInstance } from 'vue'

/**
 * 转发 ref
 */
export function useForwardRef<ExposedMethods extends Record<string, any>>() {
  const currentInstance = getCurrentInstance()

  function forwardRef(methods: ExposedMethods | null) {
    if (currentInstance) {
      currentInstance.exposed = currentInstance.exposeProxy = methods
    }
  }

  return forwardRef
}
