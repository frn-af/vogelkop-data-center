import type { Metadata } from "next";
import Link from "next/link";
import { Map, Navigation, Ruler } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ORGANIZATION } from "@/data/organization";
import { CONSERVATION_AREAS } from "@/data/areas";
import { AREA_TYPE_LABELS, type AreaType } from "@/data/types";
import { formatHectares } from "@/lib/format";

export const metadata: Metadata = {
  title: `Wilayah Kerja - ${ORGANIZATION.name}`,
  description: `Wilayah kerja dan sebaran kawasan konservasi ${ORGANIZATION.fullName}`,
};

export default function WilayahKerjaPage() {
  const areasByType = CONSERVATION_AREAS.reduce((acc, area) => {
    if (!acc[area.type]) acc[area.type] = [];
    acc[area.type].push(area);
    return acc;
  }, {} as Record<AreaType, typeof CONSERVATION_AREAS>);

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Profil", href: "/profil/tentang-kami" },
          { label: "Wilayah Kerja" },
        ]}
      />

      <div className="mt-8 space-y-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Wilayah Kerja
          </h1>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Provinsi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">
                    {ORGANIZATION.workingArea.provinces.join(", ")}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Total Kawasan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Map className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">
                    {ORGANIZATION.workingArea.totalAreas} Kawasan
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Luas Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">
                    {formatHectares(ORGANIZATION.workingArea.totalHectares)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {ORGANIZATION.workingArea.description}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Daftar Kawasan Konservasi</h2>
          
          <div className="space-y-12">
            {(Object.keys(AREA_TYPE_LABELS) as AreaType[]).map((type) => {
              const areas = areasByType[type] || [];
              if (areas.length === 0) return null;

              return (
                <div key={type} className="space-y-4">
                  <div className="flex items-center space-x-3 border-b pb-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {type}
                    </Badge>
                    <h3 className="text-xl font-bold">{AREA_TYPE_LABELS[type]}</h3>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {areas.map((area) => (
                      <Link key={area.id} href={`/kawasan/${area.slug}`}>
                        <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                          <CardContent className="p-4 space-y-2">
                            <h4 className="font-bold">{area.name}</h4>
                            <div className="flex flex-col text-sm text-muted-foreground">
                              <span>{area.location.regency}</span>
                              <span>{formatHectares(area.areaHectares)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
