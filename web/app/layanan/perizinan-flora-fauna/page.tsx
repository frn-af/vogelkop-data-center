import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Truck, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "Perizinan Flora & Fauna",
  description:
    "Perizinan penangkaran, peredaran, dan pengangkutan tumbuhan dan satwa liar di wilayah BBKSDA Papua Barat Daya.",
};

const permitTypes = [
  {
    title: "Izin Penangkaran",
    description: "Lisensi fasilitas penangkaran satwa liar untuk tujuan komersial, konservasi, atau penelitian.",
    href: "/layanan/perizinan-flora-fauna/penangkaran",
    icon: Building2,
    sla: "14 hari kerja",
    applicant: "Lembaga penangkaran, institusi penelitian",
  },
  {
    title: "Izin Peredaran",
    description: "Alokasi kuota perdagangan domestik dan internasional (CITES) untuk spesies tumbuhan dan satwa.",
    href: "/layanan/perizinan-flora-fauna/peredaran",
    icon: Store,
    sla: "14 hari kerja",
    applicant: "Eksportir, toko hewan, pedagang",
  },
  {
    title: "Izin Pengangkutan",
    description: "Izin transportasi spesimen hidup antar wilayah melalui darat, laut, atau udara.",
    href: "/layanan/perizinan-flora-fauna/pengangkutan",
    icon: Truck,
    sla: "7 hari kerja",
    applicant: "Logistik, maskapai, peternak",
  },
];

export default function PerizinanFloraFaunaPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "Perizinan Flora & Fauna" },
        ]}
      />

      <div className="mt-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Perizinan Flora & Fauna
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Sistem perizinan terpadu untuk pengelolaan dan pemanfaatan tumbuhan dan satwa liar — mencakup penangkaran, peredaran, dan pengangkutan.
        </p>
      </div>

      <div className="mt-8 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Dasar Hukum:</strong> PP 7/1999 tentang Pengawetan Jenis Tumbuhan dan Satwa, UU 32/2024 tentang KSDAHE
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {permitTypes.map((permit) => (
          <Link key={permit.href} href={permit.href} className="group block">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <permit.icon className="size-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-lg font-semibold">{permit.title}</h2>
                  <p className="text-sm text-muted-foreground">{permit.description}</p>
                </div>
                <div className="space-y-2 border-t pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Pemohon</span>
                    <span className="text-right font-medium text-foreground">{permit.applicant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SLA</span>
                    <Badge variant="outline" className="text-[10px]">{permit.sla}</Badge>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                  Ajukan Izin <ArrowRight className="size-3.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
