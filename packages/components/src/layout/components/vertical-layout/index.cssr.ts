import { cB, cE, cM } from 'naive-ui'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  cM('vertical', [
    cB('pro-layout__aside', `
      width: var(--pro-layout-sidebar-width);
      height: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      background: var(--pro-layout-color);
      border-right: 1px solid var(--pro-layout-border-color);
      transition: 
        background .3s var(--pro-bezier),
        border-color .3s var(--pro-bezier);
    `, [
      cE('logo', `
        height: var(--pro-layout-header-height);
        width: 100%;
        flex-shrink: 0;
      `),
      cE('main', `
        flex-grow: 1;
        flex-basis: 0;
      `),
    ]),
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
    cB('pro-layout__scroll-behavior', [
      cM('fixed', `
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      `),
    ]),
    cB('pro-layout__header', `
      height: var(--pro-layout-header-height);
      display: flex;
      align-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      background: var(--pro-layout-color);
      border-bottom: 1px solid var(--pro-layout-border-color);
      transition:
        background .3s var(--pro-bezier),
        border-color .3s var(--pro-bezier);
    `, [
      cM('placeholder', `
        height: var(--pro-layout-header-height);
      `),
      cE('logo', `
        height: 100%;
        width: var(--pro-layout-sidebar-width);
        flex-shrink: 0;
      `),
      cE('left', `
        height: 100%;
      `),
      cE('menu', `
          height: 100%;
          // TODO
      `),
      cE('center', `
        height: 100%;
        flex: 1;
      `),
      cE('right', `
        height: 100%;
      `),
    ]),
    cB('pro-layout__tabbar', `
      height: var(--pro-layout-tabbar-height);
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;
      background: var(--pro-layout-color);
      border-bottom: 1px solid var(--pro-layout-border-color);
      transition:
        background .3s var(--pro-bezier),
        border-color .3s var(--pro-bezier);
    `, [
      cM('placeholder', `
        height: var(--pro-layout-tabbar-height);
      `),
    ]),
    cB('pro-layout__main', `
      flex-grow: 1;
      flex-basis: 0;
    `),
    cB('pro-layout__footer', `
      height: var(--pro-layout-footer-height);
      flex-shrink: 0;
      background: var(--pro-layout-color);
      transition: background .3s var(--pro-bezier);
    `, [
      cM('fixed', `
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      `),
    ]),
  ]),
])
