import type { PropType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { CreateProModalFormReturn } from '../composables/create-pro-modal-form'
import { computed, defineComponent } from 'vue'
import { ProButton } from '../../button'
import { useLocale } from '../../locales'

export default defineComponent({
  name: 'Footer',
  props: {
    form: {
      type: Object as PropType<CreateProModalFormReturn>,
      required: true,
    },
    loading: Boolean,
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
    } = useLocale('ProModalForm')

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
              props.form.close()
            },
            content: t('reset'),
            disabled: props.loading,
            ...(props.resetButtonProps ?? {}),
          }
        : {}
    })

    const resolvedSubmitButtonProps = computed<ProButtonProps>(() => {
      return showSubmitButton.value
        ? {
            type: 'primary',
            onClick: () => {
              props.form.submit()
            },
            content: t('submit'),
            loading: props.loading,
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
