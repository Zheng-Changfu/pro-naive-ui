/**
 * 可以停止后续遍历的广度优先搜索，为了优化性能
 */
export function bfs<T>(
  data: T[],
  callback: (item: T, level: number, stop: () => void) => void,
  childrenField = 'children',
) {
  let stoped = false
  const levelSymbol = Symbol('level')
  let queue = data.map(item => ({ ...item, [levelSymbol]: 1 }))

  const stop = () => {
    stoped = true
  }

  while (queue.length > 0) {
    const item = queue.shift()!
    const { [levelSymbol]: level, ...originalItem } = item
    callback(originalItem as T, level, stop)
    if (stoped) {
      queue = []
      queue.length = 0
      break
    }
    const children = (item as any)[childrenField] as T[] | undefined
    if (children && children.length > 0) {
      queue.push(...children.map(child => ({ ...child, [levelSymbol]: level + 1 })))
    }
  }
}
