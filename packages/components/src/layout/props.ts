import type { ExtractPublicPropTypes } from 'vue'

export const sharedLayoutProps = {

} as const

export type SharedLayoutProps = ExtractPublicPropTypes<typeof sharedLayoutProps>
