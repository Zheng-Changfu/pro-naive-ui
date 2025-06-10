import type { FormRules } from 'naive-ui'
import type { MaybeRef, ToRef } from 'vue'
import type { ValidationTrigger } from './props'
import { inject, shallowRef } from 'vue'
import { createInjectionKey } from '../composables/create-injection-key'
import { useValidationResults } from './composables/use-validation-result'

export const proFormConfigInjectionKey = createInjectionKey<{
  rules: ToRef<FormRules | undefined>
  readonly: MaybeRef<boolean | undefined>
  validationResults: ReturnType<typeof useValidationResults>
  validationTrigger: MaybeRef<ValidationTrigger | ValidationTrigger[]>
}>('pro-form-config')

export function useInjectProFormConfig() {
  return inject(proFormConfigInjectionKey, () => {
    return {
      readonly: undefined,
      validationTrigger: 'input',
      rules: shallowRef(undefined),
      validationResults: useValidationResults(),
    }
  }, true)
}
