import type { DynamicTagsProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProDynamicTagsSlots } from './slots'
import { NDynamicTags } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proDynamicTagsProps } from './props'

const name = 'ProDynamicTags'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proDynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<DynamicTagsProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nDynamicTagsProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? [],
        disabled: mergedReadonly.value || mergedFieldProps.value.disabled,
        closable: mergedReadonly.value ? false : mergedFieldProps.value.closable,
      }
    })

    return {
      field,
      empty,
      emptyDom,
      mergedReadonly,
      proFormItemProps,
      nDynamicTagsProps,
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
            const slots = {
              ...this.$slots,
              input: this.$slots['tags-input'],
            }
            let dom: VNodeChild
            if (this.mergedReadonly && this.empty) {
              dom = this.emptyDom
            }
            else {
              dom = (
                <NDynamicTags
                  {...this.nDynamicTagsProps}
                  v-slots={slots}
                >
                </NDynamicTags>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nDynamicTagsProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
