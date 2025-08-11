import type MarkdownIt from 'markdown-it'
import demoPlugin from './demo.ts'
import repositoryPlugin from './repository.ts'

export default function mdPlugin(md: MarkdownIt) {
  demoPlugin(md)
  repositoryPlugin(md)
}
