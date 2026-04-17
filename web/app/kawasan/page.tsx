import type { Metadata } from "next";
import Link from "next/link";
import { Map as MapIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CONSERVATION_AREAS } from "@/data/areas";
import { AREA_TYPE_LABELS } from "@/data/types";
import { formatHectares } from "@/lib/format";

export const metadata: Metadata = {
  title: "Kawasan Konservasi - BBKSDA Papua Barat Daya",
  description: "Daftar kawasan konservasi yang dikelola oleh BBKSDA Papua Barat Daya di wilayah Semenanjung Kepala Burung.",
};

export default function KawasanPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Kawasan Konservasi" }]} />

      <div className="mt-8 space-y-12">
        <section className="relative overflow-hidden rounded-2xl bg-muted px-6 py-16 sm:px-12 sm:py-24">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Kawasan Konservasi
            </h1>
            <p className="text-lg text-muted-foreground">
              Menjelajahi kekayaan alam Papua Barat Daya melalui sistem kawasan konservasi yang melindungi ekosistem unik dari pesisir hingga pegunungan tinggi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kawasan/peta">
                <Button size="lg" className="gap-2">
                  <MapIcon className="h-5 w-5" />
                  Lihat Peta Interaktif
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-muted to-transparent" />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Daftar Kawasan</h2>
            <p className="text-sm text-muted-foreground">
              Menampilkan {CONSERVATION_AREAS.length} kawasan
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONSERVATION_AREAS.map((area) => (
              <Link key={area.id} href={`/kawasan/${area.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video w-full bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                      <MapIcon className="h-12 w-12" />
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary">
                        {AREA_TYPE_LABELS[area.type]}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium">
                        {area.established}
                      </span>
                    </div>
                    <CardTitle className="mt-2 group-hover:text-primary transition-colors">
                      {area.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {area.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t text-xs font-medium">
                      <span>{area.location.regency}</span>
                      <span>{formatHectares(area.areaHectares)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
