"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealItem } from "@/components/shared/scroll-reveal";
import { CONSERVATION_AREAS } from "@/data/areas";
import { AREA_TYPE_LABELS } from "@/data/types";
import { formatHectares } from "@/lib/format";

const featured = CONSERVATION_AREAS.slice(0, 4);

export function AreasShowcase() {
  return (
    <section className="bg-muted/50 py-[var(--padding-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--padding-section-x)]">
        <ScrollReveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Kawasan Konservasi
              </h2>
              <p className="mt-3 text-muted-foreground">
                Jelajahi lebih dari 27 kawasan konservasi di Semenanjung Kepala Burung dan Kepulauan Raja Ampat.
              </p>
            </div>
            <Link href="/kawasan" className="hidden sm:block">
              <Button variant="ghost" className="gap-1">
                Lihat Semua <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((area) => (
            <ScrollRevealItem key={area.slug}>
              <Link href={`/kawasan/${area.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url('${area.heroImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute left-3 top-3" variant="secondary">
                      {AREA_TYPE_LABELS[area.type]}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold leading-snug">{area.name}</h3>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {area.location.regency}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatHectares(area.areaHectares)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/kawasan">
            <Button variant="ghost" className="gap-1">
              Lihat Semua Kawasan <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
