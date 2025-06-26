import type { SlotsType } from 'vue'
import type { ProTransferProps } from './props'
import type { ProTransferSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Transfer from './components/transfer'
import { proTransferProps } from './props'

const name = 'ProTransfer'
export default defineComponent({
  name,
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProTransferProps>(
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
            return <Transfer {...inputProps} v-slots={this.$slots}></Transfer>
          },
        }}
      </ProField>
    )
  },
})
