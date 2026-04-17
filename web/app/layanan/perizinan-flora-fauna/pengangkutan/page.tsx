import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Izin Pengangkutan",
  description: "Ajukan izin pengangkutan spesimen hidup antar wilayah.",
};

export default function PengangkutanPage() {
  return (
    <div className="mx-auto max-w-3xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "Perizinan Flora & Fauna", href: "/layanan/perizinan-flora-fauna" },
          { label: "Izin Pengangkutan" },
        ]}
      />
      <div className="mt-8">
        <Badge variant="secondary" className="mb-3">SLA: 7 Hari Kerja</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Izin Pengangkutan</h1>
        <p className="mt-3 text-muted-foreground">
          Izin transportasi spesimen hidup antar wilayah. Formulir permohonan akan tersedia dalam pembaruan berikutnya.
        </p>
      </div>
      <Card className="mt-8">
        <CardContent className="p-6 text-center text-muted-foreground">
          <p className="text-lg font-semibold text-foreground">Formulir Dalam Pengembangan</p>
          <p className="mt-2">Formulir permohonan izin pengangkutan sedang dalam tahap pengembangan. Silakan hubungi kantor BBKSDA PBD untuk pengajuan secara langsung.</p>
          <p className="mt-4 text-sm">Telepon: (0951) 321-456 | Email: info@bbksda-pbd.go.id</p>
        </CardContent>
      </Card>
    </div>
  );
}
