import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CONSERVATION_PROGRAMS } from "@/data/organization";
import { Shield, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Program Konservasi",
  description: "Daftar program konservasi yang dilaksanakan oleh BBKSDA Papua Barat Daya untuk melindungi keanekaragaman hayati.",
};

export default function ConservationProgramsPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Edukasi", href: "/edukasi" }, { label: "Program Konservasi" }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Program Konservasi</h1>
        <p className="mt-2 text-muted-foreground">
          Gambaran umum program-program konservasi BBKSDA Papua Barat Daya dalam menjaga kelestarian alam.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CONSERVATION_PROGRAMS.map((program) => (
          <Card key={program.slug} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Shield className="size-6" />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                  {program.status}
                </Badge>
              </div>
              
              <h3 className="mt-4 text-xl font-semibold">{program.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {program.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                <span>Dimulai sejak {program.startYear}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
