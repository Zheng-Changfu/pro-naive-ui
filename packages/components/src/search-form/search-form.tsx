import type { GridProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormProps } from '../form'
import type { ProSearchFormProps } from './props'
import type { ProSearchFormSlots } from './slots'
import { gridProps as _nGridProps, NFormItem, NGi, NGrid } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { keep } from '../_utils/keep'
import { keysOf } from '../_utils/keys-of'
import { resolveSlotWithProps } from '../_utils/resolve-slot'
import { useOverrideProps } from '../composables'
import { ProFormClearableProvider } from '../config-provider'
import { ProForm } from '../form'
import { proFormPropKeys } from '../form/props'
import GridFieldItem from './components/grid-field-item'
import Suffix from './components/suffix'
import { createProSearchForm } from './composables/create-pro-search-form'
import { proSearchFormProps } from './props'
import style from './styles/index.cssr'

const name = 'ProSearchForm'
export default defineComponent({
  name,
  props: proSearchFormProps,
  inheritAttrs: false,
  slots: Object as SlotsType<ProSearchFormSlots>,
  setup(props) {
    // 手动标注类型,防止因为类型复杂导致构建类型声明文件失败,先用 any 解决
    let form = props.form as any
    if (!form && __DEV__) {
      form = createProSearchForm()
    }

    const overridedProps = useOverrideProps<ProSearchFormProps>(
      name,
      props,
    )

    const mergedClsPrefix = useNaiveClsPrefix()

    const proFormProps = computed<ProFormProps>(() => {
      return keep(overridedProps.value, proFormPropKeys)
    })

    const nGridProps = computed<GridProps>(() => {
      const {
        // #region 冲突的属性
        // #endregion
        gridProps,
        ...restProps
      } = overridedProps.value
      return {
        ...keep(restProps, keysOf(_nGridProps)),
        ...(gridProps ?? {}),
        collapsed: form.collapsed.value,
      }
    })

    useMountStyle(
      name,
      'pro-search-form',
      style,
    )

    return {
      form,
      nGridProps,
      proFormProps,
      mergedClsPrefix,
      loading: computed(() => overridedProps.value.loading),
      columns: computed(() => overridedProps.value.columns ?? []),
      resetButtonProps: computed(() => overridedProps.value.resetButtonProps),
      searchButtonProps: computed(() => overridedProps.value.searchButtonProps),
      showSuffixGridItem: computed(() => overridedProps.value.showSuffixGridItem),
      collapseButtonProps: computed(() => overridedProps.value.collapseButtonProps),
      suffixGridItemProps: computed(() => overridedProps.value.suffixGridItemProps),
      suffixFormItemProps: computed(() => overridedProps.value.suffixFormItemProps),
    }
  },

  render() {
    const {
      columns,
      nGridProps,
      proFormProps,
      mergedClsPrefix,
      showSuffixGridItem,
    } = this

    return (
      <ProFormClearableProvider>
        <ProForm
          {...this.$attrs}
          {...proFormProps}
          class={[`${mergedClsPrefix}-pro-search-form`]}
        >
          <NGrid {...nGridProps}>
            {(columns ?? []).map((column) => {
              return (
                <GridFieldItem
                  column={column}
                  span={column.span}
                  offset={column.offset}
                />
              )
            })}
            {showSuffixGridItem && (
              <NGi
                {...this.suffixGridItemProps}
                suffix={true}
              >
                {{
                  default: ({ overflow }: any) => {
                    console.log(overflow)
                    const suffixDom = (
                      <Suffix
                        form={this.form}
                        loading={this.loading}
                        resetButtonProps={this.resetButtonProps}
                        searchButtonProps={this.searchButtonProps}
                        collapseButtonProps={this.collapseButtonProps}
                      />
                    )
                    return (
                      <NFormItem
                        {...this.suffixFormItemProps}
                        class={[`${mergedClsPrefix}-pro-search-form__suffix`]}
                      >
                        {resolveSlotWithProps(this.$slots.suffix, {
                          overflow,
                          suffixDom,
                        }, () => suffixDom)}
                      </NFormItem>
                    )
                  },
                }}
              </NGi>
            )}
          </NGrid>
        </ProForm>
      </ProFormClearableProvider>
    )
  },
})
