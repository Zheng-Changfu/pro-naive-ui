import { describe, expect, it } from 'vitest'
import { useLayoutMenu } from '../use-layout-menu'

const menus = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    children: [
      {
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            children: [
              {
                label: '叙事者-1',
                key: 'narrator-1',
              },
            ],
          },
          {
            label: '羊男',
            key: 'sheep-man',
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]

const topLevelMenus = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
  },
]

describe('v-model:value、autoActiveDetachedMenu、options', () => {
  it('should work with `horizontal` layout', () => {
    const { layout } = useLayoutMenu({
      menus,
      mode: 'horizontal',
    })
    expect(layout.value.verticalMenuProps).toStrictEqual({})
    expect(layout.value.verticalExtraMenuProps).toStrictEqual({})
    expect(layout.value.horizontalMenuProps.options).toStrictEqual(menus)
  })

  it('should work with `vertical` layout', () => {
    const { layout } = useLayoutMenu({
      menus,
      mode: 'vertical',
    })
    expect(layout.value.horizontalMenuProps).toStrictEqual({})
    expect(layout.value.verticalExtraMenuProps).toStrictEqual({})
    expect(layout.value.verticalMenuProps.options).toStrictEqual(menus)
  })

  it('should work with `sidebar` layout', () => {
    const { layout } = useLayoutMenu({
      menus,
      mode: 'sidebar',
    })
    expect(layout.value.horizontalMenuProps).toStrictEqual({})
    expect(layout.value.verticalExtraMenuProps).toStrictEqual({})
    expect(layout.value.verticalMenuProps.options).toStrictEqual(menus)
  })

  it('should work with `full-content` layout', () => {
    const { layout } = useLayoutMenu({
      menus,
      mode: 'full-content',
    })
    expect(layout.value.horizontalMenuProps).toStrictEqual({})
    expect(layout.value.verticalExtraMenuProps).toStrictEqual({})
    expect(layout.value.verticalMenuProps).toStrictEqual({})
  })

  it('should work with `mixed-sidebar` layout', () => {
    const { layout, activeKey } = useLayoutMenu({
      menus,
      mode: 'mixed-sidebar',
    })
    activeKey.value = 'pinball-1973'
    expect(layout.value.horizontalMenuProps.value).toBe('pinball-1973')
    expect(layout.value.verticalMenuProps.value).toBe('pinball-1973')
    activeKey.value = 'narrator'
    expect(layout.value.horizontalMenuProps.value).toBe('dance-dance-dance')
    expect(layout.value.verticalMenuProps.value).toBe('narrator')
    // options
    activeKey.value = 'pinball-1973'
    expect(layout.value.verticalExtraMenuProps).toStrictEqual({})
    expect(layout.value.horizontalMenuProps.options).toStrictEqual(topLevelMenus)
    expect(layout.value.verticalMenuProps.options).toStrictEqual([
      {
        label: '鼠',
        key: 'rat',
      },
    ])
  })

  it('should work with `two-column` layout', () => {
    const { layout, activeKey } = useLayoutMenu({
      menus,
      mode: 'two-column',
    })
    activeKey.value = 'pinball-1973'
    expect(layout.value.verticalMenuProps.value).toBe('pinball-1973')
    expect(layout.value.verticalExtraMenuProps.value).toBe('pinball-1973')
    activeKey.value = 'narrator'
    expect(layout.value.verticalMenuProps.value).toBe('dance-dance-dance')
    expect(layout.value.verticalExtraMenuProps.value).toBe('narrator')

    // options
    activeKey.value = 'pinball-1973'
    expect(layout.value.horizontalMenuProps).toStrictEqual({})
    expect(layout.value.verticalMenuProps.options).toStrictEqual(topLevelMenus)
    expect(layout.value.verticalExtraMenuProps.options).toStrictEqual([
      {
        label: '鼠',
        key: 'rat',
      },
    ])
  })

  it('should work with `mixed-two-column` layout', () => {
    const { layout, activeKey } = useLayoutMenu({
      menus,
      mode: 'mixed-two-column',
    })
    activeKey.value = 'dance-dance-dance'
    expect(layout.value.horizontalMenuProps.value).toBe('dance-dance-dance')
    expect(layout.value.verticalMenuProps.value).toBe('dance-dance-dance')
    expect(layout.value.verticalExtraMenuProps.value).toBe('dance-dance-dance')
    activeKey.value = 'people'
    expect(layout.value.horizontalMenuProps.value).toBe('dance-dance-dance')
    expect(layout.value.verticalMenuProps.value).toBe('people')
    expect(layout.value.verticalExtraMenuProps.value).toBe('people')
    activeKey.value = 'narrator-1'
    expect(layout.value.horizontalMenuProps.value).toBe('dance-dance-dance')
    expect(layout.value.verticalMenuProps.value).toBe('people')
    expect(layout.value.verticalExtraMenuProps.value).toBe('narrator-1')

    // options
    const danceNextLevelChildren = [
      {
        label: '人物',
        key: 'people',
      },
      {
        label: '饮品',
        key: 'beverage',
      },
      {
        label: '食物',
        key: 'food',
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ]
    const danceChildrenWithoutNextLevel = [
      {
        label: '叙事者',
        key: 'narrator',
        children: [
          {
            label: '叙事者-1',
            key: 'narrator-1',
          },
        ],
      },
      {
        label: '羊男',
        key: 'sheep-man',
      },
    ]
    activeKey.value = 'dance-dance-dance'
    expect(layout.value.horizontalMenuProps.options).toStrictEqual(topLevelMenus)
    expect(layout.value.verticalMenuProps.options).toStrictEqual(danceNextLevelChildren)
    expect(layout.value.verticalExtraMenuProps.options).toStrictEqual([])
    activeKey.value = 'people'
    expect(layout.value.horizontalMenuProps.options).toStrictEqual(topLevelMenus)
    expect(layout.value.verticalMenuProps.options).toStrictEqual(danceNextLevelChildren)
    expect(layout.value.verticalExtraMenuProps.options).toStrictEqual(danceChildrenWithoutNextLevel)
    activeKey.value = 'narrator-1'
    expect(layout.value.horizontalMenuProps.options).toStrictEqual(topLevelMenus)
    expect(layout.value.verticalMenuProps.options).toStrictEqual(danceNextLevelChildren)
    expect(layout.value.verticalExtraMenuProps.options).toStrictEqual(danceChildrenWithoutNextLevel)
  })
})
