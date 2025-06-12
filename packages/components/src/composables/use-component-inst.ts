import { shallowRef, type ShallowRef } from 'vue'

type Inst = any
type SetComponentInst<Inst> = (methods: Inst) => void

export interface UseComponentInstReturn<Inst> {
  exposed: Partial<Inst>
  registerInst: SetComponentInst<Inst>
  instRef: ShallowRef<Inst | undefined>
}

export function useComponentInst<T = Inst>(): UseComponentInstReturn<T> {
  const exposed = {}
  const instRef = shallowRef<T>()

  function registerInst(methods: T) {
    Object.assign(exposed, methods)
  }

  return {
    instRef,
    exposed,
    registerInst,
  }
}
