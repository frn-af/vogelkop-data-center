import type { Metadata } from "next";
import Link from "next/link";
import { Map as MapIcon, MapPin, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CONSERVATION_AREAS } from "@/data/areas";
import { formatCoordinate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Peta Kawasan Konservasi - BBKSDA Papua Barat Daya",
  description: "Peta interaktif sebaran kawasan konservasi di wilayah Papua Barat Daya.",
};

export default function PetaKawasanPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Kawasan Konservasi", href: "/kawasan" },
          { label: "Peta Interaktif" },
        ]}
      />

      <div className="mt-8 space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Peta Kawasan Konservasi
          </h1>
          <p className="text-lg text-muted-foreground">
            Visualisasi sebaran geografis kawasan konservasi di bawah pengelolaan BBKSDA Papua Barat Daya.
          </p>
        </section>

        <Card className="overflow-hidden">
          <div className="aspect-video w-full bg-muted flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-6">
              <MapIcon className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Peta Interaktif</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Modul peta interaktif sedang dalam tahap pengembangan. Segera hadir dengan fitur filter kawasan, zonasi, dan informasi real-time.
              </p>
            </div>
          </div>
        </Card>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Titik Koordinat Kawasan</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONSERVATION_AREAS.map((area) => (
              <Link key={area.id} href={`/kawasan/${area.slug}`}>
                <Card className="h-full hover:bg-muted/50 transition-colors">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{area.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{area.location.regency}</span>
                    </div>
                    <div className="bg-muted rounded px-2 py-1 text-xs font-mono text-center">
                      {formatCoordinate(area.location.lat, area.location.lng)}
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
