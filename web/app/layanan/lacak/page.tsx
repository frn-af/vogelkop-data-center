"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { StatusTimeline } from "@/components/shared/status-timeline";
import { SLAIndicator } from "@/components/shared/sla-indicator";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/format";

export default function UniversalTrackerPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setFound(query.toUpperCase().includes("SIMAKSI") || query.toUpperCase().includes("INC") || query.toUpperCase().includes("TWA"));
  };

  return (
    <div className="mx-auto max-w-2xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb items={[{ label: "Layanan Publik", href: "/layanan" }, { label: "Lacak Permohonan" }]} />

      <h1 className="mt-8 text-2xl font-bold tracking-tight">Lacak Status Permohonan</h1>
      <p className="mt-2 text-muted-foreground">
        Lacak status permohonan apa pun — SIMAKSI, perizinan flora fauna, laporan insiden, atau booking tiket.
      </p>

      <form onSubmit={handleSearch} className="mt-6 space-y-4">
        <div>
          <Input
            placeholder="Masukkan nomor tiket (SIMAKSI-xxx, INC-xxx, TWA-xxx)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-base"
          />
        </div>
        <Button type="submit" className="w-full gap-2 sm:w-auto">
          <Search className="size-4" /> Lacak
        </Button>
      </form>

      {searched && found && (
        <Card className="mt-8">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Nomor Tiket</p>
                <p className="text-lg font-bold text-primary">SIMAKSI-20260415-0001</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Diajukan</p>
                <p className="text-sm font-medium">{formatDate("2026-04-15T08:00:00+09:00")}</p>
              </div>
            </div>
            <div className="space-y-2 rounded-lg border p-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Jenis</span><span className="font-medium">Izin Masuk Kawasan (SIMAKSI)</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Kawasan</span><span className="font-medium">CA Pegunungan Arfak</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pemohon</span><span className="font-medium">Dr. Maya</span></div>
            </div>
            <StatusTimeline
              steps={[
                { label: "Diterima", date: "15 Apr", isCompleted: true, isCurrent: false },
                { label: "Ditinjau", date: "16 Apr", isCompleted: false, isCurrent: true },
                { label: "Verifikasi", isCompleted: false, isCurrent: false },
                { label: "Selesai", isCompleted: false, isCurrent: false },
              ]}
            />
            <SLAIndicator targetHours={120} elapsedHours={48} label="SLA (5 hari kerja)" />
          </CardContent>
        </Card>
      )}

      {searched && !found && (
        <Card className="mt-8">
          <CardContent className="p-6 text-center text-muted-foreground">
            Permohonan tidak ditemukan. Pastikan nomor tiket atau email sudah benar.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
