import type { SwitchProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProSwitchSlots } from './slots'
import { NSwitch } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useLocale } from '../../../locales'
import { useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proSwitchProps } from './props'

const name = 'ProSwitch'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<SwitchProps>(props, name)

    const {
      t,
    } = useLocale('ProSwitch')

    const nSwitchProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? false,
      }
    })

    return {
      t,
      field,
      nSwitchProps,
      mergedReadonly,
      proFormItemProps,
    }
  },
  render() {
    if (!this.field.show.value) {
      return
    }
    return (
      <ProFormItem {...this.proFormItemProps}>
        {{
          ...this.$slots,
          default: () => {
            let dom: VNodeChild
            if (this.mergedReadonly) {
              dom = this.field.value.value
                ? this.$slots.checked?.() ?? this.t('checked')
                : this.$slots.unchecked?.() ?? this.t('unchecked')
            }
            else {
              dom = (
                <NSwitch
                  {...this.nSwitchProps}
                  v-slots={this.$slots}
                >
                </NSwitch>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nSwitchProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
