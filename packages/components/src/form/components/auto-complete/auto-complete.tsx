import type { SlotsType } from 'vue'
import type { ProAutoCompleteProps } from './props'
import type { ProAutoCompleteSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import AutoComplete from './components/auto-complete'
import { provideAutoCompleteInstStore } from './inst'
import { proAutoCompleteProps } from './props'

const name = 'ProAutoComplete'
export default defineComponent({
  name,
  props: proAutoCompleteProps,
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideAutoCompleteInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProAutoCompleteProps>(
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
          input: (pureProps: any) => {
            return <AutoComplete {...pureProps} v-slots={this.$slots}></AutoComplete>
          },
        }}
      </ProField>
    )
  },
})
