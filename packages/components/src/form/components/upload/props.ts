import type { UploadFileInfo, UploadProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export interface ProUploadFieldProps extends UploadProps {
  /**
   * 按钮文本，优先级低于插槽
   */
  title?: string
  /**
   * 文件的最大大小，单位 kb
   */
  maxSize?: number
  /**
   * 是否只允许上传图片类型
   * @default false
   */
  onlyAcceptImage?: boolean
  /**
   * 超出文件最大大小时触发的回调
   */
  onOverSize?: (maxSize: number, data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => void
  /**
   * 上传不支持类型文件时触发的回调
   */
  onUnAcceptType?: (data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => void
}

export const proUploadFieldProps = {
  /**
   * 按钮文本，优先级低于插槽
   */
  title: String,
  /**
   * 文件的最大大小，单位 kb
   */
  maxSize: Number,
  /**
   * 是否只允许上传图片类型
   */
  onlyAcceptImage: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 超出文件最大大小时触发的回调
   */
  onOverSize: Function as PropType<(maxSize: number, data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => void>,
  /**
   * 上传不支持类型文件时触发的回调
   */
  onUnAcceptType: Function as PropType<(data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
  }) => void>,
} as const

export const proUploadProps = {
  ...proFieldSharedProps,
  valueModelName: {
    type: String,
    default: 'fileList',
  },
  fieldProps: Object as PropType<BaseFieldProps<ProUploadFieldProps>>,
} as const

export type ProUploadProps = ExtractPublicPropTypes<typeof proUploadProps>
