import { c, cB, cE } from 'naive-ui'

export default c([
  cB('card', [
    // 兼容 naive-ui 2.44.0 以下
    cE('content', `
      overflow: auto; 
    `),
    cB('card-content', `
      overflow: auto; 
    `),
  ]),
  cB('modal-scroll-content', `
     height: 100%;
  `),
])
