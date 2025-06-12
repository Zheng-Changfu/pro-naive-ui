import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  rules: {
    'no-console': 'off',
    'no-async-promise-executor': 'off',
    'vue/html-comment-content-spacing': 'off',
    'no-template-curly-in-string': 'off',
    'ts/ban-ts-comment': 'off',
    'no-use-before-define': 'off',
    'ts/no-unused-expressions': 'off',
    'vue/one-component-per-file': 'off',
    'perfectionist/sort-exports': 'off',
  },
})
