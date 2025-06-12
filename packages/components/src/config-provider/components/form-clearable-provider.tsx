import { defineComponent, inject, provide } from 'vue'
import { createInjectionKey } from '../../composables/create-injection-key'
import ProConfigProvider from '../config-provider'

const name = 'ProFormClearableProvider'
const proFormClearableInjectionKey = createInjectionKey<true | null>('pro-form-clearable')

export default defineComponent({
  name,
  setup() {
    const provided = inject(proFormClearableInjectionKey, null) // 是否已经注入过了
    if (!provided) {
      provide(proFormClearableInjectionKey, true)
    }
    return {
      propOverrides: provided
        ? null
        : {
            ProDate: { fieldProps: { clearable: true } },
            ProRate: { fieldProps: { clearable: true } },
            ProTime: { fieldProps: { clearable: true } },
            ProInput: { fieldProps: { clearable: true } },
            ProDigit: { fieldProps: { clearable: true } },
            ProSelect: { fieldProps: { clearable: true } },
            ProCascader: { fieldProps: { clearable: true } },
            ProPassword: { fieldProps: { clearable: true } },
            ProTextarea: { fieldProps: { clearable: true } },
            ProDateTime: { fieldProps: { clearable: true } },
            ProDateYear: { fieldProps: { clearable: true } },
            ProDateWeek: { fieldProps: { clearable: true } },
            ProDateMonth: { fieldProps: { clearable: true } },
            ProDateRange: { fieldProps: { clearable: true } },
            ProTreeSelect: { fieldProps: { clearable: true } },
            ProDateQuarter: { fieldProps: { clearable: true } },
            ProAutoComplete: { fieldProps: { clearable: true } },
            ProDateYearRange: { fieldProps: { clearable: true } },
            ProDateTimeRange: { fieldProps: { clearable: true } },
            ProDateMonthRange: { fieldProps: { clearable: true } },
            ProDateQuarterRange: { fieldProps: { clearable: true } },
          },
    }
  },
  render() {
    return this.propOverrides
      ? (
          <ProConfigProvider propOverrides={this.propOverrides}>
            {this.$slots.default?.()}
          </ProConfigProvider>
        )
      : this.$slots.default?.()
  },
})
