import type { SlotsType } from 'vue'
import type { ProFormProps } from '../form'
import type { ProModalProps } from '../modal/props'
import type { ProModalFormProps } from './props'
import type { ProModalFormSlots } from './slots'
import { NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { keep } from '../_utils/keep'
import { keysOf } from '../_utils/keys-of'
import { resolveSlotWithProps, resolveWrappedSlotWithProps } from '../_utils/resolve-slot'
import { useOverrideProps } from '../composables'
import { ProForm } from '../form'
import { proFormPropKeys } from '../form/props'
import { ProModal } from '../modal'
import { proModalProps as _proModalProps } from '../modal/props'
import Footer from './components/footer'
import { createProModalForm } from './composables/create-pro-modal-form'
import { proModalFormProps } from './props'
import style from './styles/index.cssr'

const name = 'ProModalForm'
export default defineComponent({
  name,
  props: proModalFormProps,
  slots: Object as SlotsType<ProModalFormSlots>,
  setup(props) {
    // 手动标注类型,防止因为类型复杂导致构建类型声明文件失败,先用 any 解决
    let form = props.form as any
    if (!form && __DEV__) {
      form = createProModalForm()
    }

    const overridedProps = useOverrideProps<ProModalFormProps>(
      name,
      props,
    )

    const mergedClsPrefix = useNaiveClsPrefix()

    const proFormProps = computed<ProFormProps>(() => {
      return keep(overridedProps.value, proFormPropKeys)
    })

    const proModalProps = computed<ProModalProps>(() => {
      const {
        // #region 冲突的属性
        size,
        theme,
        themeOverrides,
        builtinThemeOverrides,
        // #endregion
        preset,
        proModalProps,
        ...restProps
      } = overridedProps.value

      return {
        ...keep(restProps, keysOf(_proModalProps)),
        ...(proModalProps ?? {}),
        'footer': undefined,
        'show': form.show.value,
        'onUpdateShow': undefined,
        'onAfterLeave': onAfterLeave,
        'onUpdate:show': doUpdateShow,
        'preset': preset ? 'card' : undefined,
      }
    })

    function onAfterLeave() {
      const {
        onAfterLeave,
        restoreValuesOnClosed,
      } = overridedProps.value

      if (restoreValuesOnClosed) {
        form.restoreFieldsValue()
      }

      onAfterLeave && onAfterLeave()
    }

    function doUpdateShow(val: boolean) {
      if (val) {
        form.open()
        return
      }
      if (
        overridedProps.value.loading
        && !overridedProps.value.closeOnLoading
      ) {
        return
      }
      form.close()
    }

    useMountStyle(
      name,
      'pro-modal-form',
      style,
      mergedClsPrefix,
    )

    return {
      form,
      proFormProps,
      proModalProps,
      overridedProps,
      mergedClsPrefix,
      footer: computed(() => overridedProps.value.footer),
      loading: computed(() => overridedProps.value.loading),
      resetButtonProps: computed(() => overridedProps.value.resetButtonProps),
      submitButtonProps: computed(() => overridedProps.value.submitButtonProps),
    }
  },
  render() {
    return (
      <ProModal
        class={[
          `${this.mergedClsPrefix}-pro-modal-form`,
        ]}
        style={{
          width: this.overridedProps.width ?? '520px',
          maxHeight: this.overridedProps.maxHeight ?? '80%',
        }}
        {...this.proModalProps}
      >
        {{
          ...this.$slots,
          default: (options: { draggableClass: string }) => {
            return resolveWrappedSlotWithProps(this.$slots.default, { options }, (children) => {
              return (
                <ProForm {...this.proFormProps}>
                  {children}
                </ProForm>
              )
            })
          },
          footer: () => {
            if (this.footer === false) {
              return null
            }

            const footerDom = (
              <Footer
                form={this.form}
                loading={this.loading}
                resetButtonProps={this.resetButtonProps}
                submitButtonProps={this.submitButtonProps}
              />
            )

            return resolveSlotWithProps(this.$slots.footer, {
              footerDom,
            }, () => {
              return this.footer
                ? this.footer({ footerDom })
                : <NFlex justify="flex-end" size="small">{footerDom}</NFlex>
            })
          },
        }}
      </ProModal>
    )
  },
})
