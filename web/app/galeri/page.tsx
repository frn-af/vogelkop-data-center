import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SPECIES_DATABASE } from "@/data/species";
import { Bird, Leaf, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri Keanekaragaman Hayati",
  description: "Eksplorasi kekayaan flora dan fauna endemik di wilayah Papua Barat Daya.",
};

export default function GaleriPage() {
  const faunaCount = SPECIES_DATABASE.filter((s) => s.type === "fauna").length;
  const floraCount = SPECIES_DATABASE.filter((s) => s.type === "flora").length;

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Galeri Keanekaragaman Hayati" }]} />

      <div className="mt-8 flex flex-col gap-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Galeri Keanekaragaman Hayati</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Papua Barat Daya merupakan rumah bagi ribuan spesies unik yang tidak ditemukan di tempat lain di dunia. 
            Dari Cenderawasih yang legendaris hingga anggrek hutan yang eksotis, jelajahi kekayaan alam Semenanjung Kepala Burung.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="group relative overflow-hidden border-2 transition-colors hover:border-primary/50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Bird className="h-8 w-8" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">{faunaCount}</span>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-bold">Fauna</h2>
                <p className="mt-2 text-muted-foreground">
                  Koleksi satwa unik mulai dari burung surga, mamalia berkantung, hingga reptil endemik.
                </p>
              </div>
              <Link href="/galeri/fauna" className="mt-8 flex items-center gap-2 font-semibold text-primary">
                Lihat Semua Fauna <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-2 transition-colors hover:border-primary/50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Leaf className="h-8 w-8" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">{floraCount}</span>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-bold">Flora</h2>
                <p className="mt-2 text-muted-foreground">
                  Keanekaragaman tumbuhan tropis, anggrek langka, dan vegetasi hutan hujan primer.
                </p>
              </div>
              <Link href="/galeri/flora" className="mt-8 flex items-center gap-2 font-semibold text-primary">
                Lihat Semua Flora <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold">Semua Spesies</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIES_DATABASE.map((species) => (
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
    </div>
  );
}
