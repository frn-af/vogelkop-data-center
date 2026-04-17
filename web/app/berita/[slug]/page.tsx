import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getArticleBySlug, SAMPLE_ARTICLES, getCategoryBySlug } from "@/data/news";
import { formatDate } from "@/lib/format";
import { CalendarDays, Clock, User, Share2 } from "lucide-react";

export function generateStaticParams() {
  return SAMPLE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryBySlug(article.category);

  return (
    <div className="mx-auto max-w-4xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Berita", href: "/berita" },
          { label: article.title },
        ]}
      />

      <article className="mt-8">
        <div className="aspect-video w-full rounded-xl bg-muted mb-8" />
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              {category?.name || article.category}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readingTime} menit baca
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 border-y py-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-green max-w-none whitespace-pre-wrap mt-8 text-lg leading-relaxed">
          {article.content}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t pt-8">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted p-6">
            <div className="flex items-center gap-3">
              <Share2 className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Bagikan artikel ini</span>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded bg-background border" />
              <div className="h-8 w-8 rounded bg-background border" />
              <div className="h-8 w-8 rounded bg-background border" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
