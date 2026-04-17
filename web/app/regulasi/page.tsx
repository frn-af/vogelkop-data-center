import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { REGULATIONS } from "@/data/regulations";
import { Scale, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Regulasi & Dasar Hukum",
  description: "Kerangka hukum dan peraturan yang menjadi landasan operasional BBKSDA Papua Barat Daya.",
};

export default function RegulationsPage() {
  const sortedRegulations = [...REGULATIONS].sort((a, b) => b.year - a.year);

  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Regulasi" }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Regulasi & Dasar Hukum</h1>
        <p className="mt-2 text-muted-foreground">
          Daftar peraturan perundang-undangan yang mengatur pengelolaan kawasan konservasi dan keanekaragaman hayati.
        </p>
      </div>

      <div className="grid gap-6">
        {sortedRegulations.map((reg) => (
          <Card key={reg.slug} className="group transition-colors hover:border-primary/50">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-1 gap-4">
                  <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                    <Scale className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{reg.type}</Badge>
                      <span className="text-sm font-medium text-muted-foreground">{reg.year}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {reg.shortTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {reg.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
                      <FileText className="size-3" />
                      <span>Relevansi: {reg.relevance}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 shrink-0 md:mt-0">
                  <Link 
                    href={`/regulasi/${reg.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Lihat Detail
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
