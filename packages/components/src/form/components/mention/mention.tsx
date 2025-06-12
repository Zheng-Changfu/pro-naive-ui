import type { SlotsType } from 'vue'
import type { ProMentionProps } from './props'
import type { ProMentionSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Mention from './components/mention'
import { provideMentionInstStore } from './inst'
import { proMentionProps } from './props'

const name = 'ProMention'
export default defineComponent({
  name,
  props: proMentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideMentionInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProMentionProps>(
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
            return <Mention {...pureProps} v-slots={this.$slots}></Mention>
          },
        }}
      </ProField>
    )
  },
})
