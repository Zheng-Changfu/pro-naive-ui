import { c, cB } from 'naive-ui'
import { DRAGGABLE_CLASS } from '../composables/use-drag-modal'

export default cB('pro-modal', [
  c(`.${DRAGGABLE_CLASS}`, `
      cursor: move;
      user-select: none;
  `),
])
