import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { PageRoutes } from '../lib/pageroutes'

interface SearchEntry {
  title: string
  description: string
  keywords: string[]
  href: string
  locale: 'en' | 'id'
  content: string
}

const CONTENTS_DIR = path.join(process.cwd(), 'contents')
const OUTPUT_DIR = path.join(process.cwd(), 'public/search-data')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'search-data.json')

function mdxToPlainText(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function loadDocument(slug: string, locale: 'en' | 'id'): Promise<SearchEntry | null> {
  const filePath =
    locale === 'id'
      ? path.join(CONTENTS_DIR, 'id/docs', slug, 'index.mdx')
      : path.join(CONTENTS_DIR, 'docs', slug, 'index.mdx')

  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      title: data.title ?? '',
      description: data.description ?? '',
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      href: `/${slug}`,
      locale,
      content: mdxToPlainText(content),
    }
  } catch {
    return null
  }
}

async function generate() {
  const entries: SearchEntry[] = []

  for (const route of PageRoutes) {
    const slug = route.href.replace(/^\//, '')

    const [enEntry, idEntry] = await Promise.all([
      loadDocument(slug, 'en'),
      loadDocument(slug, 'id'),
    ])

    if (enEntry) entries.push(enEntry)
    if (idEntry) entries.push(idEntry)
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(entries, null, 2), 'utf-8')

  console.log(
    `Generated ${entries.length} search entries at ${path.relative(process.cwd(), OUTPUT_FILE)}`
  )
}

generate().catch((err) => {
  console.error('Failed to generate content JSON:', err)
  process.exit(1)
})
