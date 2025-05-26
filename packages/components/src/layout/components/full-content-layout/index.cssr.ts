import { cB, cE, cM } from 'naive-ui'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  cM('full-content', [
    cB('pro-layout__scrollbar', `
      position:relative;
      flex: 1;
    `),
    cB('pro-layout__main', `
      display: flex;
      flex-direction: column;
      min-height: 100%;
      height: auto;
    `, [
      cE('content', `
        flex-grow: 1;
        flex-basis: 0;
      `),
    ]),
  ]),
])
