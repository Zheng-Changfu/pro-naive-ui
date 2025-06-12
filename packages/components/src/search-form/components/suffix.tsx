import type { PropType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { CreateProSearchFormReturn } from '../composables/create-pro-search-form'
import { DownOutlined, UpOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { ProButton } from '../../button'
import { useLocale } from '../../locales'

export default defineComponent({
  name: 'Suffix',
  props: {
    form: {
      type: Object as PropType<CreateProSearchFormReturn>,
      required: true,
    },
    loading: Boolean,
    resetButtonProps: {
      type: [Boolean, Object] as PropType<false | ProButtonProps>,
      default: undefined,
    },
    searchButtonProps: {
      type: [Boolean, Object] as PropType<false | ProButtonProps>,
      default: undefined,
    },
    collapseButtonProps: {
      type: [Boolean, Object] as PropType<false | ProButtonProps>,
      default: undefined,
    },
  },
  setup(props) {
    const form = props.form

    const {
      getMessage,
    } = useLocale('ProSearchForm')

    const showResetButton = computed(() => {
      return props.resetButtonProps !== false
    })

    const showSearchButton = computed(() => {
      return props.searchButtonProps !== false
    })

    const showCollapseButton = computed(() => {
      return props.collapseButtonProps !== false
    })

    const resolvedResetButtonProps = computed<ProButtonProps | false>(() => {
      return showResetButton.value
        ? {
            attrType: 'reset',
            disabled: props.loading,
            content: getMessage('reset'),
            ...(props.resetButtonProps ?? {}),
          }
        : {}
    })

    const resolvedSearchButtonProps = computed<ProButtonProps | false>(() => {
      return showSearchButton.value
        ? {
            type: 'primary',
            attrType: 'submit',
            loading: props.loading,
            content: getMessage('search'),
            ...(props.searchButtonProps ?? {}),
          }
        : {}
    })

    const resolvedCollapseButtonProps = computed<ProButtonProps | false>(() => {
      return showCollapseButton.value
        ? {
            text: true,
            type: 'primary',
            iconPlacement: 'right',
            disabled: props.loading,
            content: getMessage('collapse')(form.collapsed.value),
            renderIcon: () => {
              return (
                <NIcon size={14}>
                  {form.collapsed.value ? <DownOutlined /> : <UpOutlined />}
                </NIcon>
              )
            },
            onClick: () => form.toggleCollapse(),
            ...(props.collapseButtonProps ?? {}),
          }
        : {}
    })

    return {
      showResetButton,
      showSearchButton,
      showCollapseButton,
      resolvedResetButtonProps,
      resolvedSearchButtonProps,
      resolvedCollapseButtonProps,
    }
  },
  render() {
    const {
      showResetButton,
      showSearchButton,
      showCollapseButton,
      resolvedResetButtonProps,
      resolvedSearchButtonProps,
      resolvedCollapseButtonProps,
    } = this

    const resetDom = showResetButton
      ? <ProButton {...resolvedResetButtonProps} />
      : null

    const searchDom = showSearchButton
      ? <ProButton {...resolvedSearchButtonProps} />
      : null

    const collapseDom = showCollapseButton
      ? <ProButton {...resolvedCollapseButtonProps} />
      : null

    return [
      resetDom,
      searchDom,
      collapseDom,
    ]
  },
})
