import { cB, cE, cM } from 'naive-ui'

export default cB('pro-data-table', [
  cM('tr-dragging', `
    cursor: grab;
  `),
  cM('flex-height', `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `, [
    cB('pro-card', `
      flex-grow: 1;
    `),
    cB('card', [
      // 兼容 naive-ui 2.44.0 以下
      cE('content', `
        display: flex;
        flex-direction: column;
      `, [
        cB('pro-collapse-transition', `
        display: flex;
        flex-direction: column;
        flex-grow: 1;
     `, [
          cB('data-table', `
          flex-grow:1;  
        `),
        ]),
      ]),
      cB('card-content', `
        display: flex;
        flex-direction: column;
      `, [
        cB('pro-collapse-transition', `
        display: flex;
        flex-direction: column;
        flex-grow: 1;
     `, [
          cB('data-table', `
          flex-grow:1;  
        `),
        ]),
      ]),
    ]),
  ]),
  cE('extra', `
    margin-block-end: 16px;
  `),
])
