import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getArticlesByCategory, getCategoryBySlug, NEWS_CATEGORIES } from "@/data/news";
import { formatDate } from "@/lib/format";
import { CalendarDays, Clock, User } from "lucide-react";

export function generateStaticParams() {
  return NEWS_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Kategori Tidak Ditemukan" };
  }

  return {
    title: `Berita: ${category.name}`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(categorySlug);

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Berita", href: "/berita" },
          { label: "Kategori", href: "/berita" },
          { label: category.name },
        ]}
      />

      <div className="mt-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kategori: {category.name}</h1>
          <p className="mt-2 text-muted-foreground">{category.description}</p>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.slug} className="overflow-hidden">
                <Link href={`/berita/${article.slug}`} className="block">
                  <div className="aspect-video bg-muted" />
                </Link>
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      {category.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readingTime} mnt baca
                    </span>
                  </div>
                  <Link href={`/berita/${article.slug}`} className="group">
                    <h3 className="line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <p className="text-muted-foreground">Belum ada artikel dalam kategori ini.</p>
            <Link href="/berita" className="mt-4 text-sm font-medium text-primary hover:underline">
              Kembali ke semua berita
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
