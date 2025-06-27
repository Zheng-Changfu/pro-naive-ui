import type { FormInst, FormProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormProps } from './props'
import type { ProFormSlots } from './slots'
import { NForm } from 'naive-ui'
import { provideInternalForm } from 'pro-composables'
import { computed, defineComponent, onMounted, provide, ref } from 'vue'
import { warnOnce } from '../_utils/warn'
import { useOmitProps, useOverrideProps } from '../composables'
import { createProForm, proFormInternalKey, provideProForm } from './composables/create-pro-form'
import { proFormConfigInjectionKey } from './context'
import { proFormExtendProps, proFormProps } from './props'

const name = 'ProForm'
export default defineComponent({
  name,
  props: proFormProps,
  slots: Object as SlotsType<ProFormSlots>,
  setup(props) {
    let form = props.form
    if (!form && __DEV__) {
      form = createProForm()
      warnOnce(
        'pro-form',
        'You are using ProForm without form prop. Please use form prop to pass the form instance.',
      )
    }

    const nFormInst = ref<FormInst>()

    const overridedProps = useOverrideProps<ProFormProps>(
      name,
      props,
    )

    const formProps = useOmitProps(
      overridedProps,
      proFormExtendProps,
    )

    const loading = computed(() => {
      return !!overridedProps.value.loading
    })

    const nFormProps = computed<FormProps>(() => {
      return {
        ...formProps.value,
        rules: undefined,
        ref: nFormInst,
        model: form.values.value,
        /**
         * 支持 button `attr-type = submit` 提交表单
         */
        onSubmit: (e) => {
          e.preventDefault()
          if (!loading.value) {
            form.submit()
          }
        },
        /**
         * 支持 button `attr-type = reset` 重置表单
         */
        onReset: (e: Event) => {
          e.preventDefault()
          form.restoreFieldsValue()
        },
      }
    })

    const {
      internalForm,
      validationResults,
      registerProFormInst,
    } = form[proFormInternalKey]

    onMounted(() => {
      registerProFormInst({
        loading: loading as any,
        validate: nFormInst.value!.validate,
        restoreValidation: nFormInst.value!.restoreValidation,
      })
    })

    provide(proFormConfigInjectionKey, {
      validationResults,
      rules: computed(() => overridedProps.value.rules),
      readonly: computed(() => overridedProps.value.readonly),
      validationTrigger: computed(() => overridedProps.value.validationTrigger!),
    })
    provideProForm(form)
    provideInternalForm(internalForm)
    return {
      nFormProps,
    }
  },
  render() {
    return (
      <NForm {...this.nFormProps} v-slots={this.$slots}></NForm>
    )
  },
})
