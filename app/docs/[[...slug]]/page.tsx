import { notFound } from 'next/navigation'
import { ArticleBreadcrumb } from '@/components/article/breadcrumb'
import { DocumentHeader } from '@/components/article/document-header'
import { Pagination } from '@/components/article/pagination'
import { TableOfContents } from '@/components/toc'
import { Typography } from '@/components/ui/typography'
import { getDocument } from '@/lib/markdown'
import { PageRoutes } from '@/lib/pageroutes'
import { Settings } from '@/types/settings'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export default async function Pages({ params }: PageProps) {
  const { slug = [] } = await params
  const pathName = slug.join('/')
  const res = await getDocument(pathName)

  if (!res) notFound()

  const { frontmatter, content, tocs } = res

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <section className="min-w-0 flex-1">
        <ArticleBreadcrumb paths={slug} />
        <DocumentHeader title={frontmatter.title} description={frontmatter.description} />
        <Typography>
          <section>{content}</section>
          <Pagination pathname={pathName} />
        </Typography>
      </section>
      <TableOfContents tocs={{ tocs }} pathName={pathName} frontmatter={frontmatter} />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug = [] } = await params
  const pathName = slug.join('/')
  const res = await getDocument(pathName)

  if (!res) return null

  const { frontmatter, lastUpdated } = res

  return {
    title: `${frontmatter.title} - ${Settings.title}`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    ...(lastUpdated && {
      lastModified: new Date(lastUpdated).toISOString(),
    }),
    openGraph: {
      title: `${frontmatter.title} - ${Settings.openGraph.title}`,
      description: frontmatter.description || Settings.openGraph.description,
      url: `${Settings.metadataBase}/docs/${pathName}`,
      siteName: Settings.openGraph.siteName,
      type: 'article',
      images: Settings.openGraph.images.map((image) => ({
        ...image,
        url: `${Settings.metadataBase}${image.url}`,
      })),
    },
    twitter: {
      title: `${frontmatter.title} - ${Settings.twitter.title}`,
      description: frontmatter.description || Settings.twitter.description,
      card: Settings.twitter.card,
      site: Settings.twitter.site,
      images: Settings.twitter.images.map((image) => ({
        ...image,
        url: `${Settings.metadataBase}${image.url}`,
      })),
    },
    alternates: {
      canonical: `${Settings.metadataBase}/docs/${pathName}`,
    },
  }
}

export function generateStaticParams() {
  return PageRoutes.filter((item) => item.href).map((item) => ({
    slug: item.href.split('/').slice(1),
  }))
}
