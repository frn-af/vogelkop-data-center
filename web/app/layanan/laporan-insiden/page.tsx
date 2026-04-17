import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { INCIDENT_TYPES, RECENT_INCIDENTS, SLA_TARGETS, URGENCY_LABELS } from "@/data/incidents";
import { INCIDENT_STATUS_LABELS } from "@/data/types";
import { formatRelativeTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Laporan Insiden",
  description:
    "Laporkan konflik satwa liar, kebakaran hutan, pembalakan liar, atau perburuan liar di kawasan konservasi Papua Barat Daya.",
};

export default function LaporanInsidenPage() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--padding-section-x)] py-8">
      <Breadcrumb
        items={[
          { label: "Layanan Publik", href: "/layanan" },
          { label: "Laporan Insiden" },
        ]}
      />

      <div className="mt-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Laporan Insiden
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Laporkan konflik satwa liar, kebakaran hutan, pembalakan liar, atau
          aktivitas ilegal lainnya. Setiap laporan memiliki SLA respons yang jelas.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {INCIDENT_TYPES.map((type) => (
          <Card key={type.id} className="text-center">
            <CardContent className="flex flex-col items-center gap-2 p-5">
              <Badge
                variant={type.color === "danger" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {type.label}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/layanan/laporan-insiden/buat">
          <Button size="lg" className="gap-2">
            Buat Laporan <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-4 rounded-lg border bg-muted/50 p-6 sm:grid-cols-3">
        {Object.entries(SLA_TARGETS).map(([key, sla]) => (
          <div key={key} className="text-center">
            <p className="text-sm font-semibold">
              {URGENCY_LABELS[key as keyof typeof URGENCY_LABELS]}
            </p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {sla.responseHours < 24
                ? `${sla.responseHours} jam`
                : `${sla.responseHours / 24} hari`}
            </p>
            <p className="text-xs text-muted-foreground">target respons</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Insiden Terbaru</h2>
          <Link href="/layanan/laporan-insiden/lacak">
            <Button variant="ghost" size="sm" className="gap-1">
              Lacak Laporan <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {RECENT_INCIDENTS.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{incident.summary}</p>
                <p className="text-xs text-muted-foreground">
                  {incident.location} · {formatRelativeTime(incident.reportedAt)}
                </p>
              </div>
              <Badge
                variant={incident.status === "selesai" ? "secondary" : "outline"}
                className="text-xs"
              >
                {INCIDENT_STATUS_LABELS[incident.status]}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
