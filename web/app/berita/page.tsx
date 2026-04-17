import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getPublishedArticles, NEWS_CATEGORIES } from "@/data/news";
import { formatDate } from "@/lib/format";
import { CalendarDays, Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description: "Berita terbaru, pengumuman resmi, dan kisah konservasi dari BBKSDA Papua Barat Daya.",
};

export default function BeritaPage() {
  const articles = getPublishedArticles();

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Berita" }]} />
      
      <div className="mt-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Berita & Pengumuman</h1>
          <p className="mt-2 text-muted-foreground">
            Informasi terkini seputar kegiatan konservasi dan pengumuman resmi di wilayah Papua Barat Daya.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" render={<Link href="/berita" />}>
            Semua
          </Button>
          {NEWS_CATEGORIES.map((category) => (
            <Button
              key={category.slug}
              variant="outline"
              size="sm"
              render={<Link href={`/berita/kategori/${category.slug}`} />}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug} className="overflow-hidden">
              <Link href={`/berita/${article.slug}`} className="block">
                <div className="aspect-video bg-muted" />
              </Link>
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {NEWS_CATEGORIES.find((c) => c.slug === article.category)?.name || article.category}
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
      </div>
    </div>
  );
}
