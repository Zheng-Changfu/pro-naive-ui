import { cB, cE, cM } from 'naive-ui'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  cM('sidebar', [
    cB('pro-layout__aside', `
      height: 100%;
      display: flex;
      flex-direction: column;
    `, [
      cE('header', `
        height: 49px;
        flex-shrink: 0;
      `),
      cE('main', `
        flex-grow: 1;
        flex-basis: 0;
      `),
      cE('footer', `
        height:41px;
        flex-shrink: 0;
      `),
    ]),
    cB('pro-layout__main', `
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
    `, [
      cE('header', `
        height: 50px;
        display: flex;
        flex-shrink: 0;
      `),
      cE('tabs', `
          height: 38px;
          display: flex;
          flex-shrink: 0;
      `),
      cE('content', `
        flex-grow: 1;
        flex-basis: 0;
      `),
      cE('footer', `
        height: 32px;
        flex-shrink: 0;
      `),
    ]),
  ]),
])
