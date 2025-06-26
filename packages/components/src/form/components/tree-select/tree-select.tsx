import type { SlotsType } from 'vue'
import type { ProTreeSelectProps } from './props'
import type { ProTreeSelectSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import TreeSelect from './components/tree-select'
import { provideTreeSelectInstStore } from './inst'
import { proTreeSelectProps } from './props'

const name = 'ProTreeSelect'
export default defineComponent({
  name,
  props: proTreeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideTreeSelectInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProTreeSelectProps>(
      name,
      props,
    )

    expose(exposed)
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
            return <TreeSelect {...inputProps} v-slots={this.$slots}></TreeSelect>
          },
        }}
      </ProField>
    )
  },
})
