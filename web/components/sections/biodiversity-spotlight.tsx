"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealItem } from "@/components/shared/scroll-reveal";
import { SPECIES_DATABASE } from "@/data/species";

const spotlight = SPECIES_DATABASE.filter((s) => s.protectionStatus === "dilindungi").slice(0, 4);

export function BiodiversitySpotlight() {
  return (
    <section className="bg-muted/50 py-[var(--padding-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--padding-section-x)]">
        <ScrollReveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Keanekaragaman Hayati
              </h2>
              <p className="mt-3 text-muted-foreground">
                Spesies endemik dan dilindungi di kawasan Semenanjung Kepala Burung.
              </p>
            </div>
            <Link href="/galeri" className="hidden sm:block">
              <Button variant="ghost" className="gap-1">
                Lihat Galeri <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {spotlight.map((species) => (
            <ScrollRevealItem key={species.slug}>
              <Link href={`/galeri/${species.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url('${species.heroImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-white">{species.localName}</h3>
                      <p className="text-xs italic text-white/70">{species.scientificName}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="destructive" className="gap-1 text-[10px]">
                        <Shield className="size-3" />
                        Dilindungi
                      </Badge>
                      {species.citesAppendix && (
                        <span className="text-xs text-muted-foreground">
                          CITES {species.citesAppendix}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {species.iucnStatus} · {species.taxonClass}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/galeri">
            <Button variant="ghost" className="gap-1">
              Lihat Galeri Lengkap <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
