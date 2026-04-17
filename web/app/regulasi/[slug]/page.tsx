import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { REGULATIONS, getRegulationBySlug } from "@/data/regulations";
import { Scale, Download, FileText, Calendar } from "lucide-react";

export function generateStaticParams() {
  return REGULATIONS.map((reg) => ({ slug: reg.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const reg = getRegulationBySlug(slug);
  
  if (!reg) return { title: "Regulasi Tidak Ditemukan" };
  
  return {
    title: reg.shortTitle,
    description: reg.description,
  };
}

export default async function RegulationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reg = getRegulationBySlug(slug);

  if (!reg) notFound();

  return (
    <div className="mx-auto max-w-4xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb 
        items={[
          { label: "Regulasi", href: "/regulasi" }, 
          { label: reg.shortTitle }
        ]} 
      />
      
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{reg.type}</Badge>
          {reg.status === "berlaku" && (
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
              Berlaku
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight leading-tight">
          {reg.title}
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              Deskripsi
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {reg.description}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Scale className="size-5 text-primary" />
              Relevansi
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {reg.relevance}
            </p>
          </section>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Tahun</p>
                    <p className="font-medium">{reg.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Nomor</p>
                    <p className="font-medium">{reg.number}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2" render={<a href={reg.downloadUrl} />}>
                <Download className="size-4" />
                Unduh Dokumen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
