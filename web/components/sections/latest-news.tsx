"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealItem } from "@/components/shared/scroll-reveal";
import { getPublishedArticles } from "@/data/news";
import { NEWS_CATEGORIES } from "@/data/news";
import { formatDate } from "@/lib/format";

const latestArticles = getPublishedArticles().slice(0, 3);

export function LatestNews() {
  return (
    <section className="py-[var(--padding-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--padding-section-x)]">
        <ScrollReveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Berita Terkini
              </h2>
              <p className="mt-3 text-muted-foreground">
                Informasi terbaru seputar kegiatan konservasi, pengumuman, dan siaran pers.
              </p>
            </div>
            <Link href="/berita" className="hidden sm:block">
              <Button variant="ghost" className="gap-1">
                Lihat Semua <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => {
            const category = NEWS_CATEGORIES.find((c) => c.slug === article.category);
            return (
              <ScrollRevealItem key={article.slug}>
                <Link href={`/berita/${article.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url('${article.featuredImage}')` }}
                      />
                    </div>
                    <CardContent className="flex flex-col gap-3 p-5">
                      {category && (
                        <Badge variant="secondary" className="w-fit text-xs">
                          {category.name}
                        </Badge>
                      )}
                      <h3 className="line-clamp-2 font-semibold leading-snug">
                        {article.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {formatDate(article.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {article.readingTime} min
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/berita">
            <Button variant="ghost" className="gap-1">
              Lihat Semua Berita <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
