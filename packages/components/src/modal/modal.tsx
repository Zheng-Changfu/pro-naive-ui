import type { ModalProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProModalProps } from './props'
import type { ProModalSlots } from './slots'
import { NModal } from 'naive-ui'
import { computed, defineComponent, onUnmounted } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { mergeClass } from '../_utils/merge-class'
import { useOmitProps, useOverrideProps } from '../composables'
import { useCaptureOpenModalElementPosition } from './composables/use-capture-open-modal-element-position'
import { useDragModal } from './composables/use-drag-modal'
import { proModalExtendProps, proModalProps } from './props'
import style from './styles/index.cssr'

let timer: any
const name = 'ProModal'
export default defineComponent({
  name,
  props: proModalProps,
  slots: Object as SlotsType<ProModalSlots>,
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps<ProModalProps>(
      name,
      props,
    )

    useMountStyle(
      'ProModal',
      'pro-modal',
      style,
    )

    const modalProps = useOmitProps(
      overridedProps,
      proModalExtendProps,
    )

    const {
      stopDrag,
      startDrag,
      canDraggable,
      draggableClass,
    } = useDragModal(overridedProps, {
      onEnd: (el) => {
        timer && clearTimeout(timer)
        /**
         * 这里加个定时器是因为 naive 内部也会计算 transform-origin
         * 我们要在它后面执行，防止被覆盖
         */
        timer = setTimeout(() => {
          syncTransformOrigin(el)
        })
      },
    })

    const {
      position: openModalElementPosition,
    } = useCaptureOpenModalElementPosition(overridedProps)

    const draggableClassProps = computed<ModalProps>(() => {
      const {
        preset,
        titleClass,
        headerClass,
      } = overridedProps.value

      if (preset === 'confirm' || preset === 'dialog') {
        return {
          titleClass: mergeClass(
            titleClass,
            draggableClass.value,
          ),
        }
      }

      if (preset === 'card') {
        return {
          headerClass: mergeClass(
            headerClass,
            draggableClass.value,
          ),
        }
      }
      return {}
    })

    const nModalProps = computed<ModalProps>(() => {
      return {
        ...modalProps.value,
        ...draggableClassProps.value,
        onAfterLeave: onAfterLeave as any,
        onAfterEnter: onAfterEnter as any,
      }
    })

    function onAfterEnter(modal: HTMLElement) {
      canDraggable.value && startDrag(modal)
      overridedProps.value.onAfterEnter && (overridedProps.value.onAfterEnter as any)(modal)
    }

    function onAfterLeave(modal: HTMLElement) {
      stopDrag()
      timer && clearTimeout(timer)
      overridedProps.value.onAfterLeave && (overridedProps.value.onAfterLeave as any)(modal)
    }

    /**
     * 拖拽结束后需要同步 transform-origin
     * 否则关闭动画位置不正确
     */
    function syncTransformOrigin(el: HTMLElement) {
      const { transformOrigin } = overridedProps.value
      if (transformOrigin === 'center') {
        return
      }
      const mousePosition = openModalElementPosition.value
      if (!mousePosition) {
        return
      }
      const scrollTop = 0 // TODO: 这里貌似还需要计算一下滚动条
      const { offsetLeft, offsetTop } = el
      if (mousePosition) {
        const top = mousePosition.y
        const left = mousePosition.x
        const transformOriginX = -(offsetLeft - left)
        const transformOriginY = -(offsetTop - top - scrollTop)
        el.style.transformOrigin = `${transformOriginX}px ${transformOriginY + scrollTop}px`
      }
    }

    onUnmounted(() => {
      timer && clearTimeout(timer)
    })
    return {
      nModalProps,
      draggableClass,
      mergedClsPrefix,
      preset: computed(() => overridedProps.value.preset),
    }
  },
  render() {
    return (
      <NModal
        {...this.nModalProps}
        class={[`${this.mergedClsPrefix}-pro-modal`]}
      >
        {{
          ...this.$slots,
          default: () => {
            return this.$slots.default?.({ draggableClass: this.draggableClass })
          },
        }}
      </NModal>
    )
  },
})
