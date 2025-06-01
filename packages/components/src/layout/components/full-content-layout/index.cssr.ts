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
    `, [
      cE('inner', `
        display: flex;
        flex-direction: column;
        min-height: 100%;
        height: auto;
      `),
    ]),
    cB('pro-layout__main', `
      flex-grow: 1;
      flex-basis: 0;
    `),
  ]),
])
