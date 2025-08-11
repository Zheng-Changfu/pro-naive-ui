import type { PropType } from 'vue'
import type { ProButtonProps } from '../../../button'
import { computed, defineComponent, inject } from 'vue'
import { warnOnce } from '../../../_utils/warn'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useInjectProDrawerForm } from '../../composables/create-pro-drawer-form'
import { proDrawerFormInjectionKey } from '../../context'

export default defineComponent({
  name: 'Footer',
  props: {
    resetButtonProps: {
      type: [Boolean, Object] as PropType<false | ProButtonProps>,
      default: undefined,
    },
    submitButtonProps: {
      type: [Boolean, Object] as PropType<false | ProButtonProps>,
      default: undefined,
    },
  },
  setup(props) {
    const {
      t,
    } = useLocale('ProDrawerContent')

    const {
      loading,
    } = inject(proDrawerFormInjectionKey, null) ?? {}

    const form = useInjectProDrawerForm()
    if (!form) {
      warnOnce(
        'pro-drawer-content',
        '`pro-drawer-content` must be placed inside `pro-drawer-form`.',
      )
    }

    const showResetButton = computed(() => {
      return props.resetButtonProps !== false
    })

    const showSubmitButton = computed(() => {
      return props.submitButtonProps !== false
    })

    const resolvedResetButtonProps = computed<ProButtonProps>(() => {
      return showResetButton.value
        ? {
            onClick: () => {
              form?.close()
            },
            content: t('reset'),
            disabled: loading?.value,
            ...(props.resetButtonProps ?? {}),
          }
        : {}
    })

    const resolvedSubmitButtonProps = computed<ProButtonProps>(() => {
      return showSubmitButton.value
        ? {
            type: 'primary',
            onClick: () => {
              form?.submit()
            },
            content: t('submit'),
            loading: loading?.value,
            ...(props.submitButtonProps ?? {}),
          }
        : {}
    })

    return {
      showResetButton,
      showSubmitButton,
      resolvedResetButtonProps,
      resolvedSubmitButtonProps,
    }
  },
  render() {
    const {
      showResetButton,
      showSubmitButton,
      resolvedResetButtonProps,
      resolvedSubmitButtonProps,
    } = this

    const resetButtonDom = showResetButton
      ? <ProButton {...resolvedResetButtonProps} />
      : null

    const submitButtonDom = showSubmitButton
      ? <ProButton {...resolvedSubmitButtonProps} />
      : null

    return [
      resetButtonDom,
      submitButtonDom,
    ]
  },
})
