import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, FileCheck, Users, Camera, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CONSERVATION_AREAS } from "@/data/areas";
import { APPLICANT_TYPE_LABELS } from "@/data/types";

export const metadata: Metadata = {
  title: "SIMAKSI — Izin Masuk Kawasan Konservasi",
  description:
    "Ajukan Surat Izin Masuk Kawasan Konservasi (SIMAKSI) secara online. Proses cepat dengan SLA 5 hari kerja.",
};

const requirements = [
  { icon: FileText, label: "KTP / Paspor", description: "Scan identitas yang masih berlaku" },
  { icon: FileCheck, label: "Surat Rekomendasi", description: "Dari institusi/lembaga pemohon" },
  { icon: Camera, label: "Proposal Penelitian", description: "Wajib untuk kategori Peneliti" },
  { icon: Users, label: "Data Anggota Tim", description: "Jika kunjungan berkelompok" },
];

export default function SimaksiPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "SIMAKSI" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-3">
              SLA: 5 Hari Kerja
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              SIMAKSI — Izin Masuk Kawasan Konservasi
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Surat Izin Masuk Kawasan Konservasi (SIMAKSI) adalah izin resmi
              yang diperlukan setiap orang yang akan memasuki kawasan konservasi
              untuk kegiatan penelitian, pendidikan, jurnalistik, atau wisata.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Siapa yang Membutuhkan?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(APPLICANT_TYPE_LABELS).map(([key, label]) => (
                <div
                  key={key}
                  className="rounded-lg border px-4 py-3 text-sm font-medium"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Persyaratan Dokumen</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {requirements.map((req) => (
                <div key={req.label} className="flex gap-3 rounded-lg border p-4">
                  <req.icon className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{req.label}</p>
                    <p className="text-xs text-muted-foreground">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Kawasan yang Tersedia</h2>
            <div className="mt-4 space-y-2">
              {CONSERVATION_AREAS.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center justify-between rounded-lg border px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{area.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {area.location.regency}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {area.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="sticky top-24">
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold">Ajukan Permohonan</h3>
              <p className="text-sm text-muted-foreground">
                Isi formulir permohonan SIMAKSI secara online. Proses terdiri
                dari 5 langkah dan membutuhkan waktu sekitar 10-15 menit.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="size-4" />
                  Estimasi proses: 5 hari kerja
                </div>
              </div>
              <Link href="/layanan/simaksi/ajukan" className="block">
                <Button className="w-full gap-2">
                  Ajukan Permohonan <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/layanan/simaksi/lacak" className="block">
                <Button variant="outline" className="w-full">
                  Lacak Status Permohonan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
