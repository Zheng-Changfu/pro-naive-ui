import type { UploadFileInfo, UploadInst, UploadProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProUploadFieldProps } from './props'
import type { ProUploadSlots } from './slots'
import { NButton, NUpload } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import { resolveSlot } from '../../../_utils/resolve-slot'
import { useOmitProps } from '../../../composables'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useLocale } from '../../../locales'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proUploadFieldProps, proUploadProps } from './props'

const name = 'ProUpload'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props) {
    const instRef = ref<UploadInst>()
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<ProUploadFieldProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const pureProps = useOmitProps(
      mergedFieldProps,
      proUploadFieldProps,
    )

    const { localeRef } = useLocale('ProUpload')

    const nUploadProps = computed<UploadProps>(() => {
      const { fileList, ...rest } = pureProps.value
      return {
        ...rest as UploadProps,
        onBeforeUpload,
        fileList: field.value.value ?? [],
        disabled: mergedReadonly.value || mergedFieldProps.value.disabled,
      }
    })

    function onBeforeUpload(data: {
      file: UploadFileInfo
      fileList: UploadFileInfo[]
    }) {
      const {
        maxSize,
        onOverSize,
        onUnAcceptType,
        onlyAcceptImage,
        onBeforeUpload: propOnBeforeUpload,
      } = mergedFieldProps.value

      const fileSize = data.file.file?.size
      const fileName = data.file.file?.name

      if (
        onlyAcceptImage
        && fileName
        // eslint-disable-next-line regexp/no-unused-capturing-group
        && !/\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)
      ) {
        onUnAcceptType && onUnAcceptType(data)
        return false
      }

      if (
        maxSize
        && fileSize
        && fileSize > maxSize
      ) {
        onOverSize && onOverSize(maxSize, data)
        return false
      }

      if (propOnBeforeUpload) {
        return propOnBeforeUpload(data as any)
      }
      return true
    }

    /**
     * issues: https://github.com/tusen-ai/naive-ui/issues/5312
     */
    function fixUploadDragger() {
      if (!mergedFieldProps.value.directory && !mergedFieldProps.value.directoryDnd)
        return
      const inst = instRef.value as any
      if (inst?.$slots?.default) {
        const defaultSlot = inst.$slots.default()[0] as any
        if (defaultSlot.children?.[0]?.children?.[0]?.type?.name === 'UploadDragger') {
          inst.draggerInsideRef.value = true
        }
      }
    }
    return {
      field,
      empty,
      instRef,
      emptyDom,
      localeRef,
      forwardRef,
      nUploadProps,
      mergedReadonly,
      proFormItemProps,
      fixUploadDragger,
    }
  },
  render() {
    if (!this.field.show.value) {
      return
    }
    return (
      <ProFormItem {...this.proFormItemProps}>
        {{
          ...this.$slots,
          default: () => {
            this.fixUploadDragger()
            let dom: VNodeChild
            if (this.mergedReadonly && this.empty) {
              dom = this.emptyDom
            }
            else {
              dom = (
                <NUpload
                  ref={(inst: UploadInst | null) => {
                    this.forwardRef(inst)
                    this.instRef = inst ?? undefined
                  }}
                  {...this.nUploadProps}
                >
                  {{
                    ...this.$slots,
                    default: () => {
                      return resolveSlot(this.$slots.default, () => {
                        if (this.nUploadProps.listType === 'image-card') {
                          return this.localeRef.title
                        }
                        return <NButton type="primary">{this.localeRef.title}</NButton>
                      })
                    },
                  }}
                </NUpload>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nUploadProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
