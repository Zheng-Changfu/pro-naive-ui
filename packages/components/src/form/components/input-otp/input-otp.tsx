import type { SlotsType } from 'vue'
import type { ProInputOtpProps } from './props'
import type { ProInputOtpSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import InputOtp from './components/input-otp'
import { proInputOtpProps } from './props'

const name = 'ProInputOtp'
export default defineComponent({
  name,
  props: proInputOtpProps,
  slots: Object as SlotsType<ProInputOtpSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProInputOtpProps>(
      name,
      props,
    )

    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <InputOtp {...pureProps} v-slots={this.$slots}></InputOtp>
          },
        }}
      </ProField>
    )
  },
})
