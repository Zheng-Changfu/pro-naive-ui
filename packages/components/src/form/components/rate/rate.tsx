import type { SlotsType } from 'vue'
import type { ProRateProps } from './props'
import type { ProRateSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Rate from './components/rate'
import { proRateProps } from './props'

const name = 'ProRate'
export default defineComponent({
  name,
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProRateProps>(
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
          input: (pureProps: any) => {
            return <Rate {...pureProps} v-slots={this.$slots}></Rate>
          },
        }}
      </ProField>
    )
  },
})
