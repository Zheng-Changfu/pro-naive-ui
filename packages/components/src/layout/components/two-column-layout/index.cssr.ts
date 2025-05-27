import { cB, cE, cM } from 'naive-ui'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  cM('two-column', [
    cB('pro-layout__aside', `
      height: 100%;
      flex-shrink: 0;
      display: flex;
    `, [
      cB('pro-layout__aside__one-column', `
        width: var(--pro-layout-sidebar-mixed-width);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
      `, [
        cE('header', `
          height: var(--pro-layout-header-height);
          flex-shrink: 0;
        `),
        cE('main', `
          flex-grow: 1;
          flex-basis: 0;
          padding-top: 8px;
        `),
      ]),
      cB('pro-layout__aside__two-column', `
        width: var(--pro-layout-sidebar-width);
        flex:1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        border-left: 1px solid var(--pro-layout-border-color);
        border-right: 1px solid var(--pro-layout-border-color);
        transition: 
          background .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
        `, [
        cE('header', `
          flex-shrink: 0;
          height: var(--pro-layout-header-height);
        `),
        cE('main', `
          flex-grow: 1;
          flex-basis: 0;
          padding-top: 8px;
        `),
      ]),
    ]),
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
      cE('header', `
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
          width: 100%;
          position: absolute;
          top: var(--pro-layout-header-height, 0);
          left: 0;
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
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        `),
      ]),
    ]),
  ]),
])
