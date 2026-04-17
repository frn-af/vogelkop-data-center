import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ECO_TOURISM_AREAS } from "@/data/eco-tourism";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tiket Wisata Alam",
  description: "Pesan tiket masuk Taman Wisata Alam secara online — TWA Sorong, Gunung Meja, dan Klamono.",
};

export default function TiketWisataPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Layanan Publik", href: "/layanan" }, { label: "Tiket Wisata" }]} />

      <div className="mt-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tiket Wisata Alam</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Pesan tiket masuk Taman Wisata Alam secara online. Pilih kawasan, tentukan tanggal, dan dapatkan e-tiket.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ECO_TOURISM_AREAS.map((area) => {
          const lowestPrice = Math.min(...area.packages.map((p) => p.price));
          return (
            <Link key={area.slug} href={`/layanan/tiket-wisata/${area.slug}`} className="group block">
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${area.heroImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute left-3 top-3" variant="secondary">TWA</Badge>
                </div>
                <CardContent className="p-5 space-y-3">
                  <h2 className="text-lg font-semibold">{area.name}</h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{area.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="size-3" />{area.location.regency}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3" />{area.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{area.rating}</span>
                    <span className="text-xs text-muted-foreground">({area.reviewCount} ulasan)</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Mulai dari</p>
                      <p className="font-semibold text-primary">{formatCurrency(lowestPrice)}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                      Pesan <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
