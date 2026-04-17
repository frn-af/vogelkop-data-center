"use client";

import Link from "next/link";
import { ArrowRight, FileText, Shield, Flame, Ticket, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealItem } from "@/components/shared/scroll-reveal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "SIMAKSI",
    subtitle: "Izin Masuk Kawasan",
    description: "Ajukan izin masuk kawasan konservasi untuk penelitian, pendidikan, atau wisata.",
    href: "/layanan/simaksi",
    icon: FileText,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Perizinan Flora & Fauna",
    subtitle: "Penangkaran, Peredaran, Pengangkutan",
    description: "Perizinan terkait pengelolaan dan pemanfaatan tumbuhan dan satwa liar.",
    href: "/layanan/perizinan-flora-fauna",
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Lapor Insiden",
    subtitle: "Konflik Satwa & Kebakaran",
    description: "Laporkan konflik satwa liar, kebakaran hutan, atau aktivitas ilegal.",
    href: "/layanan/laporan-insiden",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Tiket Wisata",
    subtitle: "E-Ticketing Kawasan TWA",
    description: "Pesan tiket masuk Taman Wisata Alam secara online.",
    href: "/layanan/tiket-wisata",
    icon: Ticket,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

export function ServicesGrid() {
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/layanan/lacak?id=${encodeURIComponent(trackingId.trim())}`);
    }
  };

  return (
    <section className="py-[var(--padding-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--padding-section-x)]">
        <ScrollReveal>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Layanan Publik
            </h2>
            <p className="mt-3 text-muted-foreground">
              Akses layanan perizinan dan pelaporan secara digital — cepat, transparan, dan dapat dilacak.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ScrollRevealItem key={service.href}>
              <Link href={service.href} className="group block h-full">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className={`flex size-12 items-center justify-center rounded-lg ${service.bg}`}>
                      <service.icon className={`size-6 ${service.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                      Selengkapnya <ArrowRight className="size-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <form
            onSubmit={handleTrack}
            className="flex flex-col items-start gap-3 rounded-xl border bg-muted/50 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Search className="size-4 text-muted-foreground" />
              Lacak permohonan:
            </div>
            <div className="flex flex-1 gap-2 w-full sm:w-auto">
              <Input
                placeholder="Masukkan nomor tiket (misal: SIMAKSI-20260415-0001)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="secondary">
                Lacak
              </Button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
