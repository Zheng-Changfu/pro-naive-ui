import type { SlotsType } from 'vue'
import type { ProSelectProps } from './props'
import type { ProSelectSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Select from './components/select'
import { provideSelectInstStore } from './inst'
import { proSelectProps } from './props'

const name = 'ProSelect'
export default defineComponent({
  name,
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideSelectInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProSelectProps>(
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
            return <Select {...pureProps} v-slots={this.$slots}></Select>
          },
        }}
      </ProField>
    )
  },
})
