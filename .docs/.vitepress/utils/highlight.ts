import hljs from 'highlight.js'

function wrap(code: string): string {
  return `<pre v-pre><code language="javascript">${code}\r\n</code></pre>`
}
export function highlight(str: string, lang: string) {
  if (!lang) {
    return wrap(str)
  }

  const code = hljs.highlight(str, { language: 'javascript' }).value

  return wrap(code)
}
