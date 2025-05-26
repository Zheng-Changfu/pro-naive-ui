import { cB, cE, cM } from 'naive-ui'

/**
 * 头部 fixed prop 无效，因为 fixed 有效后看起来太怪了
 */
export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  cM('mixed-sidebar', [
    cB('pro-layout__header', `
        height: var(--pro-layout-header-height);
        display: flex;
        flex-shrink: 0;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition: 
          background .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
      `, [
      cM('fixed', `
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        `),
    ]),
    cB('pro-layout__wrapper', `
      display: flex;
      flex-direction: column;
      min-height: 100%;
      height: auto;
    `),
    cB('pro-layout__main-wrapper', `
        width: 100%;
        display: flex;
        flex-grow: 1;
    `),
    cB('pro-layout__aside', `
        position: absolute;
        top: var(--pro-layout-header-height, 0px);
        left: 0;
        height: calc(100% - var(--pro-layout-header-height, 0px));
        width: var(--pro-layout-sidebar-width);
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
      cE('main', `
        flex-grow: 1;
        flex-basis: 0;
      `),
    ]),
    cB('pro-layout__main', `
      flex-grow: 1;
      flex-basis: 0;
      display: flex;
      flex-direction: column;
      min-height: 100%;
      height: auto;
      margin-left: var(--pro-layout-sidebar-width, 0);
    `, [
      cE('tabbar', `
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
        cM('fixed', `
          width: calc(100% - var(--pro-layout-sidebar-width, 0));
          position: absolute;
          top: var(--pro-layout-header-height, 0);
          left: var(--pro-layout-sidebar-width, 0);
        `),
      ]),
      cE('content', `
        flex-grow: 1;
        flex-basis: 0;
      `),
      cE('footer', `
        height: var(--pro-layout-footer-height);
        flex-shrink: 0;
        background: var(--pro-layout-color);
        transition: background .3s var(--pro-bezier);
      `, [
        cM('fixed', `
          width: calc(100% - var(--pro-layout-sidebar-width, 0));
          position: absolute;
          bottom: 0;
          left: var(--pro-layout-sidebar-width, 0);
        `),
      ]),
    ]),
  ]),
])
