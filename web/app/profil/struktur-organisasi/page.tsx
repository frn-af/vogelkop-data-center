import type { Metadata } from "next";
import { Building2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ORGANIZATION } from "@/data/organization";

export const metadata: Metadata = {
  title: `Struktur Organisasi - ${ORGANIZATION.name}`,
  description: `Struktur Organisasi ${ORGANIZATION.fullName}`,
};

export default function StrukturOrganisasiPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Profil", href: "/profil/tentang-kami" },
          { label: "Struktur Organisasi" },
        ]}
      />

      <div className="mt-8 space-y-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Struktur Organisasi
          </h1>
          <p className="text-muted-foreground">
            Susunan kepemimpinan dan pembagian tugas di lingkungan {ORGANIZATION.fullName}.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Pimpinan</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ORGANIZATION.leadership.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square w-full bg-muted flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                </div>
                <CardHeader className="p-4 text-center">
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{member.position}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Divisi & Seksi</h2>
          </div>
          <div className="grid gap-4">
            {ORGANIZATION.divisions.map((division, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{division.name}</h3>
                    <p className="text-sm text-muted-foreground">{division.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kepala</p>
                    <p className="font-medium">{division.head}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
