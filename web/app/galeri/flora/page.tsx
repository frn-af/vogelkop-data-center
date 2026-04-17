import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getSpeciesByType } from "@/data/species";

export const metadata: Metadata = {
  title: "Galeri Flora",
  description: "Koleksi tumbuhan tropis dan anggrek langka di wilayah Papua Barat Daya.",
};

export default function FloraPage() {
  const speciesList = getSpeciesByType("flora");

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Galeri", href: "/galeri" },
          { label: "Flora" },
        ]}
      />

      <div className="mt-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flora Papua Barat Daya</h1>
          <p className="mt-2 text-muted-foreground">
            Menampilkan keanekaragaman tumbuhan tropis, anggrek langka, dan vegetasi unik di wilayah Semenanjung Kepala Burung.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speciesList.map((species) => (
            <Card key={species.slug} className="overflow-hidden">
              <Link href={`/galeri/${species.slug}`} className="block">
                <div className="aspect-square bg-muted" />
              </Link>
              <CardContent className="p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  <Badge variant={species.protectionStatus === "dilindungi" ? "default" : "outline"} className="text-[10px] uppercase tracking-wider">
                    {species.protectionStatus === "dilindungi" ? "Dilindungi" : "Tidak Dilindungi"}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                    {species.iucnStatus}
                  </Badge>
                </div>
                <Link href={`/galeri/${species.slug}`} className="group">
                  <h3 className="font-bold group-hover:text-primary transition-colors">
                    {species.localName}
                  </h3>
                  <p className="text-xs italic text-muted-foreground">
                    {species.scientificName}
                  </p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
