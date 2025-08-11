import type { InputProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProPasswordSlots } from './slots'
import { EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'
import { NButton, NFlex, NIcon, NInput } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proInputProps } from './props'

const name = 'ProPassword'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proInputProps,
  slots: Object as SlotsType<ProPasswordSlots>,
  setup(props) {
    const open = ref(false)
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<InputProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nInputProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        type: 'password' as const,
        value: field.value.value ?? null,
      }
    })

    function setOpen(v: boolean) {
      open.value = v
    }
    return {
      open,
      field,
      empty,
      setOpen,
      emptyDom,
      forwardRef,
      nInputProps,
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
              dom = this.empty
                ? this.emptyDom
                : (
                    <NFlex align="center" wrap={false}>
                      {this.open ? this.field.value.value : '********'}
                      <NButton type="primary" text={true} onClick={() => this.setOpen(!this.open)}>
                        <NIcon size={16}>
                          {this.open ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </NIcon>
                      </NButton>
                    </NFlex>
                  )
            }
            else {
              dom = (
                <NInput
                  ref={this.forwardRef}
                  {...this.nInputProps}
                  v-slots={this.$slots}
                >
                </NInput>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nInputProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
