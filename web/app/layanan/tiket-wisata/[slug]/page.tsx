import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Clock, Star, Shield, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ECO_TOURISM_AREAS, getEcoTourismAreaBySlug } from "@/data/eco-tourism";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";

export function generateStaticParams() {
  return ECO_TOURISM_AREAS.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Metadata {
  return { title: "Detail Kawasan Wisata" };
}

export default async function TiketWisataDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getEcoTourismAreaBySlug(slug);
  if (!area) notFound();

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "Tiket Wisata", href: "/layanan/tiket-wisata" },
          { label: area.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${area.heroImage}')` }} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">{area.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="size-4" />{area.location.regency}</span>
              <span className="flex items-center gap-1"><Clock className="size-4" />{area.operatingHours}</span>
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {area.rating} ({area.reviewCount} ulasan)
              </span>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{area.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Fasilitas</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {area.facilities.map((f) => <Badge key={f} variant="secondary">{f}</Badge>)}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Ketentuan</h2>
            <ul className="mt-3 space-y-2">
              {area.rules.map((rule) => (
                <li key={rule} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Shield className="mt-0.5 size-4 shrink-0 text-destructive" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {area.closedDays.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <strong>Hari Tutup:</strong> {area.closedDays.join(", ")}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Card className="sticky top-24">
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold">Paket Tiket</h3>
              <div className="space-y-3">
                {area.packages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="text-sm font-medium">{pkg.name}</p>
                      <p className="text-xs text-muted-foreground">
                        per {pkg.unit}
                        {pkg.maxGroupSize ? ` (max ${pkg.maxGroupSize} orang)` : ""}
                      </p>
                    </div>
                    <p className="font-semibold text-primary">{formatCurrency(pkg.price)}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 text-center text-sm text-muted-foreground">
                Sistem booking online sedang dalam pengembangan. Silakan hubungi kantor BBKSDA PBD untuk reservasi.
              </div>
              <Link href="/layanan/tiket-wisata/pesanan">
                <Button variant="outline" className="w-full">Cek Status Pesanan</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
