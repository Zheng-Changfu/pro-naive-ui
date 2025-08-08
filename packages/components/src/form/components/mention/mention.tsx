import type { MentionProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProMentionSlots } from './slots'
import { NMention } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proMentionProps } from './props'

const name = 'ProMention'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proMentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<MentionProps>(props, name)

    const {
      readonlyText,
    } = useFieldUtils(field)

    const nMentionProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? '',
      }
    })
    return {
      field,
      forwardRef,
      readonlyText,
      mergedReadonly,
      proFormItemProps,
      nMentionProps,
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
              dom = this.readonlyText
            }
            else {
              dom = (
                <NMention
                  ref={this.forwardRef}
                  {...this.nMentionProps}
                  v-slots={this.$slots}
                >
                </NMention>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nMentionProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
