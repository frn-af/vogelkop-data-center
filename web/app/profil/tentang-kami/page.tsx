import type { Metadata } from "next";
import { Building2, Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ORGANIZATION } from "@/data/organization";

export const metadata: Metadata = {
  title: `Tentang Kami - ${ORGANIZATION.name}`,
  description: ORGANIZATION.description,
};

export default function TentangKamiPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Profil", href: "/profil/tentang-kami" },
          { label: "Tentang Kami" },
        ]}
      />

      <div className="mt-8 space-y-12">
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tentang Kami
            </h1>
            <p className="text-xl text-muted-foreground">
              {ORGANIZATION.fullName}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed">
                {ORGANIZATION.description}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Institusi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unit Pelaksana Teknis (UPT) di bawah Direktorat Jenderal KSDAE, KLHK.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Wilayah</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Berbasis di Kota Sorong, mengelola kawasan di seluruh Provinsi Papua Barat Daya.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Vogelkop</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Melindungi keanekaragaman hayati unik di Semenanjung Kepala Burung.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Sejarah Singkat</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <p className="text-muted-foreground leading-relaxed">
                  {ORGANIZATION.history}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
