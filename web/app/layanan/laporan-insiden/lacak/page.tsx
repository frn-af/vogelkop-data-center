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

export default function LacakInsidenPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setFound(query.toUpperCase().includes("INC"));
  };

  return (
    <div className="mx-auto max-w-2xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "Laporan Insiden", href: "/layanan/laporan-insiden" },
          { label: "Lacak Laporan" },
        ]}
      />

      <h1 className="mt-8 text-2xl font-bold tracking-tight">Lacak Laporan Insiden</h1>
      <p className="mt-2 text-muted-foreground">
        Masukkan nomor tiket atau nomor telepon pelapor.
      </p>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2">
        <Input
          placeholder="INC-20260410-0012 atau 08xx-xxxx"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="gap-2">
          <Search className="size-4" /> Lacak
        </Button>
      </form>

      {searched && found && (
        <Card className="mt-8">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Nomor Tiket</p>
                <p className="text-lg font-bold text-primary">INC-20260410-0012</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Dilaporkan</p>
                <p className="text-sm font-medium">{formatDate("2026-04-10T08:30:00+09:00")}</p>
              </div>
            </div>
            <div className="space-y-2 rounded-lg border p-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Jenis</span><span className="font-medium">Konflik Satwa Liar</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Lokasi</span><span className="font-medium">Kab. Sorong, Distrik Aimas</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Urgensi</span><span className="font-medium">Darurat</span></div>
            </div>
            <StatusTimeline
              steps={[
                { label: "Dilaporkan", date: "10 Apr 08:30", isCompleted: true, isCurrent: false },
                { label: "Ditinjau", date: "10 Apr 09:00", isCompleted: true, isCurrent: false },
                { label: "Ditindaklanjuti", date: "10 Apr 10:15", isCompleted: true, isCurrent: false },
                { label: "Selesai", date: "10 Apr 14:15", isCompleted: true, isCurrent: false },
              ]}
            />
            <SLAIndicator targetHours={2} elapsedHours={0.5} label="SLA Respons (Darurat: 2 jam)" />
          </CardContent>
        </Card>
      )}

      {searched && !found && (
        <Card className="mt-8">
          <CardContent className="p-6 text-center text-muted-foreground">
            Laporan tidak ditemukan. Pastikan nomor tiket sudah benar.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
