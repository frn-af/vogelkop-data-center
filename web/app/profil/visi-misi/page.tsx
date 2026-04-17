import type { Metadata } from "next";
import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ORGANIZATION } from "@/data/organization";

export const metadata: Metadata = {
  title: `Visi & Misi - ${ORGANIZATION.name}`,
  description: `Visi dan Misi ${ORGANIZATION.fullName}`,
};

export default function VisiMisiPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Profil", href: "/profil/tentang-kami" },
          { label: "Visi & Misi" },
        ]}
      />

      <div className="mt-8 space-y-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Visi & Misi
          </h1>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Visi</h2>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-2xl font-medium italic text-center leading-relaxed">
                  &quot;{ORGANIZATION.vision}&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-primary">Misi</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {ORGANIZATION.missions.map((mission, index) => (
              <Card key={index} className="flex flex-row items-start space-x-4 p-6">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Misi {index + 1}
                    </span>
                  </div>
                  <p className="text-lg leading-snug">{mission}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
