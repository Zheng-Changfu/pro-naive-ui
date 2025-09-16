import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import axios from 'axios'
import { glob } from 'glob'
import { marked } from 'marked'

async function bootstrap() {
  const nsRecord = {}
  const files = await glob('**/index.demo-entry.md')
  const sortedFiles = sortFiles(files)
  for (const file of sortedFiles) {
    const content = await readFile(file, 'utf-8')
    const matched = content.matchAll(/<!--\s*replace、([\s\S]*?)-->/g)
    if (!matched) {
      continue
    }
    const results = [...matched].map((m) => {
      const inner = m[1].trim()
      return inner.split('、').map(s => s.trim())
    })
    for (let i = 0; i < results.length; i++) {
      const item = results[i]
      const [ns, type, link, description] = item
      if (nsRecord[ns] && nsRecord[ns][type]) {
        continue
      }
      const data = await fetchContent(resolveHref(item))
      const tokens = marked.lexer(data)
      const tableToken = matches(tokens, link)
      if (!tableToken) {
        console.info(`❌ 解析失败: ${ns} ${type} ${link}`)
        continue
      }
      if (!nsRecord[ns]) {
        nsRecord[ns] = {}
      }
      nsRecord[ns][type] = {
        ns,
        type,
        link,
        description,
        filePath: file,
        children: tableToken.rows,
      }
      console.info(`✅ 解析成功: ${ns} ${type} ${link}`)
    }
  }
  writeFile(
    resolve(cwd(), `./scripts/cache/api.json`),
    JSON.stringify(nsRecord, null, 2),
    'utf-8',
  )
}

function fetchContent(url) {
  return axios.get(url).then(res => res.data)
}

function matches(tokens, link) {
  let matched = false
  const [,anchor] = link.match(/#([\s\S]+)/)
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === 'heading' && token.text === anchor.replace(/-/g, ' ')) {
      matched = true
      continue
    }
    if (matched && token.type === 'table') {
      return token
    }
  }
}

function resolveHref(item) {
  const [ns,, link] = item
  if (link.startsWith('https://')) {
    // naive-ui link
    return `https://raw.githubusercontent.com/tusen-ai/naive-ui/main/src/${ns.replace(/^n-/, '')}/demos/zhCN/index.demo-entry.md`
  }
  // builtin nesting link
  const nsToRawMdHrefRecord = {
    'pro-field': 'https://raw.githubusercontent.com/Zheng-Changfu/pro-naive-ui/master/packages/components/src/form/components/demos/zhCN/index.demo-entry.md',
  }
  if (nsToRawMdHrefRecord[ns]) {
    return nsToRawMdHrefRecord[ns]
  }
  // builtin link
  return `https://raw.githubusercontent.com/Zheng-Changfu/pro-naive-ui/master/packages/components/src/${ns.replace(/^pro-/, '')}/demos/zhCN/index.demo-entry.md`
}

function sortFiles(files) {
  const sortedFiles = []
  // 被其他 file 依赖的 file 需要提前编译
  const preCompileFiles = [
    'src/form/demos/zhCN/index.demo-entry.md',
    'src/form/components/demos/zhCN/index.demo-entry.md',
    'src/data-table/demos/zhCN/index.demo-entry.md',
  ]
  for (const file of preCompileFiles) {
    const index = files.findIndex(f => f.includes(file))
    if (~index) {
      sortedFiles.push(files[index])
    }
  }
  for (const file of files) {
    if (!sortedFiles.includes(file)) {
      sortedFiles.push(file)
    }
  }
  return sortedFiles
}

bootstrap()
