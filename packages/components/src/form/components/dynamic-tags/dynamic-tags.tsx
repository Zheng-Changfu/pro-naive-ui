import type { SlotsType } from 'vue'
import type { ProDynamicTagsProps } from './props'
import type { ProDynamicTagsSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import DynamicTags from './components/dynamic-tags'
import { proDynamicTagsProps } from './props'

const name = 'ProDynamicTags'
export default defineComponent({
  name,
  props: proDynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProDynamicTagsProps>(
      name,
      props,
    )
    return {
      placeholder,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        placeholder={this.placeholder}
      >
        {{
          ...this.$slots,
          input: ({ inputProps }: any) => {
            return <DynamicTags {...inputProps} v-slots={this.$slots}></DynamicTags>
          },
        }}
      </ProField>
    )
  },
})
