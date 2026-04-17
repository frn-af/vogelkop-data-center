import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getSpeciesBySlug, SPECIES_DATABASE } from "@/data/species";
import { MapPin, Home, Info, ShieldCheck, ShieldAlert } from "lucide-react";

export function generateStaticParams() {
  return SPECIES_DATABASE.map((species) => ({
    slug: species.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species) {
    return { title: "Spesies Tidak Ditemukan" };
  }

  return {
    title: `${species.localName} (${species.scientificName})`,
    description: species.description,
  };
}

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Galeri", href: "/galeri" },
          { label: species.type === "fauna" ? "Fauna" : "Flora", href: `/galeri/${species.type}` },
          { label: species.localName },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-[16/9] w-full rounded-xl bg-muted mb-8" />
          
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{species.localName}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-xl italic text-muted-foreground">{species.scientificName}</p>
                <span className="text-muted-foreground">•</span>
                <p className="text-xl text-muted-foreground">{species.englishName}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={species.protectionStatus === "dilindungi" ? "default" : "outline"} className="px-3 py-1">
                {species.protectionStatus === "dilindungi" ? (
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Dilindungi
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5" /> Tidak Dilindungi
                  </span>
                )}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">IUCN: {species.iucnStatus}</Badge>
              {species.citesAppendix && (
                <Badge variant="outline" className="px-3 py-1">CITES Appendix {species.citesAppendix}</Badge>
              )}
              <Badge variant="outline" className="px-3 py-1">{species.taxonClass}</Badge>
            </div>

            <div className="grid gap-8 mt-4">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Deskripsi</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{species.description}</p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Habitat</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{species.habitat}</p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Distribusi</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{species.distribution}</p>
              </section>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Galeri Foto</h3>
              {species.gallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {species.gallery.map((_, index) => (
                    <div key={index} className="aspect-square rounded-md bg-muted" />
                  ))}
                  {/* Add some placeholders to make it look like a grid if only 1 image */}
                  {species.gallery.length === 1 && (
                    <>
                      <div className="aspect-square rounded-md bg-muted/50" />
                      <div className="aspect-square rounded-md bg-muted/50" />
                      <div className="aspect-square rounded-md bg-muted/50" />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
                  Belum ada foto tambahan
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Status Konservasi</h3>
              <p className="text-sm text-muted-foreground">
                Spesies ini merupakan bagian dari upaya konservasi BBKSDA Papua Barat Daya. 
                Dilarang keras melakukan perburuan, perdagangan, atau pemeliharaan tanpa izin resmi.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
