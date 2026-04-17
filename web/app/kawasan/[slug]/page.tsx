import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  FileText, 
  Info, 
  Layers, 
  MapPin, 
  Navigation, 
  Ruler, 
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CONSERVATION_AREAS, getAreaBySlug } from "@/data/areas";
import { AREA_TYPE_LABELS } from "@/data/types";
import { formatHectares, formatCoordinate } from "@/lib/format";

export function generateStaticParams() {
  return CONSERVATION_AREAS.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    return { title: "Kawasan Tidak Ditemukan" };
  }

  return {
    title: `${area.name} - Kawasan Konservasi`,
    description: area.description,
  };
}

export default async function KawasanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Kawasan Konservasi", href: "/kawasan" },
          { label: area.name },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="text-sm px-3 py-1">
                  {AREA_TYPE_LABELS[area.type]}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  ID: {area.id}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {area.name}
              </h1>
            </div>

            <div className="aspect-[16/9] w-full rounded-xl bg-muted flex items-center justify-center overflow-hidden">
              <div className="text-muted-foreground/20 flex flex-col items-center gap-2">
                <Layers className="h-16 w-16" />
                <span className="font-medium">Foto Kawasan</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </div>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Status Hukum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ditetapkan Tahun</p>
                    <p className="font-bold">{area.established}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Dasar Hukum</p>
                    <p className="text-sm font-medium">{area.legalBasis}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Geografis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <Ruler className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Luas Kawasan</p>
                    <p className="font-bold">{formatHectares(area.areaHectares)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Koordinat & Lokasi</p>
                    <p className="text-sm font-medium">
                      {formatCoordinate(area.location.lat, area.location.lng)}
                    </p>
                    <p className="text-xs text-muted-foreground">{area.location.regency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Keanekaragaman Hayati</h2>
            <div className="flex flex-wrap gap-2">
              {area.biodiversityHighlights.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {item}
                </Badge>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Akses & Fasilitas</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-bold flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Informasi Akses
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {area.accessInfo}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Fasilitas Tersedia</h3>
                  <div className="flex flex-wrap gap-2">
                    {area.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <aside className="space-y-6">
          <Card className="border-primary/20 bg-primary/5 sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Izin Masuk (SIMAKSI)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Setiap kunjungan ke kawasan konservasi untuk tujuan penelitian, pendidikan, atau komersial wajib memiliki Surat Izin Masuk Kawasan Konservasi (SIMAKSI).
              </p>
              <Link href="/layanan/simaksi">
                <Button className="w-full gap-2">
                  Ajukan SIMAKSI
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
