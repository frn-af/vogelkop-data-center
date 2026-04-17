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

interface TrackingResult {
  id: string;
  type: string;
  area: string;
  applicant: string;
  submittedAt: string;
  status: string;
  steps: { label: string; date?: string; isCompleted: boolean; isCurrent: boolean }[];
  slaElapsedHours: number;
}

const MOCK_RESULT: TrackingResult = {
  id: "SIMAKSI-20260415-0001",
  type: "Izin Masuk Kawasan",
  area: "CA Pegunungan Arfak",
  applicant: "Dr. Maya",
  submittedAt: "2026-04-15T08:00:00+09:00",
  status: "ditinjau",
  steps: [
    { label: "Diterima", date: "15 Apr", isCompleted: true, isCurrent: false },
    { label: "Ditinjau", date: "16 Apr", isCompleted: false, isCurrent: true },
    { label: "Verifikasi", isCompleted: false, isCurrent: false },
    { label: "Selesai", isCompleted: false, isCurrent: false },
  ],
  slaElapsedHours: 48,
};

export default function SimaksiLacakPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (query.toUpperCase().includes("SIMAKSI")) {
      setResult(MOCK_RESULT);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "SIMAKSI", href: "/layanan/simaksi" },
          { label: "Lacak Status" },
        ]}
      />

      <h1 className="mt-8 text-2xl font-bold tracking-tight">
        Lacak Status SIMAKSI
      </h1>
      <p className="mt-2 text-muted-foreground">
        Masukkan nomor tiket atau email untuk melacak status permohonan.
      </p>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2">
        <Input
          placeholder="SIMAKSI-20260415-0001 atau email@contoh.com"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="gap-2">
          <Search className="size-4" /> Lacak
        </Button>
      </form>

      {searched && result && (
        <Card className="mt-8">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Nomor Tiket</p>
                <p className="text-lg font-bold text-primary">{result.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Diajukan</p>
                <p className="text-sm font-medium">{formatDate(result.submittedAt)}</p>
              </div>
            </div>

            <div className="space-y-2 rounded-lg border p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jenis</span>
                <span className="font-medium">{result.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kawasan</span>
                <span className="font-medium">{result.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pemohon</span>
                <span className="font-medium">{result.applicant}</span>
              </div>
            </div>

            <StatusTimeline steps={result.steps} />

            <SLAIndicator
              targetHours={5 * 24}
              elapsedHours={result.slaElapsedHours}
              label="SLA (5 hari kerja)"
            />
          </CardContent>
        </Card>
      )}

      {searched && !result && (
        <Card className="mt-8">
          <CardContent className="p-6 text-center text-muted-foreground">
            Permohonan tidak ditemukan. Pastikan nomor tiket sudah benar.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
