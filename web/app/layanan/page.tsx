import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Shield, Flame, Ticket, Search, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export const metadata: Metadata = {
  title: "Layanan Publik",
  description:
    "Akses layanan publik BBKSDA Papua Barat Daya — perizinan SIMAKSI, flora fauna, pelaporan insiden, dan tiket wisata alam.",
};

const services = [
  {
    title: "SIMAKSI — Izin Masuk Kawasan",
    description:
      "Ajukan Surat Izin Masuk Kawasan Konservasi (SIMAKSI) untuk kegiatan penelitian, pendidikan, jurnalistik, atau wisata di kawasan konservasi.",
    href: "/layanan/simaksi",
    icon: FileText,
    color: "text-primary",
    bg: "bg-primary/10",
    sla: "5 hari kerja",
  },
  {
    title: "Perizinan Flora & Fauna",
    description:
      "Perizinan terkait penangkaran, peredaran, dan pengangkutan tumbuhan dan satwa liar — baik yang dilindungi maupun tidak dilindungi.",
    href: "/layanan/perizinan-flora-fauna",
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    sla: "14 hari kerja",
  },
  {
    title: "Laporan Insiden",
    description:
      "Laporkan konflik satwa liar, kebakaran hutan, pembalakan liar, atau perburuan liar. Setiap laporan memiliki SLA respons yang jelas.",
    href: "/layanan/laporan-insiden",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-50",
    sla: "2 jam (darurat)",
  },
  {
    title: "Tiket Wisata Alam",
    description:
      "Pesan tiket masuk Taman Wisata Alam (TWA) secara online. Tersedia tiket domestik, internasional, dan paket tur berpemandu.",
    href: "/layanan/tiket-wisata",
    icon: Ticket,
    color: "text-blue-600",
    bg: "bg-blue-50",
    sla: "Instan",
  },
];

export default function LayananPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Layanan Publik" }]} />

      <div className="mt-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Layanan Publik
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Akses layanan perizinan dan pelaporan BBKSDA Papua Barat Daya secara
          digital — cepat, transparan, dan dapat dilacak.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Link key={service.href} href={service.href} className="group block">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardContent className="flex gap-5 p-6">
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${service.bg}`}
                >
                  <service.icon className={`size-7 ${service.color}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      SLA: {service.sla}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                      Selengkapnya <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border bg-muted/50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 font-semibold">
              <Search className="size-5 text-muted-foreground" />
              Lacak Status Permohonan
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Sudah mengajukan permohonan? Lacak statusnya menggunakan nomor
              tiket atau email.
            </p>
          </div>
          <Link href="/layanan/lacak">
            <Button variant="secondary" className="gap-2">
              Lacak Permohonan <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
